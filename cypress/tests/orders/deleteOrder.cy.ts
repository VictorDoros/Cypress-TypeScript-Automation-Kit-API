import Environment from '../../fixtures/environment'
import Token from '../../fixtures/token'
import App from '../../App'
import TestHelpers from '../../support/TestHelpers'

describe('Delete Order', {}, () => {
  let env: Environment
  let token: Token

  before(() => {
    env = new Environment()
    token = new Token()

    App.apiActions.registerClientFlow.registerClient(env, token)
  })

  it('Should delete an order and return status 204, then 404 when retrieving it', () => {
    App.apiActions.orderFlow.createCartAddItemCreateOrderDeleteOrder(
      env,
      token,
      'Cream Cheese'
    ).then(({deleteOrderResponse, getOrderResponse, orderId}) => {

        TestHelpers.defineTheStep('Confirm status code 204 when removing an order').then(() => {
          expect(deleteOrderResponse.status).to.eq(204)
                        })

        TestHelpers.defineTheStep('Confirm status code 404 when retrieving a deleted order').then(() => {
          expect(getOrderResponse.status).to.eq(404)
          expect(getOrderResponse.body.error).to.eq(`No order with id ${orderId}.`)
                        })
    })
  })
})
