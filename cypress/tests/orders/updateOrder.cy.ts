import Environment from '../../fixtures/environment'
import Token from '../../fixtures/token'
import App from '../../App'

describe('Update Order', {}, () => {
  let env: Environment
  let token: Token

  before(() => {
    env = new Environment()
    token = new Token()

    // Register client
    App.apiActions.registerClientFlow.registerClient(env, token)
  })

  it('Should update an existing order (204) and reflect the changes', () => {
    App.apiActions.orderFlow.createCartAddItemCreateOrderUpdateOrder(
      env,
      token,
      'Cream Cheese',
      'I wanna pick my order up at 6am.'
    )
  })
})
