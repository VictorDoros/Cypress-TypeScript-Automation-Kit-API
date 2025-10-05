import ProductServices from '../services/ProductServices'
import Environment from '../fixtures/environment'

class ProductFlow {
  private productServices = new ProductServices()

  getListProducts(env: Environment) {
    return this.productServices.getAllProducts(env).then((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.be.an('object')
      expect(response.body.length).to.be.above(0)
    })
  }

  getListProductsAndReturnProductId(env: Environment, productName: string) {
    return this.getListProducts(env).then((responseGetListProducts) => {
      const foundProduct = (responseGetListProducts.body as any[]).find(
        (product) => product.name === productName && product.inStock === true
      )
      if (!foundProduct) {
        throw new Error(`Product ${productName} not found or not in stock`)
      }
      return foundProduct?.id
    })
  }

  getProduct(env: Environment, productName: string) {
    return this.getListProductsAndReturnProductId(env, productName).then(
      (productId) => {
        return this.productServices
          .getSingleProduct(env, productId)
          .then((getProductResponse) => {
            expect(getProductResponse.status).to.eq(200)
            expect(getProductResponse.body.name).to.eq(productName)
            expect(getProductResponse.body['current-stock']).to.be.above(1)
          })
      }
    )
  }
}

export default new ProductFlow()
