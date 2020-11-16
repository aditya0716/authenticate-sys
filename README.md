# Authenticate System
## About The Application :
Authenticate System is a  library for starter code that can be implemented in your projects to design the SignIn/Signup feature. <br>
Internally Passport.js Library is used to implement multiple strategy which is secure and reliable . <br>
## Tech Stack : Express , MongoDB , Passport ,HTML<ejs layout>,CSS<Sass>,Vanilla Javascript<br> 
## Directory Structure:
  **Assets** : Contains the static files for better user experience (CSS,JS,Img)<br>
  **Config** : Contains Configuration for database,custom middleware,Passport Google Strategy,Passport Local Strategy<br>
  **------>** : middleware , mongoose , passportGoogle-oauth , passportLocalStrategy <br>
  **Controllers** : Contains the controllers which further contains the action via different routes <br>
  **------>** : resetController,userController<br>
  **Models** : Contains the layout Schema for our database<br>
  **------>** : userModel<br>
  **Routes** : Containes the routes for different Controllers<br>
  **------>** : forgot,index,reset,signin,signup **Entey Point** :index<br>
  **Views** : Contains the ejs layouts <br>
  **------>** : _footer,__header,forgotPassword,home,layout,reset,user_signin,user_signup,verifykey<br>
### Entry Point for the project : index.js <br>
## How to run in the local system :<br>
  **Install All the dependecies mentioned in the package.json**<br>
  **Go to Controllers** --> **resetController.js and make changes in line 11 and 12** i.e. set up your email and password  <br>
  **npm start**<br>
### By default the express server will fire up at port 8000
  
