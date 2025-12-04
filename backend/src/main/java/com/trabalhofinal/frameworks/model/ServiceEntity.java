package com.trabalhofinal.frameworks.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String descricao;

    private Double preco;

    private Integer duracaoMinutos;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private User profissional;
}
