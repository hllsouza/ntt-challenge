# NTT Challenge - Cypress E2E Testing Project

## 🔍 Sobre o Projeto
Este projeto foi desenvolvido para realizar testes End-to-End (E2E) de APIs e interfaces Web utilizando o framework **Cypress**, com relatórios gerados via **Mochawesome**. O projeto está estruturado para facilitar a execução local e em pipelines de CI/CD com Docker e GitHub Actions.

---

## 📂 Estrutura do Projeto
```
ntt-challenge/
├── api/                  # Testes de API com Cypress
│   ├── cypress/          # Configurações, testes e relatórios
│   └── .env              # Variáveis de ambiente para testes API
├── web/                  # Testes Web (UI) com Cypress
│   ├── cypress/          # Configurações, testes e relatórios
│   └── .env              # Variáveis de ambiente para testes Web
├── docker-compose.yml   # Docker Compose para execução dos testes
├── Dockerfile           # Dockerfile para testes com Cypress
├── package.json         # Dependências e scripts NPM
├── README.md            # Documentação do projeto
└── yarn.lock            # Lockfile de dependências
```

---

## 🔧 Requisitos
- Node.js >= 18
- Yarn >= 1.22
- Docker e Docker Compose (opcional, mas recomendado para execução padronizada)

---

## 🚀 Configuração Local
1. **Instalar dependências**:
```bash
yarn install
```

2. **Criar arquivos `.env`**:
- **Para API**: `api/.env`
```env
EMAIL_ADMIN=seu_email_admin
PASSWORD_ADMIN=sua_senha_admin
```

- **Para Web**: `web/.env`
```env
EMAIL_ADMIN=seu_email_admin
PASSWORD_ADMIN=sua_senha_admin
EMAIL_USER=seu_email_user
PASSWORD_USER=sua_senha_user
```

---

## 🌐 Execução Local
### Testes API
- Abrir interface Cypress:
```bash
yarn api:open
```
- Rodar todos os testes com relatório:
```bash
yarn api:run-all
```

### Testes Web (UI)
- Abrir interface Cypress:
```bash
yarn web:open
```
- Rodar todos os testes com relatório:
```bash
yarn web:run-all
```

### Filtrar testes por tag
Exemplo: rodar apenas testes com tag `@login-admin`
```bash
yarn api:test:grep -- --env grepTags=@login-admin
```

---

## 📃 Relatórios de Teste (Mochawesome)
- Relatórios são gerados em:
  - `api/cypress/reports/index.html`
  - `web/cypress/reports/index.html`
- Para visualizar:
```bash
open api/cypress/reports/index.html
open web/cypress/reports/index.html
```

---

## 🛠️ Execução com Docker
- **Build e execução dos testes**:
```bash
docker-compose up --build
```
- O Docker irá rodar os testes **API** e **Web**, gerando relatórios em:
  - `api/cypress/reports/`
  - `web/cypress/reports/`

---

## 🌟 GitHub Actions - CI/CD
O projeto inclui uma pipeline que executa:
- Testes API
- Testes Web
- Gera e faz upload dos relatórios Mochawesome (.zip) como artefato da pipeline

### Secrets Necessários:
- `EMAIL_ADMIN`, `PASSWORD_ADMIN`
- `EMAIL_USER`, `PASSWORD_USER`

### Resultado:
Relatórios compactados disponíveis como artefato para download no GitHub.

---

## 🚜 Scripts NPM Disponíveis
| Script                   | Ação                                                   |
|-------------------------|--------------------------------------------------------|
| `api:test`              | Rodar testes API                                      |
| `api:open`              | Abrir interface Cypress (API)                         |
| `api:run-all`           | Rodar testes API + gerar relatório                   |
| `web:test`              | Rodar testes Web                                      |
| `web:open`              | Abrir interface Cypress (Web)                         |
| `web:run-all`           | Rodar testes Web + gerar relatório                   |

---

## 🚧 Tecnologias e Ferramentas
- [Cypress](https://www.cypress.io/) para automação de testes E2E
- [Mochawesome](https://www.npmjs.com/package/mochawesome) para relatórios
- [Faker](https://fakerjs.dev/) para geração de dados dinâmicos
- Docker e GitHub Actions para CI/CD

