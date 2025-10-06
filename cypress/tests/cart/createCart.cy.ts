import Environment from '../../fixtures/environment'
import App from '../../App'

describe('Create Cart', {}, () => {
  let env: Environment

  before(() => {
    env = new Environment()
  })

  it('Should create a cart and successfully retrieve it', () => {
    App.apiActions.cartFlow.createAndGetCart(env)
  })

  it('Should add an item to the cart successfully', () => {
    App.apiActions.cartFlow.createCartAddItemGetCart(env, 'Cream Cheese')
  })
})
