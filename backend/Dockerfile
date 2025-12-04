# Etapa 1: build da aplicação com Maven
FROM maven:3.9-eclipse-temurin-22 AS build
WORKDIR /app

# Copia o pom e o código-fonte do backend
COPY pom.xml .
COPY src ./src

# Compila o projeto sem rodar os testes
RUN mvn -q -DskipTests package

# Etapa 2: imagem final somente com o JRE e o .jar pronto
FROM eclipse-temurin:22-jre-alpine
WORKDIR /app

# copia o jar gerado na etapa de build
COPY --from=build /app/target/*.jar app.jar

# expõe a porta do Spring Boot
EXPOSE 8080

# roda com o profile prod
ENTRYPOINT ["java","-jar","/app/app.jar","--spring.profiles.active=prod"]
