# mydiary

![Travis CI Build Status](https://travis-ci.com/tonyguesswho/mydiary.svg?branch=server) [![Coverage Status](https://coveralls.io/repos/github/tonyguesswho/mydiary/badge.png?branch=server&service=github)](https://coveralls.io/github/tonyguesswho/mydiary?branch=server) [![Maintainability](https://api.codeclimate.com/v1/badges/15eacf08440f2ac951d6/maintainability)](https://codeclimate.com/github/tonyguesswho/mydiary/maintainability)



An Diary API that enables users to document their thoughts, ideas and expereiences

Getting Started

Clone the repository
Using SSH; copy and paste the following below on your terminal git@github.com:tonyguesswho/mydiary.git
Using HTTPS; copy and paste the following below on your terminal
https://github.com/tonyguesswho/mydiary.git

use the command "cd mydiary" to move into the application folder

run npm install to install the application dependencies

Using the API

API Documentation


POST /api/v1/entries
INPUT:title & description
POST HTTP Response
HTTP Status: 201: created
{ 
  "status": "success",
  "data": {
    "id": 1,
    "title": "",
    "description": "",
    "created_at": "",
    "users_id": 
  },
  "message": ""
}
GET HTTP Response
header: Authorization', 'token'
GET /api/v1/entries
HTTP Status: 200: OK
[
  { 
    "status": "success",
    "data": {
      "id": 1,
      "title": "",
      "body": "",
      "created_at": "",
      "users_id": 1
    },
    "message": ""
  }
]
GET HTTP Response
header: Authorization', 'token'
GET /api/v1/entries/:id
HTTP Status: 200: OK
{ 
  "status": "success",
  "data": {
    "id": 1,
    "title": "",
    "description": "",
    "created_at": "",
    "users_id": 1
  },
  "message": ""
}
DELETE HTTP Response
header: Authorization', 'token'
DELETE /api/v1/entries/:id
HTTP Status: 200: OK
{ 
  "status": "success",
  "message": ""
}
PUT HTTP Request
PUT /api/v1/entries/:id
INPUT:title & description
PUT HTTP Response
HTTP Status: 200: OK
JSON data
{ 
  "status": "success",
  "data": {
    "id": 1,
    "title": "",
    "body": "",
    "created_at": "",
    "users_id": 1
  },
  "message": ""
}

Author
Anthony Ugwu

License
This project is licensed under the MIT License 
