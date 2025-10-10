import ProductServices from '../services/ProductServices'
import Environment from '../fixtures/environment'

class ProductFlow {
  private productServices = new ProductServices()

  /**
   * Retrieves the list of all available products.
   *
   * @param env - Target environment/config for the API request.
   */
  getListProducts(env: Environment) {
    return this.productServices
      .getAllProducts(env)
      .then((getListProductsResponse) => {
        return getListProductsResponse
      })
  }

  /**
   * Retrieves the list of products and returns the ID of a product
   * that matches the given name and is currently in stock.
   *
   * @param env - Target environment/config for the API request.
   * @param productName - The name of the product to search for.
   */
  getListProductsAndReturnProductId(env: Environment, productName: string) {
    return this.getListProducts(env).then((getListProductsResponse) => {
      const foundProduct = (getListProductsResponse.body as any[]).find(
        (product) => product.name === productName && product.inStock === true
      )
      if (!foundProduct)
        throw new Error(`Product ${productName} not found or not in stock`)
      return foundProduct.id
    })
  }

  /**
   * Retrieves detailed information for a specific product by name.
   *
   * @param env - Target environment/config for the API request.
   * @param productName - The name of the product to fetch.
   */
  getProduct(env: Environment, productName: string) {
    return this.getListProductsAndReturnProductId(env, productName).then(
      (productId) => {
        return this.productServices.getSingleProduct(env, productId)
      }
    )
  }
}

export default new ProductFlow()
