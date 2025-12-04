package com.trabalhofinal.frameworks.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String nome;
    private String email;
    private String senha;
    private boolean profissional;
}
