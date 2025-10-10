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
Cypress-API-Kit/
├── .github/
│   └── workflows/
│       └── main.yml                     # GitHub Actions CI workflow
│
├── cypress/
│   ├── fixtures/                        # Static test data and configs
│   │   ├── environment.ts               # Environment config (QA/Staging/Prod)
│   │   └── token.ts                     # Token and authentication helpers
│   │
│   ├── flows/                           # Reusable multi-step logic (end-to-end flows)
│   │   ├── CartFlow.ts                  # Flow handling cart actions
│   │   ├── OrderFlow.ts                 # Flow handling order creation/update
│   │   ├── ProductFlow.ts               # Flow handling product operations
│   │   └── RegisterClientFlow.ts        # Flow for client registration
│   │
│   ├── services/                        # API endpoints grouped by domain
│   │   ├── CartServices.ts              # /cart endpoints
│   │   ├── OrderServices.ts             # /orders endpoints
│   │   ├── ProductServices.ts           # /products endpoints
│   │   └── RegisterClientServices.ts    # /clients endpoints
│   │
│   ├── support/                         # Global support utilities
│   │   ├── commands.ts                  # Custom Cypress commands
│   │   ├── e2e.ts                       # Global before/after hooks setup
│   │   └── TestHelpers.ts               # Helper functions and custom step wrappers
│   │
│   ├── tests/                           # API test specs
│   │   ├── cart/
│   │   │   ├── createCart.cy.ts         # Create cart API test
│   │   │   └── updateCart.cy.ts         # Update cart API test
│   │   │
│   │   ├── orders/
│   │   │   ├── createOrder.cy.ts        # Create order API test
│   │   │   ├── deleteOrder.cy.ts        # Delete order API test
│   │   │   └── updateOrder.cy.ts        # Update order API test
│   │   │
│   │   └── products/
│   │       └── listProducts.cy.ts       # List products API test
│   │
│   ├── App.ts                           # Entry or bootstrap file
│   ├── cypress.d.ts                     # Custom Cypress type declarations
│   ├── cypress.config.ts                # Cypress configuration
│   └── tsconfig.json                    # TypeScript configuration for Cypress
│
├── package.json                         # Scripts and dependency management
├── package-lock.json                    # Locked dependency versions
├── README.md                            # Project documentation
└── .gitignore                           # Git ignored files and folders
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
