# Developper Notice

The RNAniseed project has started in **march 2023**. The initial codebase uses **React JS** and 
retrive data from the **RNAniseed API**.

As a new developper on the project, reading this developper notice will help you understand the 
project, the goals, the choices made during development and guide you in your journey as a 
RNAniseed developper.

## Some background

RNAniseed is a project which allow the ascidian community to visualize single cell RNA seq data 
from datasets uploaded by the community. The ascidian community is not used to explore large 
datasets and lack the expertise to do so on their own using tools like R, python or CellxGene.

The main goal of RNAniseed is to offer a simple interface allowing the biologist to select a 
dataset, filter the data he is interested in and propose a visual map of selected data 
automatically.

As single cell RNA seq data is not currently used a lot by the ascidian community, the role of 
the RNAniseed application is still to be defined but the biology expertise about the use of 
single cell RNA seq data tends to imply an interest for two types of uses:

1. **Dataset Exploration** : Exploring large single cell RNA seq datasets is often a pain when 
                             the team lack the expertise in bio-informatics. RNAniseed is here 
                             to propose a simple visualization solution to explore the ascidian 
                             datasets. Tools developped to help the exploration of the datasets
                             can be laveraged by the biologist to find intersting details or 
                             new research subjects to investigate in.

2. **Datasets Comparison** : Comparing two datasets requires statistics a good expertise in 
                             bio-informatics. Comparing datasets is still very important 
                             for the ascidian community and their reseach topics. RNAniseed is 
                             here to lower the barrier to entry and allow biologists to have an 
                             access to a simple set of comparison tools.

One demand of the community is to develop a simple to use tool. This should be taken in consideration
for the UI and during the development of the functionnalities. Opting for an AGILE method and gathering
feedback when new fonctionnalities are in their pre-production stage is a great way to verify that 
the feature fit the need of the ascidian community.

## Technologies behind

RNAniseed uses multiple mature technologies that you should be familiar with in order to understand
the codebase correctly. If you are not quite familiar with those 
technologies, it's clearly worth taking the time learning them because following our coding 
principles require a good knowledge of the technologies used underneeth.

1. **React JS** : React JS is a minimalist Javascript framework adapted for reactive single page 
                  applications. It's a very flexible, mature and widely used framework. As such
                  with a wide ecosystem of libraries, React JS was the best choice to design the 
                  User Interface (UI) of RNAniseed. React JS documentation **(https://react.dev/)**

2. **Tailwind CSS** : Tailwind CSS is a tool that helps to style the Application in a minimalist
                      and simple manner. Like bootstrap, Tailwind CSS propose simple CSS classes 
                      to add style to any html element within the Application. Tailwind CSS is very 
                      flexible, giving full control of the style of the UI. 
                      Tailwind CSS documentation **(https://tailwindcss.com/docs/installation)**


## The principles: Simple, Elegant, Documented

For any project, the structure is the key to scalability and further growth. The 
development of the RNAniseed project has 3 fondamental pillars : 

1. **Simple** : The code should be easy to understand. Any piece of code should 
                be written to be understood later by a developper who doesn't
                know the codebase. Components should be concise, states should 
                have explicit names and the wheel shouldn't be reinvented
                when a **JS function** already does the job well enough. **Simplicity** is all 
                about making sure the code is as concise as possible, preventing
                over-ingeneering simple functions.

2. **Elegant** : RNAniseed should have an elegant codebase. In some way, an 
                 elegant code is linked to the **Simple** principle because 
                 an elegant codebase is often easier to read.
                 As such the **Elegant** principle is the opposite of a dirty
                 code. An **Elegant** code should have well named variables, consitent
                 typing, should place the logic of a component in an expected 
                 order. In a few words : **Elegant** is the principle you have to 
                 keep in mind when you just make a quick fix. Instead be **Elegant**
                 and take your time to build a stable solution. 

3. **Documented** : The code should be well **documented** in order to be verify that
                    a component have a single responsibility and making sure any 
                    additional fonctionnality fall in the scope its responsability.
                    Documented blocs should be added to precise 
                    the role of every state (indicated by **@state** in the doc) 
                    and the effect of every function within a component. There is 
                    a lot of rules about how to document the project within the 
                    codebase but keep the **Simple** principle in mind : only 
                    write documentation above the thing you are describing in 
                    a concise way.

These principles will follow your journey all along. You can write small tests and break the 
code as much as you need to but always keep you bench clean at the end of your coding session. 
For every small improvement you make in the codebase make sure it's **simple**, **elegant** and **documented** before linking it to the rest of the project. 

Push only **Simple**, **Elegant** and **Documented** components to the codebase

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