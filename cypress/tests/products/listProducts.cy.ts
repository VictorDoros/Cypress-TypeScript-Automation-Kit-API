import Environment from '../../fixtures/environment'
import App from '../../App'
import TestHelpers from '../../support/TestHelpers'

const PRODUCT_NAME = 'Cream Cheese' as const

describe('Get Products', {}, () => {
  let env: Environment

  before(() => {
    env = new Environment()
  })

  it('Should return 200 and an array response when retrieving the list of products', () => {
    App.apiActions.productFlow.getListProducts(env).then((getListProductsResponse) => {
      expect(getListProductsResponse.status).to.eq(200)
      expect(getListProductsResponse).to.be.an('object')
      expect(getListProductsResponse.body.length).to.be.above(0)
    })  
  })

  it('Should return 200 when retrieving a single product and verify its name and stock are valid', () => {

    App.apiActions.productFlow.getProduct(env, PRODUCT_NAME).then((getProductResponse) => {
      expect(getProductResponse.status).to.eq(200)
      expect(getProductResponse.body.name).to.eq(PRODUCT_NAME)
      expect(getProductResponse.body['current-stock']).to.be.greaterThan(1)
    })
  })
})
