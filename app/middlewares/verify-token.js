'use strict'
const {auth} = require('../myutil')
const {errorMsg} = require('../config')

module.exports = (req, res, next) => {
  const headers = req.headers
  if (!headers.token) {
    res.sendOk({
      errorMsg: 'TOKEN_IS_MISSING'
    })
    return
  }
  try {
    const result = auth.verifyToken(headers.token)
    next()
  } catch (error) {
    if (error.message === "invalid token") {
      res.sendOk({
        errorMsg: 'TOKEN_IS_INVALID'
      })
      return
    } else if (error.message === "jwt expired") {
      res.sendOk({
        errorMsg: 'TOKEN_HAS_EXPIRED'
      })
      return
    }
    
  }
}