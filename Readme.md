# E-Commerce Project README

## Overview

This README provides an overview of your E-Commerce project, which consists of two main components: the client and server. The client is responsible for the user interface and interacts with the server to provide a seamless shopping experience. The server handles authentication, data storage, and API endpoints.

## Client

### Project Description

The client-side of the E-Commerce project is a web-based application that allows users to browse, filter, wishlist, add items to their cart, and complete the checkout process. It also incorporates user authentication to provide a personalized shopping experience.

### Technologies Used

The client-side of the project was developed using the following technologies:

- **React:** The project's frontend is built using the React JavaScript library for creating user interfaces.

- **Redux Toolkit:** Redux Toolkit is used for state management, making it easier to manage application-wide data and states.

- **RTK Query:** RTK Query is used for handling data fetching and caching, simplifying the process of making API requests.

- **Chakra UI:** Chakra UI is utilized for creating a responsive and accessible user interface with a set of pre-designed components.

- **React Icons:** This library provides a collection of popular icons for use within the application.

- **React Hook Forms:** It is used for building and managing forms in a React application efficiently.

- **Type Script:** The project's frontend is built on TypeScript.

### Getting Started (Client)

To set up and run the client-side of the project locally, follow the instructions provided in the main README file.

## Server

### Project Description

The server-side of the E-Commerce project is responsible for user authentication, data storage, and handling API requests from the client. It uses Express as the web framework, JWT for authentication, Bcrypt for password hashing, and MongoDB as the database. Additionally, seeders are used to populate the database with initial data.

### Technologies Used

The server-side of the project was developed using the following technologies:

- **Express:** Express.js is used as the web framework to handle API routes and middleware.

- **JWT (JSON Web Tokens):** JWT is used for user authentication, allowing secure access to protected routes.

- **Bcrypt:** Bcrypt is used for password hashing, ensuring the security of user passwords.

- **Mongoose:** Mongoose is an ODM (Object-Document Mapper) for MongoDB, making it easier to work with MongoDB in Node.js.

- **MongoDB:** MongoDB is the chosen database for storing product data, user information, and more.

- **Seeders:** Seeders are used to populate the database with initial data, such as sample products and user accounts.

### Getting Started (Server)

To set up and run the server-side of the project locally, follow these steps:

1. **Navigate to the Server Directory:** Change your working directory to the server folder.

   ```shell
   cd server
   ```

2. **Install Server Dependencies:** Install server-specific dependencies using npm or yarn.

   ```shell
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables:** Create a `.env` file in the server directory and configure environment variables such as database connection information and JWT secrets.

   ```shell
   # Example .env file
   PORT=3001
   DB_URI=mongodb://localhost:27017/ecommerce
   SECRET_KEY=mysecretkey
   ```

4. **Seed the Database:** Use seeders to populate the database with initial data.

   ```shell
   npm run seed
   # or
   yarn seed
   ```

5. **Start the Server:** Run the server.

   ```shell
   npm start
   # or
   yarn start
   ```

The server should now be running on the specified port (default is 3001) and ready to handle API requests from the client.

## Usage

Refer to the client-side usage instructions provided in the main README file for details on how to use the application.

## Contributors

List the contributors to the project and provide contact information if necessary.

- [Deva Raju](https://github.com/yourusername) - GitHub: @devaraj764, Email: deva170725@gmail.com

## License

Specify the project's license and include any license files if necessary.

## Acknowledgments

Any acknowledgments or credits for third-party libraries, resources, or inspiration can be mentioned here.

## Contact

If you have any questions or issues related to the server-side of the project, feel free to contact us:

- Email: deva170725@gmail.com
- GitHub Issues: [Server Issues](https://github.com/yourusername/ecommerce-project/server/issues)

Thank you for using our E-Commerce project! We hope you have a great shopping experience.