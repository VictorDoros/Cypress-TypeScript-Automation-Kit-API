import Environment from '../../fixtures/environment'
import Token from '../../fixtures/token'
import App from '../../App'

describe('Delete Order', {}, () => {
  let env: Environment
  let token: Token

  before(() => {
    env = new Environment()
    token = new Token()

    // Register client
    App.apiActions.registerClientFlow.registerClient(env, token)
  })

  it('Should delete an order (204) and return 404 when retrieving it', () => {
    App.apiActions.orderFlow.createCartAddItemCreateOrderDeleteOrder(env, token, 'Cream Cheese')
  })
})
