# Application documentation (Frontend)

The **app** part of the Application is the frontend. It consumes data sent by the API.

## Launching the application

The application is created using the ReactJS framework. Thus, to launch the developpment version of 
the application simply execute this command in the **app** directory:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Creating the production build

ReactJS needs to be built in order to be publised in a production environment. 
To build the application:

```bash
npm run build
```

A more performant version of the application is created and can be published directly on the server in 
the **/cellxgene/app** directory

## Technologies behind the Application part 

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

## File structure

The RNAniseed project has been started using the create-react-app package which allow a 
great flexibility for the code base. However a solid file strucutre is required to ensure 
scalability of the project as well as making create new features easy.

The main code of the app is the **/src** folder

1. **/api** : contains the endpoints used to communicate with the RNAniseed API. All the 
              endpoints are located there making the deployment to live server easier by 
              simply changing the **LOCAL_API** variable to the **PROD_API** before building
              the App using the React routines

2. **/components** : contains some components that can be reused at multiple parts of the 
                     project. A component in this folder should not be modified often. 
                     Creating and updating a component within this folder impacts many 
                     pages and specific components in the entire app so there is many 
                     rules to follow to prevent bugs and exceptions

3. **/pages** : contains components that represent an entire page. A page component can 
                can be composed of multiple layers containing specific logic but the 
                page component is here to bundle the layers logic into a single component.
                Every page have a specific URL except for very close pages that can't share
                the same URL. But in general : 1 URL = 1 page.
