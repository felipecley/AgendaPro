# Trabalho Final - Frameworks Web II

Aplicação **full stack** de agendamento de serviços ("AgendaPro") desenvolvida com **Spring Boot (backend)** e **React (frontend)**.

> Tema: Sistema de agendamentos entre profissionais de serviços e clientes.

## Tecnologias

### Backend
- Java 17
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Spring Security + JWT
- H2 Database (ambiente local)
- MySQL (Aiven - produção)
- Swagger / OpenAPI (springdoc-openapi)

### Frontend
- React
- React Router DOM
- Axios
- Material UI
- Vite

## Estrutura do repositório

- `backend/` → API REST em Spring Boot
- `frontend/` → Aplicação React

---

## Como rodar o backend (local)

Pré-requisitos:
- Java 17
- Maven

Passos:

```bash
cd backend
mvn spring-boot:run
```

A API sobe em: `http://localhost:8080`

### Perfis

Ambiente local usa H2 em memória:

- Arquivo: `src/main/resources/application-dev.properties`

Para produção (Render + Aiven/MySQL) usar:

- `src/main/resources/application-prod.properties`  
  e definir as variáveis de ambiente/params com host, porta, database, usuário e senha do Aiven.

### Swagger

Documentação da API (local):

- `http://localhost:8080/swagger-ui.html`

Principais endpoints:

- `POST /auth/register`
- `POST /auth/login`
- `GET /services`
- `POST /services`
- `PUT /services/{id}`
- `DELETE /services/{id}`
- `POST /appointments`
- `GET /appointments/me/cliente`
- `GET /appointments/me/profissional`
- `PUT /appointments/{id}/status?status=CONFIRMADO|CANCELADO`

---

## Como rodar o frontend (local)

Pré-requisitos:
- Node.js (versão LTS)
- npm ou yarn

Passos:

```bash
cd frontend
npm install
npm run dev
```

Aplicação sobe em: `http://localhost:5173`

### Configuração da URL da API

Criar um arquivo `.env` dentro da pasta `frontend` com:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Para ambiente de produção (Vercel), configurar a mesma variável `VITE_API_BASE_URL` apontando para o backend no Render.

---

## Fluxo básico de uso

1. Acessar o frontend (`/`):
   - Listagem de serviços disponíveis.

2. Registrar novo usuário:
   - Menu → Registrar
   - Pode ser **profissional** (cadastra serviços) ou **cliente**.

3. Login:
   - `POST /auth/login` via tela de login.
   - O token JWT é armazenado no `localStorage`.

4. Profissional:
   - Cadastra novos serviços pela página inicial.
   - Acompanha agendamentos em **"Agenda do profissional"**.
   - Pode **confirmar** ou **cancelar** um agendamento.

5. Cliente:
   - Escolhe um serviço e agenda uma data/hora.
   - Visualiza seus agendamentos em **"Meus agendamentos"**.

---

## Links para entrega (exemplo de formato para o Moodle)

Arquivo a ser enviado no Moodle (`links_entrega.md` ou `.txt`):

- Repositório GitHub:  
  `https://github.com/SEU_USUARIO/seu-repositorio-trabalho-final`
- Frontend (Vercel):  
  `https://SEU_FRONT_NO_VERCEL.vercel.app`
- Backend (Render):  
  `https://SEU_BACK_NO_RENDER.onrender.com`
- Swagger (Render):  
  `https://SEU_BACK_NO_RENDER.onrender.com/swagger-ui.html`
- Vídeo de demonstração (YouTube/Drive):  
  `https://link-do-video`

Substituir os links acima pelos links reais após o deploy.
