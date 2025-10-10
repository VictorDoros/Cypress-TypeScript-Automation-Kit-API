import Environment from '../../fixtures/environment'
import App from '../../App'
import TestHelpers from '../../support/TestHelpers'

describe('Create Cart', {}, () => {
  let env: Environment

  before(() => {
    env = new Environment()
  })

  it('Should create a cart and successfully retrieve it', () => {
    App.apiActions.cartFlow
      .createAndGetCart(env)
      .then(({ createCartResponse, getCartResponse }) => {
        TestHelpers.defineTheStep(
          'Confirm status code 201 when creating a cart'
        ).then(() => {
          expect(createCartResponse.status).to.eq(201)
        })

        TestHelpers.defineTheStep(
          'Verify that the cart retrieval returns status 200 and no items'
        ).then(() => {
          expect(getCartResponse.status).to.eq(200)
          expect(getCartResponse.body.items).to.be.an('array').and.empty
        })
      })
  })

  it('Should add an item to the cart successfully', () => {
    App.apiActions.cartFlow
      .createCartAddItemGetCart(env, 'Cream Cheese')
      .then(({ addItemResponse, getCartResponse, productId }) => {
        TestHelpers.defineTheStep(
          'Confirm status code 201 when adding an item'
        ).then(() => {
          expect(addItemResponse.status).to.eq(201)
          expect(addItemResponse.body.created).to.be.true
        })

        TestHelpers.defineTheStep(
          'Verify that the added item appears in the cart with matching product ID'
        ).then(() => {
          expect(getCartResponse.body.items.length).eq(1)
          expect(getCartResponse.body.items[0].productId).to.eq(productId)
        })
      })
  })
})
