# FinanGen - Sistema de Gerenciamento Financeiro

FinanGen é uma aplicação Full-Stack de gerenciamento financeiro pessoal. O projeto consiste em uma API REST robusta desenvolvida com **Java e Spring Boot** e um frontend moderno e reativo construído com **Angular 17**.

## ✨ Funcionalidades

* **Autenticação Segura**: Sistema de login com Tokens JWT.
* **Dashboard Inicial**: Uma tela de resumo com uma prévia dos principais dados cadastrados.
* **Gerenciamento Completo (CRUD)** para as seguintes entidades:
    * Usuários
    * Bancos
    * Categorias de Lançamentos
    * Contas Bancárias
    * Lançamentos Financeiros (Crédito e Débito)

## 💻 Tecnologias Utilizadas

#### **Backend (API REST)**
* **Java 17**
* **Spring Boot 3**
* **Spring Security**: Para autenticação e autorização com JWT.
* **Spring Data JPA / Hibernate**: Para persistência de dados.
* **Maven**: Para gerenciamento de dependências.
* **Banco de Dados H2**: Configurado para rodar em memória, facilitando a instalação inicial (pode ser facilmente alterado para PostgreSQL ou outro SGBD no `application.properties`).

#### **Frontend**
* **Angular 17** (com componentes Standalone)
* **TypeScript**
* **Angular Material**: Para a interface de usuário.
* **SCSS**: Para estilização.

---

## 🚀 Como Executar o Projeto

Para utilizar a aplicação completa, tanto a API quanto o Frontend precisam estar em execução simultaneamente. Siga os passos abaixo.

### ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* **JDK 17** ou superior.
* **Maven 3.8** ou superior.
* **Node.js 18.x** ou superior.
* **Angular CLI v17** ou superior (`npm install -g @angular/cli`).
* **Git** para clonar o repositório.
* Uma IDE de sua preferência (ex: IntelliJ IDEA para o backend, VS Code para o frontend).

### 1. Configurando e Executando o Backend (API REST)

A API é o cérebro da nossa aplicação e precisa ser iniciada primeiro.

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DA_PASTA_DO_BACKEND>
    ```

2.  **Compile o projeto com o Maven:**
    Este comando irá baixar todas as dependências necessárias.
    ```bash
    mvn clean install
    ```

3.  **Execute a aplicação Spring Boot:**
    Você pode fazer isso pela sua IDE (procurando a classe principal `FinangenApplication.java` e clicando em "Run") ou via terminal:
    ```bash
    mvn spring-boot:run
    ```

✅ **Pronto!** O servidor da API estará rodando, por padrão, em `http://localhost:8080`. O banco de dados H2 será criado em memória e populado com os dados iniciais do arquivo `DBService.java`.

### 2. Configurando e Executando o Frontend (Angular)

Com a API no ar, agora podemos iniciar a interface do usuário.

1.  **Abra um novo terminal** e navegue até a pasta do projeto frontend:
    ```bash
    cd <NOME_DA_PASTA_DO_FRONTEND> # Geralmente "finangen-frontend"
    ```

2.  **Instale as dependências do Node.js:**
    ```bash
    npm install
    ```

3.  **Verifique a URL da API:**
    Abra o arquivo `src/environments/environment.ts` e certifique-se de que a variável `apiUrl` aponta para o seu backend. O padrão já deve estar correto:
    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:8080'
    };
    ```

4.  **Inicie o servidor de desenvolvimento do Angular:**
    ```bash
    ng serve
    ```

✅ **Tudo pronto!** Abra seu navegador e acesse `http://localhost:4200`.

## 🔑 Credenciais de Acesso

A aplicação é populada com dados iniciais para facilitar os testes. Para fazer o login, utilize as seguintes credenciais:

* **Email**: `felipezocal@gmail.com`
* **Senha**: `003`

Após o login, você será redirecionado para o Dashboard e poderá navegar por todas as funcionalidades do sistema.
