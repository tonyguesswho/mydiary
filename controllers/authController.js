import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { db } from "../models/connect";

require("dotenv").config();

function signup(req, res) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        status: "fail",
        error: "Internal server error"
      });
    } else {
      const userData = {
        email: req.body.email,
        username: req.body.username,
        password: hash
      };
      db.one(
        `
                INSERT INTO
                users (email, username,password)
                VALUES
                ($1, $2,$3)
                RETURNING
                  *
              `,
        [userData.email, userData.username, userData.password]
      )
        .then(user => {
          bcrypt.compare(
            req.body.password,
            userData.password,
            (err, result) => {
              if (err) {
                res.status(400).json({
                  status: "fail",
                  message: "Signup unsuccesful"
                });
              } else if (result) {
                const token = jwt.sign(
                  {
                    email: user.email,
                    userId: user.id,
                    username: user.username
                  },
                  process.env.JWT_KEY,
                  {
                    expiresIn: "8h"
                  }
                );
                res.status(201).json({
                  status: "success",
                  message: "Signup successful",
                  token
                });
              }
            }
          );
        })
        .catch(() => {
          res.json({
            status: "fail",
            message: "Sign up unsuccessful"
          });
        });
    }
  });
}

function signin(req, res) {
  db.one("SELECT * FROM users WHERE email = $1", [req.body.email])
    .then(user => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          res.status(500).json({
            status: "fail",
            message: "Internal server error"
          });
        } else if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user.id,
              username: user.username
            },
            process.env.JWT_KEY,
            {
              expiresIn: "24h"
            }
          );
          res.status(200).json({
            status: "success",
            message: "Login successful",
            token
          });
        }
      });
    })
    .catch(() => {
      res.status(400).json({
        status: "error",
        message: "Wrong email or password"
      });
    });
}

export default {
  signup,
  signin
};
