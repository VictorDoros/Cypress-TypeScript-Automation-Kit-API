import CartFlow from './flows/CartFlow'
import ProductFlow from './flows/ProductFlow'

class API_Actions {
  get productFlow() {
    return ProductFlow
  }

  get cartFlow() {
    return CartFlow
  }
}

class App {
  apiActions = new API_Actions()
}

export default new App()
