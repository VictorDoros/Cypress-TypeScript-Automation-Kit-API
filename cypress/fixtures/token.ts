export default class Token {
  private token: string = ''

  getToken() {
    return this.token
  }

  setToken(token: string) {
    this.token = token
  }
}
