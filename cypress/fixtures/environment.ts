export default class Environment {
  private urls: Record<string, string> = {
    qa: 'https://simple-grocery-store-api.click',
    staging: 'https://simple-grocery-store-api.click',
    prod: 'https://simple-grocery-store-api.click',
  }

  getEnvironment(): string {
    const env = Cypress.env('env')
    return this.urls[env]
  }
}
