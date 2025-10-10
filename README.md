# Cypress API Testing Kit (TypeScript)

A ready-to-use **API automation framework** built with [Cypress](https://www.cypress.io/) and TypeScript.  
It provides a clean structure for scalable API testing — using services, flows, and type-safe DTOs.

---

## 🚀 Features

- ✅ TypeScript end-to-end typing (services, flows, DTOs)
- 🧩 Modular structure: **services → flows → tests**
- 🔐 Environment-based configuration (QA, Staging, Prod)
- 🧠 Reusable helper utilities and fixtures
- 💬 Step logging with `cypress-plugin-steps`
- 📦 CI-ready (GitHub Actions template included)
- 🔍 Easy to extend for any REST API project

---

## 🗂️ Folder Structure

```
cypress/
├── fixtures/           # Test data, tokens, environment configs
├── flows/              # Reusable multi-step test flows
├── services/           # Low-level API service calls
├── support/            # Helpers, plugins, and Cypress setup
├── tests/              # API test cases (organized by feature)
└── tsconfig.json       # TypeScript configuration
```

---

## ⚙️ Setup

### Prerequisites
- **Node.js ≥ 18**
- **npm ≥ 8**

### Installation
```bash
npm install
```

### Environment
Set your environment before running tests:
```bash
# options: qa | staging | prod
npx cypress run --env env=staging
```

> Note: All three environments currently point to the same link.  
> This setup is intentional to illustrate how to structure environment configuration, so it can easily be extended with unique URLs when needed.

---

## 🧠 Used Extensions

- [Cypress Plugin API](https://github.com/filiphric/cypress-plugin-api)
- [Cypress Plugin Steps](https://github.com/filiphric/cypress-plugin-steps)
