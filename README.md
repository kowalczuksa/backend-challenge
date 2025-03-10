# Backend Challenge - User API

. Short introduction = This project is a REST API for user management, which allows to register, authenticate, update and delete users using Node.js, Express and Sequelize with PostgreSQL. In addition, it has authentication through JWT.

. Technology Stack = - Node.js - JavaScript execution environment.

                       - Express - Framework to build the API.

                       - Sequelize - ORM to manage the PostgreSQL database.

                       - PostgreSQL - Relational database used.

                       - Docker - To run the database locally.

                       - JWT (JSON Web Token) - For secure authentication.

                       - bcryptjs - For password encryption.

. Pre-requisites = To execute the project locally you need: - Node.js (version 18 or higher)

                                                             - PostgreSQL (Docker is recommended)

                                                             - DBeaver (optional, to visualize the database)

                                                             - Postman (to test the API)

                                                             - Docker (optional, to lift the DB without installing PostgreSQL manually)

. Installation and Configuration =

                                    1. Clone the repository : git clone <REPOSITORY_URL>
                                    2. Install dependencies : npm install
                                    3. Set environment variables : Create an .env file in the root of the project with the following content: 
                                                        DB_NAME=backend_challenge
                                                       DB_USER=admin
                                                       DB_PASSWORD=admin
                                                       DB_HOST=localhost
                                                       DB_PORT=5432
                                                       SECRET_KEY=supersecretkey
                                                       PORT=5001
                                    4. Docker database build (optional): " docker run --name postgres-temp -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=backend_challenge -p 5432:5432 -d postgres ".
                                    5. Execute the API: npm start (The API will be running at http://localhost:5001)

. API Usage = 1. User registration : POST /auth/register

                                    {
                                      "name": "Sol Kowalczuk",
                                      "email": "sol@example.com",
                                      "password": "123456"
                                    }

                .  Expected response: {
                                        "message": "User successfully created",
                                        "user": {
                                          "id": "451f6632-d95c-4a0d-b3f8-53b262933db0",
                                          "name": "Sol Kowalczuk",
                                          "email": "sol@example.com"
                                        }
                                      }

              2. Login and obtain token : POST /auth/login
                                          {
                                            "email": "sol@example.com",
                                            "password": "123456"
                                          }
              . Expected response: {
                                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                   }

              3. Get user profile (requires token) : GET /auth/profile (Include the token in the headers)
                                                     Authorization: Bearer <TOKEN>
              . Expected response: {
                                    "message": "You accessed the profile",
                                    "user": {
                                      "id": "451f6632-d95c-4a0d-b3f8-53b262933db0",
                                      "name": "Sol Kowalczuk",
                                      "email": "sol@example.com"
                                    }
                                  }

              4️. Update user (requires token) : PUT /auth/users/:id
                                                {
                                                  "name": "New Name",
                                                  "email": "nuevo@email.com"
                                                }

              . Expected response:
                                  {
                                    "message": "User updated correctly",
                                    "user": {
                                      "id": "451f6632-d95c-4a0d-b3f8-53b262933db0",
                                      "name": "New Name",
                                      "email": "new@email.com"
                                    }
                                  }

                5. Delete user (requires token) : DELETE /auth/users/:id

                . Expected response:
                {
                  "message": "User successfully deleted"
                }


. Authentication with JWT

  All protected endpoints require the JWT token to be sent in the request headers:

  Authorization: Bearer <TOKEN>

  If the token is invalid or not sent, the API will respond with:
                                                                  {
                                                                  "error": "Access denied"
                                                                  }

. Final Considerations: 

   A. Express-validator was used to validate the input data.

   B.  Implemented error handling on all paths.

   C. bcryptjs was used to encrypt passwords.

   D. Authentication is handled with JWT for security.

   F. API was tested with Postman and works correctly.
