import Environment from '../../fixtures/environment'
import Token from '../../fixtures/token'
import App from '../../App'

describe('Create Order', {}, () => {
  let env: Environment
  let token: Token

  before(() => {
    env = new Environment()
    token = new Token()

    // Register client
    App.apiActions.registerClientFlow.registerClient(env, token)
  })

  it('Should create a cart and successfully retrieve it', () => {
    App.apiActions.cartFlow.createAndGetCart(env)
  })
})
