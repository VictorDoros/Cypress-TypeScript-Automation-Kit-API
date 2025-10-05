import RegisterClientServices from '../services/RegisterClientServices'
import Environment from '../fixtures/environment'
import Token from '../fixtures/token'

class RegisterClientFlow {
  private registerClientServices = new RegisterClientServices()

  registerClient(env: Environment, token: Token) {
    return this.registerClientServices.registerClient(env, token)
  }
}

export default new RegisterClientFlow()
