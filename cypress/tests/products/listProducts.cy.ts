import Environment from '../../fixtures/environment'
import App from '../../App'

describe('Get Products', {}, () => {
  let env: Environment

  before(() => {
    env = new Environment()
  })

  it('Should return 200 and an array response when retrieving the list of products', () => {
    App.apiActions.productFlow.getListProducts(env)
  })

  it('Should return 200 when retrieving a single product and verify its name and stock are valid', () => {
    App.apiActions.productFlow.getProduct(env, 'Cream Cheese')
  })
})
