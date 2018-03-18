const Users = require('../models/users')
const jwt   = require('jsonwebtoken')
const FB    = require('fb')

module.exports = {
  loginFacebook: (req, res) => {
    FB.setAccessToken(req.headers.fbtoken)
    FB.api('/me', { fields: 'name, email, picture' })
    .then(data => {
      let dataUser = {
        name    : data.name,
        email   : data.email,
        picture : data.picture.data.url
      }
      // delete dataUser.picture
      // console.log('datUser', dataUser)
      Users.findOne({
        name    : data.name,
        email   : data.email
      })
      .then(user => {
        if (user) {
          jwt.sign({ user }, process.env.JWT_KEY, (err, token) => {
            console.log(user)
            res.status(200).json({
              message     : `logged in ${user.name}`,              
              name        : user.name, 
              email       : user.email,
              profileUrl  : user.picture,
              apptoken    : token,
            })
          })
        } else {
          Users.create({
            name    : data.name,
            email   : data.email,
            picture : data.picture.data.url
          })
          .then(userCreated => {
            let user = userCreated
            jwt.sign({ user }, process.env.JWT_KEY, (err, token) => {
              console.log(user)
              res.status(200).json({                
                message     : `new user ${user.name}`,
                name        : user.name, 
                email       : user.email,
                profileUrl  : user.picture,
                apptoken    : token,
              })
            })
          })
        }
      })
      .catch(err => {
        res.status(400).json({ message: 'Error to find or creating ', err })
      })
    })
  }
}