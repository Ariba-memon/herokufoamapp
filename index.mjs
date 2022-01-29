import express from 'express';

import morgan from "morgan";

import cors from "cors";

const app = express();

const port = process.env.PORT || 5000;

let users = [];

app.use(express.json());

app.use(cors());

app.use(morgan("short"));

app.use((req, res, next) => {
  console.log("Request Came", req.body);
  next();
});

app.use((req, res, next) => {
  console.log("Request Came");
  next();
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/user/:id", (req, res) => {
  if (users[req.params.id]) {
    res.send(users[req.params.id]);
  } else {
    res.send("User Not Found");
  }
});

app.post("/user", (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.address) {
    res.status(400).send("Invalid Data");
  } else {
    users.push({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    });

    res.send("users Created");
  }
});

app.get("/", (req, res) => {
  res.send("Hi I am a Ariba Memon ");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})