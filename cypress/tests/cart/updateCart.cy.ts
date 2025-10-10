import Environment from '../../fixtures/environment'
import App from '../../App'
import TestHelpers from '../../support/TestHelpers'

describe('Updated Cart', {}, () => {
  let env: Environment

  before(() => {
    env = new Environment()
  })

  it('Should update item quantity and confirm it differs from the initial value', () => {
    App.apiActions.cartFlow.createCartAddItemUpdateQuantityItem(
      env,
      'Cream Cheese'
    ).then(({initialQuantity, updateQuantityResponse, updatedQuantity}) => {

      TestHelpers.defineTheStep('Verify the initial item quantity in the cart is 1').then(() => {
        expect(initialQuantity).to.eq(1)
      })

      TestHelpers.defineTheStep('Confirm status code 204 when updating the item\'s quantity').then(() => {
        expect(updateQuantityResponse.status).to.eq(204)  
      })

      TestHelpers.defineTheStep('Verify the updated quantity differs from the initial value').then(() => {
        expect(updatedQuantity).to.not.eq(initialQuantity) 
      })
    })
  })

  it('Should return 204 and confirm the cart item was replaced with a different product', () => {
    App.apiActions.cartFlow.createCartAddItemReplaceItem(
      env,
      'Cream Cheese',
      'French Bread'
    ).then(({initialProductId, replaceItemResponse, getCartResponseBefore, getCartResponseAfter, replacedProductId }) => {

      TestHelpers.defineTheStep('Verify the initial cart item matches the expected product ID').then(() => {
        expect(getCartResponseBefore.body.items[0].productId).to.eq(initialProductId)
      })

      TestHelpers.defineTheStep('Confirm status code 204 when replacing the cart item').then(() => {
        expect(replaceItemResponse.status).to.eq(204)
      })
      
      TestHelpers.defineTheStep('Verify the cart item was replaced and the product ID differs from the original').then(() => {
        expect(initialProductId).not.to.eq(replacedProductId)
        expect(getCartResponseAfter.body.items[0].productId).to.eq(replacedProductId)
      })
    })
  })
})
