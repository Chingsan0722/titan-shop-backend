const passport = require('../config/passport')

module.exports = {
  authenticated: (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) return res.status(401).json({ message: 'Unauthorized' })
      req.user = user
      if (req.user.role === 'admin') return res.status(403).json("Permission denied, admin can't use this")
      next()
    })(req, res, next)
  },
  authenticatedAdmin: (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) return res.status(401).json({ message: 'Unauthorized' })
      req.user = user
      if (req.user.role === 'user') return res.status(403).json("Permission denied, user can't use this")
      next()
    })(req, res, next)
  }
}
