import Environment from '../../fixtures/environment'
import App from '../../App'

describe('Get products', {}, () => {
  let env: Environment

  before(() => {
    env = new Environment()
  })

  it('Should create a cart and successfully retrieve it', () => {
    App.apiActions.cartFlow.createAndGetCart(env)
  })

  it('Should return 200 and an array response when retrieving the list of products', () => {
    App.apiActions.cartFlow.createCartAddItemGetCart(env, 'Cream Cheese')
  })
})
