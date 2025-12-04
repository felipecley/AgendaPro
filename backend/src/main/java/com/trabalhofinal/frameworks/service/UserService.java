package com.trabalhofinal.frameworks.service;

import com.trabalhofinal.frameworks.dto.RegisterRequest;
import com.trabalhofinal.frameworks.model.User;
import com.trabalhofinal.frameworks.model.enums.RoleName;
import com.trabalhofinal.frameworks.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        Set<RoleName> roles = request.isProfissional()
                ? Set.of(RoleName.ROLE_PROFISSIONAL)
                : Set.of(RoleName.ROLE_CLIENTE);

        User user = User.builder()
                .nome(request.getNome())
                .email(request.getEmail())
                .senha(passwordEncoder.encode(request.getSenha()))
                .roles(roles)
                .build();

        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
}
