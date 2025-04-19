# csci3100-project-e7

A simple social media web application inspired by Twitter that allows users to register, log in, post tweets (text, images, and videos), like/dislike posts, retweet, and comment. It also includes an admin mode for user management.

## Project Structure

- **backend**: Express server with MongoDB database using Mongoose. It handles authentication, user management, and post operations.
- **frontend**: React application using Redux for state management and Material-UI for styling. It includes features such as tweet posting, retweeting, commenting, and a responsive design for both desktop and mobile.

## Prerequisites

- [Node.js](https://nodejs.org/en) (v18.12.1 or later recommended)
- [npm](https://www.npmjs.com/) (v8.19.2 or later recommended)
- MongoDB (local or cloud instance)

## Installation

### Clone the Repository

```bash
git clone https://github.com/ansonk4/csci3100-project-e7
```

Then, change directory into the project:

```bash
cd csci3100-project-e7
```

### Setup the Backend

1. Navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Install the npm dependencies:

    ```bash
    npm install
    # If you encounter warnings or errors, try:
    npm install --force
    ```

3. Install nodemon globally (if not installed already):

    ```bash
    npm install -g nodemon
    ```

4. Create a `.env` file in the backend folder (if not provided) with at least the following content:

    ```env
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=3001
    ```

5. Start the server:

    ```bash
    npx nodemon index.js
    ```

   You should see a message like: `Server Port: 3001`

### Setup the Frontend

1. Open a new terminal window and navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install the npm dependencies:

    ```bash
    npm install
    # If you encounter warnings or errors, try:
    npm install --force
    ```

3. Start the React client:

    ```bash
    npm run start
    ```

   The website should open in your browser.

## Environment Variables

Make sure to configure the necessary environment variables in the backend `.env` file:

- `MONGO_URL`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT token generation.
- `PORT` (optional): Server port (default is 3001).

## Usage

- **Register / Login**: Users can register with their details and login. The login form supports both regular and admin login.
- **Tweet Management**: Users can post tweets with optional image/video attachments, like/dislike posts, retweet, and comment.
- **Social Features**: Follow/unfollow friends, view friend lists, and see tweet recommendations.
- **Admin Mode**: Admins can search and manage users.

## Technologies Used

- **Frontend**: React, Redux, Material-UI, Formik, Yup, React Dropzone.
- **Backend**: Express, MongoDB, Mongoose, JWT, bcrypt.

## Running the Project

Open two terminal windows:
1. One for running the backend server.
2. One for running the frontend client.

Follow the installation and startup instructions provided above.


## License

This project is open source. See the [LICENSE](LICENSE) file for more details.