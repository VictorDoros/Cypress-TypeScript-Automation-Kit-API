import Environment from '../../fixtures/environment'
import App from '../../App'

describe('Get products', {}, () => {
  let env: Environment

  before(() => {
    env = new Environment()
  })

  it('Should return 204 after updating item quantity and verify the quantity differs from the initial value', () => {
    App.apiActions.cartFlow.createCartAddItemUpdateQuantityItem(env, 'Cream Cheese')
  })

    it('Should return 204 after replacing the cart item and verify the new item differs from the original', () => {
    App.apiActions.cartFlow.createCartAddItemReplaceItem(env, 'Cream Cheese', 'French Bread')
  })
})
