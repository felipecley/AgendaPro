package com.trabalhofinal.frameworks.controller;

import com.trabalhofinal.frameworks.model.Appointment;
import com.trabalhofinal.frameworks.model.ServiceEntity;
import com.trabalhofinal.frameworks.model.User;
import com.trabalhofinal.frameworks.model.enums.AppointmentStatus;
import com.trabalhofinal.frameworks.repository.AppointmentRepository;
import com.trabalhofinal.frameworks.repository.ServiceRepository;
import com.trabalhofinal.frameworks.repository.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
@Tag(name = "Agendamentos")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Appointment> create(@RequestBody CreateAppointmentRequest request,
                                              Authentication authentication) {
        String emailCliente = authentication.getName();
        User cliente = userRepository.findByEmail(emailCliente)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        ServiceEntity service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        Appointment appointment = Appointment.builder()
                .cliente(cliente)
                .service(service)
                .dataHora(request.getDataHora())
                .status(AppointmentStatus.PENDENTE)
                .build();

        return ResponseEntity.ok(appointmentRepository.save(appointment));
    }

    @GetMapping("/me/cliente")
    public ResponseEntity<List<Appointment>> listByClient(Authentication authentication) {
        String email = authentication.getName();
        User cliente = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        return ResponseEntity.ok(appointmentRepository.findByCliente(cliente));
    }

    @GetMapping("/me/profissional")
    public ResponseEntity<List<Appointment>> listByProfessional(Authentication authentication) {
        String email = authentication.getName();
        User profissional = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado"));
        return ResponseEntity.ok(appointmentRepository.findByService_Profissional(profissional));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(@PathVariable Long id,
                                                    @RequestParam AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));
        appointment.setStatus(status);
        return ResponseEntity.ok(appointmentRepository.save(appointment));
    }

    @Data
    public static class CreateAppointmentRequest {
        private Long serviceId;
        private LocalDateTime dataHora;
    }
}
