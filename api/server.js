// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')

const server = express()


server.use(express.json())

// Endpoints

// create new user
server.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    } else {
        Users.insert(req.body)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the user to the database"
            })
        })
    }
})

// get all users
server.get(`/api/users`, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: "The users information could not be retrieved"
            })
        })
})

// get user by id
server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The user information could not be retrieved"
            })
        })
})

// delete user by id
server.delete('/api/users/:id', (req, res) => {

})

// update user by id
server.put('/api/users/:id', (req, res) => {

})


module.exports = server; // EXPORT YOUR SERVER instead of {}
