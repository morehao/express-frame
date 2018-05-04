'use strict'
const lodash = require('lodash')

const configs = require('../config')
module.exports = (req,res,next) => {
  const extendAttr = {
    sendOk: (option) => {
      let rst = {}
      if (option.errMsg) {
        rst = {
          status: 200,
          errorCode: configs.errorCode[option.errMsg].errorCode,
          errorMsg: configs.errorCode[option.errMsg].errorMsg
        }
      } else if (option.successMsg) {
        rst = {
          status: 200,
          errorCode: 0,
          successMsg: configs.successMsg[option.successMsg]
        }
      } else {
        rst = {
          status: 200,
          errorCode: 0,
          data: option
        }
      }
      return res.json(lodash.extend(rst))
    },
    sendErr: (option) => {
      const rst = {
        status: 200,
        errorCode: configs.errorCode[option].errorCode,
        errorMsg: configs.errorCode[option].errorMsg
      }
      return res.json(lodash.extend(rst))
    }
  }
  lodash.extend(res,extendAttr)
  next()
}
