package com.trabalhofinal.frameworks.repository;

import com.trabalhofinal.frameworks.model.Appointment;
import com.trabalhofinal.frameworks.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByCliente(User cliente);
    List<Appointment> findByService_Profissional(User profissional);
}
