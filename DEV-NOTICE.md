# Developper Notice

The RNAniseed project has started in march 2023. The initial codebase uses React JS and 
retrive data from the RNAniseed API.

## Simple, Elegant, Documented

For any project, the structure is the key to scalability and further growth. The 
development of the RNAniseed project has 3 fondamental pillars : 

1. **Simple** : The code should be easy to understand. Any piece of code should 
                be written to be understood later by a developper who doesn't
                know the codebase. Components should be concise, states should 
                have explicit names and only the wheel shouldn't be reinvented
                when a JS function already does the job. Simplicity is all 
                about making sure the code is as concise as possible, including
                not over-ingeneer simple function.

2. **Elegant** : RNAniseed should have an elegant codebase. In some way, an 
                 elegant code is linked to the **Simple** principle because 
                 an elegant codebase is often easier to read.
                 As such the **Elegant** principle is the opposite of a dirty
                 code. An elegant code should have well named variables, consitent
                 typing, should place the logic of a component in an expected 
                 order. In a few words : Elegant is the principle you have to 
                 keep in mind when you just make a quick fix. Instead be elegant
                 and take your time to build a stable solution. 

3. **Documented** : The code should be well documented in order to be verify that
                    a component have a single responsibility and making sure any 
                    additional fonctionnality fall in the scope of responsability 
                    of the component. Documented blocs should be added to precise 
                    the role of every state (indicated by **@state** in the doc) 
                    and the effect of every function within a component. There is 
                    a lot of rules about how to document the project within the 
                    codebase but keep the **Simple** principle in mind : only 
                    write documentation on top of the thing you are describing in 
                    a concise way.

## General structure
 

## File structure

The RNAniseed project has been started using the create-react-app package which allow a 
great flexibility for the code base. However a solid file strucutre is required to ensure 
scalability of the project as well as making create new features easy.

The main code of the app is the **/src** folder

1. **/api** : contains the endpoints used to communicate with the RNAniseed API. All the 
              endpoints are located there making the deployment to live server easier by 
              simply changing the **LOCAL_API** variable to the **PROD_API** before building
              the App using the React routines (see more on deployment manual)

2. **/components** : contains some components that can be reused at multiple parts of the 
                     project. A component in this folder should not be modified often. 
                     Creating and updating a component within this folder impacts many 
                     pages and specific components in the entire app so there is many 
                     rules to follow to prevent bugs and exceptions (see the global 
                     component manifest for more details)

3. **/pages** : contains components that represent an entire page. A page component can 
                can be composed of multiple layers containing specific logic but the 
                page component is here to bundle the layers logic into a single component.
                Every page have a specific URL except for very close pages that can't share
                the same URL. But in general : 1 URL = 1 page. (see page creation manual)

# Developper 



## Developper Contributors

Any person who have touch the RNAniseed-App codebase should have their name 
written below as well as an email adress that can be used to reach 
previous developper if necessary.

1. Brieuc Quemeneur
   march 2023 - august 2023
   (brieucquemeneur@gmail.com)