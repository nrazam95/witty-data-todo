# WELCOME TO WITTY DATA TODO - PROJECT MANAGEMENT
### This app is built with Node.js, KoaJs, React, Redux, PostgreSQL, Docker, Docker Compose, Ant Design, and more.

|  |  |
|--|--|
| **Frontend** | [React](https://reactjs.org/) |
| **Backend** | [KoaJs](https://koajs.com/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **UI Framework** | [Ant Design](https://ant.design/) |

## FEATURES
- [x] Create a todo
- [x] Update a todo
- [x] Delete a todo
- [x] Share a todo
- [x] Make a todo public
- [x] Upload profile picture
- [x] Update profile picture
- [x] Change password

## TODO 
<!-- pictures from demo profile -->
<img src="https://raw.githubusercontent.com/nrazam95/witty-data-todo/master/demo/demo1.png" width="100%" height="auto" />
<img src="https://raw.githubusercontent.com/nrazam95/witty-data-todo/master/demo/demo2.png" width="100%" height="auto" />
<img src="https://raw.githubusercontent.com/nrazam95/witty-data-todo/master/demo/demo3.png" width="100%" height="auto" />


## RUN THE APP WITH DOCKER

### 1. Install Docker Compose
```bash
https://docs.docker.com/compose/install/
```
***Make sure you have Docker Compose installed***
### 2. Clone the repository
```bash
git clone $REPO_URL
```

### 3. Build the image
```bash
sh run-docker.sh
```

### 4. App is running on http://localhost:8080 (Frontend) and http://localhost:3000 (Backend)


## RUN THE APP WITH NODE

### 1. Install Node.js

### 2. Clone the repository
```bash
git clone $REPO_URL
```

### 3. Run the SH file to process the environment variables
```bash
sh run-local.sh
```

### 4. Set your database;
***Make sure you have a database running on port 5432*** <br/>
***Make a database called "witty_data_todo"*** <br/>
***Make sure you have a user called "postgres" with password "postgres"*** <br/>
***Perform migrations***
```bash
cd backend
npm run migrate:up
```

### 5. Run the app (Backend)
```bash
cd backend
nvm use 18
npm install
npm run watch
```


### 6. Run the app (Frontend)
```bash
cd frontend
nvm use 18
npm install
npm run start
```

### 6. App is running on http://localhost:3000 (Frontend) and http://localhost:4000 (Backend)
