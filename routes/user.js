import { Router } from 'express';

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import { db } from '../database/connect';

require('dotenv').config();

const router = Router();

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({
      message: 'Provide email and password'
    });
  }
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
      // CREATE USER
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
          res.status(200).json({
            message: 'Auth successful'
          });
        })
        .catch(e => {
          res.json(e);
        });
    }
  });
});

router.post('/signin', (req, res) => {

  db.one('SELECT * FROM users WHERE email = $1', [req.body.email])
    .then(user => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(400).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user.id
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h'
            }
          );
          res.status(200).json({
            message: 'Auth successful',
            token
          });
        }
      });
    })
    .catch(e => {
      res.json(e);
    });
});

export default router;
