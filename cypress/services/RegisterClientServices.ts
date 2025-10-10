import Environment from '../fixtures/environment'
import Token from '../fixtures/token'
import { faker } from '@faker-js/faker'

export default class RegisterClient {
  registerClient(env: Environment, token: Token) {
    return cy
      .step('Register client')
      .api({
        url: `${env.getEnvironment()}/api-clients`,
        method: 'POST',
        body: {
          clientName: `${faker.person.firstName()}`,
          clientEmail: `${faker.internet.email()}`,
        },
      })
      .then((response) => {
        token.setToken(response.body.accessToken)
      })
  }
}
