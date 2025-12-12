import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  express.json({
    strict: true,
  })
);
// Global logging middleware
app.use((req, res, next) => {
  let logData = "[no body, params, or query]";

  if (req.body && Object.keys(req.body).length > 0) {
    logData = req.body;
  } else if (req.params && Object.keys(req.params).length > 0) {
    logData = req.params;
  } else if (req.query && Object.keys(req.query).length > 0) {
    logData = req.query;
  }

  console.log(
    "\nThis is the request you made:\n" + JSON.stringify(logData) + "\n"
  );
  next();
});

// Serve embedded HTML at /
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Week 2 API</title>
      </head>
      <body>
        <h1>Welcome to My Week 2 API!</h1>
        <p>This is a raw HTML page served directly.</p>
      </body>
    </html>
  `);
});

// POST /user with validation
app.post("/user", (req, res, next) => {
  const { name, email } = req?.body;
  if (!name || !email) {
    const err = new Error("Name and email are required");
    err.status = 400;
    return next(err);
  }
  res.send("Hello " + name);
});

// GET /user/:id with route-specific param logging
app.get("/user/:id", (req, res) => {
  const { id } = req?.params;
  console.log(
    "\nThis is the request you made:\n" + JSON.stringify(req?.params) + "\n"
  );
  res.send("User " + id + " profile");
});

// Error-handling middleware (catch all errors, always return JSON)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON" });
  }
  next(err); // pass to your regular error handler
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
});

// Start server
app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
