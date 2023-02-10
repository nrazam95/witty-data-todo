# WELCOME TO WITTY DATA TODO - PROJECT MANAGEMENT

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

### 4. Run the app (Backend)
```bash
cd backend
nvm use 18
npm install
npm run watch
```

### 5. Run the app (Frontend)
```bash
cd frontend
nvm use 18
npm install
npm run start
```

### 6. App is running on http://localhost:3000 (Frontend) and http://localhost:4000 (Backend)
