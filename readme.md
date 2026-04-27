# Hospital Management System API

Its a simple hospital management system API built with Node.js, Express, MongoDB and ReactJs. It provides endpoints for user authentication, appointment management.

avaiable endpoints:

```
/login
/register
/me
/users


/appointments
/appointments/:id
/availability
```

## To run the project:

1. Clone the repository
2. Create a `.env` file in the root directory and add the following environment variables:

```
MONGODB_URI=mongodb://localhost:27017/hospital
JWT_SECRET=your_jwt_secret
```

3. Install dependencies: `npm install`
4. Start the server: `npm run server`
5. The server will be running on `http://localhost:3000`
6. client side is in the `frontend` folder, go there and install dependencies: `npm install` and then You can run it with`npm run dev` after installing dependencies.
