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

  it('Should return 201 when a new order is created', () => {
    App.apiActions.orderFlow.createCartAddItemGetCartCreateOrder(env, token, 'Cream Cheese')
  })
})
