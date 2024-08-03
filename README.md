# Talent App

## Get Start

This project is a demo project to learn ReactJs, C# Web Api, MongoDb in Talent Code Architecture.
This project has been deployed on Azure with the frontend demo URL: https://talentwebapp0129.azurewebsites.net/


### Install react, babel, webpack, js tokens and react tags:
* Find the folder that contains webpack.config.js in the solution explorer
* Right click on the folder and select 'Open Folder in File Explorer'
* Open command prompt (windows + R, type cmd) and go to the folder that contains webpack.config.js (E.g: cd C:\Talent\Talent\Talent.WebApp\Scripts\react)
Install npm util packages:
`npm install`
* Check webpack version (make sure it's 4.5.0):
`webpack -version`

### Launch Talent project
* Get the latest source via Source Control Explorer
* Run webpack:
`cd C:\Talent\Talent\App\Talent.App.WebApp\wwwroot\js\react`
`npm run build`
* Launch Talent.WebApp project in Visual Studio. Register an account using your email address and log in.

### Project Structure  
 - Web Application:
    - `Talent.WebApp` : All frontend files are located here
 - Microservices:
    - `Talent.Services.Identity` : backend functions related to Login/Logout
    - `Talent.Services.Profile` : backend functions related to Profile
    - `Talent.Services.Talent` : backend functions related to Talent Matching, Jobs

## Project Functions

* 1: Employer profile page
  * Add last name to the primary contact details
  * Allow users to edit company contact details by clicking on the edit button
  * Display the user's full name on primary contact details (for read only display)

* 2 : Manage Job page
  * Display jobs as a list of cards
  * Close a job while click Expire Button


