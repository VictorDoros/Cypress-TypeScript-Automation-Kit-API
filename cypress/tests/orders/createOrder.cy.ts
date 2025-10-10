import Environment from '../../fixtures/environment'
import Token from '../../fixtures/token'
import App from '../../App'
import TestHelpers from '../../support/TestHelpers'

describe('Create Order', {}, () => {
  let env: Environment
  let token: Token

  before(() => {
    env = new Environment()
    token = new Token()

    App.apiActions.registerClientFlow.registerClient(env, token)
    
  })

  it('Should create a new order successfully and return status 201', () => {
    App.apiActions.orderFlow.createCartAddItemGetCartCreateOrder(
      env,
      token,
      'Cream Cheese'
    ).then(({createOrderResponse, getOrderResponse}) => {

        TestHelpers.defineTheStep('Confirm status code 201 when creating an order').then(() => {
          expect(createOrderResponse.status).to.eq(201)
          expect(createOrderResponse.body.created).to.be.true
                  })

        TestHelpers.defineTheStep('Verify the order contains one item and has an empty comment').then(() => {
        expect(getOrderResponse.body.items.length).to.eq(1)
        expect(getOrderResponse.body.comment).is.empty
                  })
    })
  })
})
