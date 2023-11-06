package com.superman.backend.DAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import com.superman.backend.Entity.SessionData;

@Repository
@Transactional
public class SessionDataDao {
    private final EntityManager entityManager;

    @Autowired
    public SessionDataDao(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void insertSessionData(SessionData sessionData) {
        entityManager.persist(sessionData);
    }
}
