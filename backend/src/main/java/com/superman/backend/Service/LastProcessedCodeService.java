package com.superman.backend.Service;

import com.superman.backend.Entity.LastProcessedCode;
import com.superman.backend.Repository.LastProcessedCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LastProcessedCodeService {

    private final LastProcessedCodeRepository lastProcessedCodeRepository;

    @Autowired
    public LastProcessedCodeService(LastProcessedCodeRepository lastProcessedCodeRepository) {
        this.lastProcessedCodeRepository = lastProcessedCodeRepository;
    }

    public int getLastProcessedCode() {
        Optional<LastProcessedCode> optionalCode = lastProcessedCodeRepository.findById(1L);
        return optionalCode.map(LastProcessedCode::getLastProcessedCode).orElse(11110);
    }

    public void saveLastProcessedCode(int code) {
        Optional<LastProcessedCode> optionalCode = lastProcessedCodeRepository.findById(1L);
        LastProcessedCode lastProcessedCode = optionalCode.orElse(new LastProcessedCode());
        lastProcessedCode.setLastProcessedCode(code);
        lastProcessedCodeRepository.save(lastProcessedCode);
    }
}
