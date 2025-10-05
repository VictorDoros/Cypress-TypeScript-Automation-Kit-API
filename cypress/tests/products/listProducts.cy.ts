import Environment from '../../fixtures/environment'
import App from '../../App'

describe('Get products', {}, () => {
  let env: Environment

  before(() => {
    env = new Environment()
  })

  it('Should have status 200 and response be an array when getting the list of the products', () => {
    App.apiActions.productFlow.getListProducts(env)
  })

  it('Should have status 200 after getting a single product, have the corresponding product name, and current stock above 1', () => {
    App.apiActions.productFlow.getProduct(env, 'Cream Cheese')
  })
})
