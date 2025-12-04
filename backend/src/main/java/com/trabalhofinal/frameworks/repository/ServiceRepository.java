package com.trabalhofinal.frameworks.repository;

import com.trabalhofinal.frameworks.model.ServiceEntity;
import com.trabalhofinal.frameworks.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
    List<ServiceEntity> findByProfissional(User profissional);
}
