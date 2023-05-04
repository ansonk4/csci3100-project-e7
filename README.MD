# csci3100-project-e7

## Instuction

You should have nodejs and npm installed, you can install them from https://nodejs.org/en. Any latest version should work fine.
```
# My envirnoment
- node -v
v18.12.1
- npm -v
8.19.2
```

1. Clone this repo
```
git clone https://github.com/ansonk4/csci3100-project-e7
```
2. Go to the folder
```
cd csci3100-project-e7
```
3. Open two termial, one for the server and one for the client

<br />

## Server side
1. go to the backend folder
  ```
  cd backend
  ```

2. build npm dependency 
  ```
  npm install
  # ignore all the warning
  # if you receieve error, try the following cmd
  npm install -force
  ```

3. install nodemon
  ```
  npm i -g nodemon
  ```

4. start server
  ```
  npx nodemon index.js
  ```
if successful, you should see ``` Server Port: 3001```

<br />

## Client side
1. go to the frontend folder
  ```
  cd frontend
  ```

2. install npm dependency 
  ```
  npm install
  # ignore all the warning
  # if you receieve error, try the following cmd
  npm install -force
  ```

3. start client
  ```
  npm run start
  ```
If successful, you should the website pop up
