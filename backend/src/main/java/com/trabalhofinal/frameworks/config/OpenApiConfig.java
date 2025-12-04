/*package com.trabalhofinal.frameworks.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI agendaProOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("AgendaPro API - Trabalho Final Frameworks Web II")
                        .description("API para sistema de agendamento de serviços")
                        .version("1.0.0"));
    }
}*/

package com.trabalhofinal.frameworks.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType; // <- ESSA É A CERTA
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "API AgendaPro - Trabalho Final Frameworks Web II",
                version = "1.0.0",
                description = "API para sistema de agendamento de serviços"
        ),
        servers = {
                @Server(url = "http://localhost:8080")
        },
        security = {
                @SecurityRequirement(name = "bearerAuth")
        }
)
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP, // HTTP + bearer + JWT = botão Authorize
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class OpenApiConfig {
}
