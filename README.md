# buycoins-frontend-application

This simple website is a copy of my repositories page, its for the Buycoins Frontend Engineer application. 

## Setup
It makes use of the Github GraphQl api which requires an access token for authentication.
The access token has been removed on this [line](https://github.com/nonseodion/buycoins-frontend-application/blob/e14611ccdea5275c6793fc8cf84428a6df3e6714/graphQlQuery.js#L4) since github prevents uploading personal access tokens for security.
You can't view my repositories page. But you can view yours by:
1. Cloning this repo.
2. Get a Personal Access Token from github which has access to your repository and user data.
3. Assign your Personal Access Token to the `token` variable and replace the user object login argument with your username in `graphQlQuery.js` file.
4. Open the `index.html` file in your browser.

You can view a live version of the website with my repositories page [here](https://buycoins-frontend-application.netlify.app/) on Netlify.
