# Automation Project

I used [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress) and TypeScript for this project.

>Reason being, we can use this as an indirect reference for other automation projects, and also for me to explore a different framework to really understand the benefits and drawbacks of our current approach.

I set this up to run in a CI/CD pipeline using [Github Actions](https://github.com/jeremiah-baclig/cypressPOC/actions). Every push to your branch should trigger this flow.

### Running this locally
The tests live [HERE](https://github.com/jeremiah-baclig/cypressPOC/tree/main/src/cypress/e2e), meaning you can clone this repo and make adjustments to the tests accordingly.

Here's a quick rundown of running the tests locally:
1. Clone repository, and navigate to `/cypress`
2. In cmd, run `npm install`
3. You can see the scripts [HERE](https://github.com/jeremiah-baclig/cypressPOC/blob/main/src/package.json) but there are 2 ways to run the tests
   1. `npm run cy:run` will run all tests one time
   2. `npm run cy:open` will open a window with prompts, utilizing the built-in Cypress test runner
      - I prefer this method as I can continuously make updates, choose tests, and see how it affects the tests
      - You will also want to run using Chrome
4. If you run into any issues, visit: https://docs.cypress.io/guides/getting-started/installing-cypress 

--- 

### My Test Cases
*JSON Placeholder*
 Test        | Description           | 
| ------------- |:-------------:| 
| GET comments | Simple API call to comments API and verifying response | 
| Script button  | Navigate to page and click script button. Intercept that result and also make call to the same API and compare results |
| GET users | GET for all users, store them, and then sort them in alphabetical order |
| POST to posts | POST to create post. Data sent should match the return |
| PATCH to posts | PATCH to update posts. Data sent should match the return |
| DELETE posts | DELETE posts/1 and assert response is successful |

*Sauce Labs*

 Test        | Description           | 
| ------------- |:-------------:| 
| Full user journey | Login, add all items to cart, navigate through purchase process and verify success | 
| Positive filter interactions | Login, utilize all filter dropdowns and this should NOT affect page functionality |
| Positive flow from item | Can add to cart from specific item page |
| Locked out user | Locked out user cannot login and yields error |
| Invalid user | Invalid credentials cannot login and yields error |

---

### Criteria 
Select a UI and a API site to test from: https://ultimateqa.com/dummy-automation-websites/  
- [SauceDemo.com (Web UI)](https://www.saucedemo.com/) 
- [JSONPlaceholder (API)](https://jsonplaceholder.typicode.com/) 

**Other considerations**
- No hardcoded data – connect to external source (csv, database, file? etc)
- Test Cases should have appropriate validations, naming conventions, and comments
- No play and record options, must be coded.
- Coding language: optional
- Framework: Optional? Playwright recommended  

### Test Cases
**At least 4 for API testing and verifying data**
- 1 GET
- 1 POST test case
- Use API returned results in a workflow
  - Collect data and create artifact after manipulating it in some way (reverse the order, select last 5, etc) 

**At least 4 UI test cases**
- 1 login verification 
- 1 positive test case 
- 1 negative test case validation 
- 1 end to end workflow 

*3 additional cases, any type.* 

**Timeline goal: 2 months**
