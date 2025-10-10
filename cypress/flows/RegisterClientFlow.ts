import RegisterClientServices from '../services/RegisterClientServices'
import Environment from '../fixtures/environment'
import Token from '../fixtures/token'

class RegisterClientFlow {
  private registerClientServices = new RegisterClientServices()


  /**
   * Registers a new client in the given environment using the provided token.
   *
   * @param env - Target environment/config for the API request.
   * @param token - Authorization token used to authenticate the client registration.
   */
  registerClient(env: Environment, token: Token) {
    return this.registerClientServices.registerClient(env, token)
  }
}

export default new RegisterClientFlow()
