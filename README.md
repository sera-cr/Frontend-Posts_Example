# FrontendExample-Post That!
## **About the project**
This is and example of a frontend project and uses the API: [APIResCRUD-Post_That!](https://github.com/sera-cr/APIResCRUDTest-PostsExample) about users and posts. This project uses React, NextJS 13 and Bootstrap.

This web app will simulate a very tiny social media about posts and users (similar to Twitter). It was designed to be highly scalable in the future and developer friendly.

## **Table of Contents**
- [FrontendExample-Post That!](#frontendexample-post-that)
  - [**About the project**](#about-the-project)
  - [**Table of Contents**](#table-of-contents)
  - [**Tecnologies used**](#tecnologies-used)
  - [**Version**](#version)
  - [**Project status**](#project-status)
  - [**Setup**](#setup)
    - [Environment variables](#environment-variables)
    - [Install project](#install-project)
    - [Run the project](#run-the-project)
  - [**Docker deployment**](#docker-deployment)
  - [**License**](#license)
  - [**Contact**](#contact)
## **Tecnologies used**
At this moment, this project uses the following technology:
* Reduxjs: 1.9.5,
* Node: 20.4.5,
* React: 18.2.17,
* React-dom: 18.2.7,
* Bootstrap: 5.3.1,
* Bootstrap-icons: 1.10.5,
* Eslint: 8.46.0,
* Eslint-config-next: 13.4.12,
* Formik: 2.4.2,
* Next: 13.4.12,
* Next-redux-wrapper: 8.1.0,
* React: 18.2.0,
* React-bootstrap: 2.8.0,
* React-dom: 18.2.0,
* React-redux: 8.1.,
* React-toastify: 9.1.3,
* Sass: 1.64.1,
* Typescript: 5.1.6

It can be also seen in `package.json`.
## **Version**
At this moment, this web app is at version 1.0.0 . Which it is the first "minimal" and "stable" version of the app.
Can be modified for fixing bugs.
## **Project status**
This project serves as a skeleton and example for creating web apps with queries to an API restful. It will remain under the same operation, except for corrections.
This is due to my short time currently, but in the future it will continue with its development.
## **Setup**
### Environment variables
You can use directly the file `env.local` which can be used if you have the API restful deployed in the same machine as this project.
You can change it if you have the API in another machine. Change the variable `NEXT_PUBLIC_API_PATH` and add the path of the API.
This project supposes that you will use the .env.local. Anyway, you can still use a simple .env file. Just add the same variables. The code will retrieve them with `process.env.{variable}`.
### Install project
1. Clone/Download this repository
2. Execute command `npm install` in the main folder.
### Run the project
You have multiple options.
* You can use `npm run dev` for starting the development server.
* Compile the project with `npm run build` and then `npm run start`.
## **Docker deployment**
Having installed Docker in the machine which will contain the container:
1. Run `docker compose build` for building the image
2. Run `docker compose up` for starting the containter

**IMPORTANT NOTE**: The configuration that is uploaded in this repository is ready to launch the container from a local machine. In the file `docker-compose.yml` we are indicating that `network_mode` is `"host"`. It means that the container will use the same networking as the host, in order to share the localhost.
## **License**
Distributed under the GPL-3.0 License. See `LICENSE.txt` for more information.
## **Contact**
Sera - serafincortesramirez@gmail.com 

Project link: https://github.com/sera-cr/Frontend-Posts_Example
