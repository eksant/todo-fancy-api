const FB = require('fb')

module.exports = (req, res, next) => {
  FB.setAccessToken(req.headers.fbtoken)
  FB.api('/me', {
    fields: ['name', 'email', 'picture', 'public_profile']
  }, 'GET', function(response) {
    if (!response)
  })
}