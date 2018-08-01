import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { db } from "../models/connect";
import validator from "../helpers/validation/validate";

require("dotenv").config();

function signup(req, res) {
  const { error } = validator.validateUser(req.body);
  if (error) res.status(400).json({ message: error.details[0].message });
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
                    userId: user.id
                  },
                  process.env.JWT_KEY,
                  {
                    expiresIn: "8h"
                  }
                );
                res.status(200).json({
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
  const { error } = validator.validateUser(req.body);
  if (error) res.status(400).json({ message: error.details[0].message });
  db.one("SELECT * FROM users WHERE email = $1", [req.body.email])
    .then(user => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          res.status(400).json({
            status: "fail",
            message: "Wrong email or password"
          });
        } else if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user.id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "8h"
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
        status: "success",
        message: "Wrong email or password"
      });
    });
}

export default {
  signup,
  signin
};
