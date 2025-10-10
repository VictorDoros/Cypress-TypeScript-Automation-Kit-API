import Environment from '../../fixtures/environment'
import Token from '../../fixtures/token'
import App from '../../App'
import TestHelpers from '../../support/TestHelpers'

const ORDER_COMMENT = 'I wanna pick my order up at 6am.' as const

describe('Update Order', {}, () => {
  let env: Environment
  let token: Token

  before(() => {
    env = new Environment()
    token = new Token()

      App.apiActions.registerClientFlow.registerClient(env, token)
  })

  it('Should return 204 after updating the order and verify the comment was changed', () => {
    App.apiActions.orderFlow.createCartAddItemCreateOrderUpdateOrder(
      env,
      token,
      'Cream Cheese',
      ORDER_COMMENT
    ).then(({updateOrderResponse, getOrderResponse}) => {

        TestHelpers.defineTheStep('Confirm status code 204 when updating the order\'s comment').then(() => {
          expect(updateOrderResponse.status).to.eq(204)
                              })

        TestHelpers.defineTheStep('Verify the order comment was updated successfully').then(() => {
          expect(getOrderResponse.body.comment).to.eq(ORDER_COMMENT)
                              })
    })
  })
})
