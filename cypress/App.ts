import CartFlow from './flows/CartFlow'
import OrderFlow from './flows/OrderFlow'
import ProductFlow from './flows/ProductFlow'
import RegisterClientFlow from './flows/RegisterClientFlow'

class API_Actions {
  get productFlow() {
    return ProductFlow
  }

  get cartFlow() {
    return CartFlow
  }
  
  get orderFlow() {
    return OrderFlow
  }

  get registerClientFlow() {
    return RegisterClientFlow
  }
}

class App {
  apiActions = new API_Actions()
}

export default new App()
