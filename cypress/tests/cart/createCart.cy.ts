import Environment from '../../fixtures/environment'
import App from '../../App'

describe('Get products', {}, () => {
  let env: Environment

  before(() => {
    env = new Environment()
  })

  it('Create the cart, get it', () => {
    App.apiActions.cartFlow.createAndGetCart(env)
  })

  it('Should have status 200 and response be an array when getting the list of the products', () => {
    App.apiActions.cartFlow.createCartAddItemGetCart(env, 'Cream Cheese')
  })
})
