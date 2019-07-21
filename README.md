# Automated testing using Cypress.io

This is a simple exercise with a few test cases being automatically run in cypress. 

## How to run the tests

1. Clone this git repo into local machine
2. Run `yarn` to install dependencies
3. Run `yarn run cypress open` to launch the cypress standalone application and run the tests
4. In alternative, cypress tests can be run in headless mode by using `yarn run cypress run`

### Observations

The spec file uses a more keyword driven syntax. Most of the direct calls to the cypress API were wrapped within functions in a page object document. 
There is one of the cases which is failing due to the fact that the session cookie has not been preserved between test cases. 

### Things that need to be done

* Figure out a way to preserve session cookies between test cases
* Implement coverage for the other scenarios