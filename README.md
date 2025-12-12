# Week 2 API

A simple Express API demonstrating request logging, route validation, and robust JSON-only error handling.

## Features

1. **Global Request Logging**

   - Logs request body, query parameters, or route parameters for all incoming requests.
   - Helps track what clients are sending to the API.

2. **Routes**

   - `GET /` → Returns a basic HTML welcome page.
   - `POST /user` → Accepts `name` and `email` in the request body.
     - Returns `Hello <name>` on success.
     - Returns a **JSON error** if `name` or `email` is missing.
   - `GET /user/:id` → Returns a message with the requested user ID.

3. **Error Handling**

   - **JSON-only responses** for all errors.
   - Invalid JSON in the request body is caught and returns:
     ```json
     { "message": "Invalid JSON" }
     ```
   - Route validation errors (e.g., missing fields) return JSON with the error message:
     ```json
     { "message": "Name and email are required" }
     ```
   - All other errors return JSON with status `500`:
     ```json
     { "message": "Internal Server Error" }
     ```

4. **Middleware Order**
   - `express.json()` → parses JSON requests.
   - Syntax error handler → catches JSON parse errors.
   - Logging middleware → prints request details.
   - Routes → define application logic.
   - Global error handler → catches all other errors in JSON.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set environment variables:
   ```
   PORT=3000
   ```
3. Start the server:
   ```
   npm run dev
   ```
4. Test the endpoints:
   - `GET /`: visit in the browser
   - `POST /user`: send JSON body `{ "name": "Isaiah", "email": "isaiah@example.com" }`.
   - `GET /user/:id`: return `User [id] profile`
