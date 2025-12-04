package com.trabalhofinal.frameworks.controller;

import com.trabalhofinal.frameworks.model.ServiceEntity;
import com.trabalhofinal.frameworks.model.User;
import com.trabalhofinal.frameworks.repository.ServiceRepository;
import com.trabalhofinal.frameworks.repository.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
@Tag(name = "Serviços")
public class ServiceController {

    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<ServiceEntity>> listAll() {
        return ResponseEntity.ok(serviceRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<ServiceEntity> create(@RequestBody ServiceEntity service,
                                                Authentication authentication) {
        String email = authentication.getName();
        User profissional = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        service.setProfissional(profissional);
        ServiceEntity saved = serviceRepository.save(service);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceEntity> update(@PathVariable Long id,
                                                @RequestBody ServiceEntity updated) {
        ServiceEntity service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        service.setTitulo(updated.getTitulo());
        service.setDescricao(updated.getDescricao());
        service.setPreco(updated.getPreco());
        service.setDuracaoMinutos(updated.getDuracaoMinutos());
        return ResponseEntity.ok(serviceRepository.save(service));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        serviceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
