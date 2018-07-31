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
        error: err
      });
    } else {
      const user = {
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
        [user.email, user.username, user.password]
      )
        .then(() => {
          res.status(201).json({
            message: "Signup successful"
          });
        })
        .catch(() => {
          res.json({
            status: "error",
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
              expiresIn: "1h"
            }
          );
          res.status(200).json({
            message: "Login successful",
            token
          });
        }
      });
    })
    .catch(() => {
      res.status(400).json({
        message: "Wrong email or password"
      });
    });
}

export default {
  signup,
  signin
};
