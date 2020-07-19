<!-- @format -->

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and heavily customized by [Doomd](https://github.com/Doomd)

## Visit [WeQuoteNevada.com](https://wequotenevada.com) to see the results!

## To Clone this Repo and make a new Website based on this template:
1. Navigate to a local folder on your computer, open a terminal window and use the following command:
    ```
    git clone https://github.com/Doomd/WQN_Source2.git NameOfNewWebsiteFolder
    ```
 2. To download and initiate all the node_module dependancies for this React project, from the new project root folder you just cloned into, issue this command:
    ```
    yarn
    ```
3. To see your project files in action in a browser, issue this command:
    ```
    yarn start
    ```
    Obviously, this is a copy of an existing website. Since you're making a copy, you'll likely want to change a few of the config files and text within the source files (like the domain names and the name of the website etc). Here are some of the files you'll need/want to change:
    - in `package.json` change:
        ```
        "name": "we-quote-nevada",
	    "homepage": "https://wequotenevada.com",
        ```
        to:
        ```
        "name": "new-website-name",
	    "homepage": "https://newwebsitename.com",
        ```
    - in `public/index.html` change:
        ```
        <meta name="We Quote Nevada" content="Quick and Easy Insurance" />
        ```
        to:
        ```
        <meta name="New Website Name" content="Quick and Easy Insurance" />
        ```
        and change:
        ```
        <title>We Quote Nevada</title>
        ```
        to:
        ```
        <title>New Website Title</title>
        ```

## Custom Deployments for a NEW Cloned Site.
Before you create a NEW (different) site, you'll need/want to change a few of the configurations inside the cloned files (as in step 3 above)...and of course, you'll need to setup a NEW repo for hosting your site.

- First create a new EMPTY repo on Github. Don't innitiate it with a Readme.md file. To be continued...

- To create a publishable version of your site that you can host on static web hosts (like github pages) for free, issue this command:
    ```
    yarn build
    ```
    This will create a folder in your root directory called `build` and this folder will become the source folder/files for your public facing files that get uploaded for deployment to a web server. This command doesn't yet deploy those files...it only creates the files. You can preview the result by issuing these commands:
    ```
    yarn global add serve
    serve -s build
    ```
- To DEPLOY the website to your github pages server, you'll have to perform several setup steps first...(to be continued)