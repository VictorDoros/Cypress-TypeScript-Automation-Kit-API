class TestHelpers {
  /**
   * Defines a test step with the given description.
   * Wrapper around `cy.step()` for clearer step reporting.
   *
   * @param description - The text used to describe the step.
   */
  defineTheStep(description: string) {
    return cy.step(description)
  }
}

export default new TestHelpers()