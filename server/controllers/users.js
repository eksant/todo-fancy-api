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
      delete dataUser.picture
      // console.log('datUser', dataUser)
      Users.findOne(dataUser)
      .then(userResult => {
        if (userResult) {
          jwt.sign({ id: userResult._id, name: userResult.name, email: userResult.email }, process.env.JWT_KEY, (err, token) => {
            res.status(200).json({
              message     : `logged in ${userResult.name}`,
              apptoken    : token,
              name        : userResult.name, 
              email       : userResult.email,
              profileUrl  : userResult.picture
            })
          })
        } else {
          Users.create(dataUser)
          .then(userCreated => {
            jwt.sign({ id: userCreated._id, name: userCreated.name, email: userCreated.email }, process.env.JWT_KEY, (err, token) => {
              res.status(200).json({               
                apptoken  : token,
                message   : `new user ${userCreated.name}`
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