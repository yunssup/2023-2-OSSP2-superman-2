package com.superman.backend.Service;


import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
public class CrawlingHouseInfoService {

    public String getRealEstateInfo(String searchAddress) {
        if (searchAddress == null || searchAddress.isEmpty()) {
            return "Invalid search address";
        }

        System.setProperty("webdriver.chrome.driver", "{ㅁㅇㄹㅁㄴㅇㄹ}");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");

        WebDriver driver = new ChromeDriver(options);

        driver.get("https://new.land.naver.com");

        WebElement searchInput = driver.findElement(By.xpath("//input[@id='query']"));
        searchInput.sendKeys(searchAddress);
        searchInput.submit();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("_1Nz3j")));

        List<WebElement> estateList = driver.findElements(By.xpath("//div[@class='_1Nz3j']/div"));

        StringBuilder result = new StringBuilder();
        for (WebElement estate : estateList) {
            WebElement priceElement = estate.findElement(By.xpath(".//span[@class='_2gHFN']"));
            String price = priceElement.getText();

            WebElement areaElement = estate.findElement(By.xpath(".//span[@class='_2PvO9']"));
            String area = areaElement.getText();

            result.append("매물 가격: ").append(price).append(", 면적: ").append(area).append("\n");
        }

        driver.quit();

        return result.toString();
    }
}

