const crypto = require('crypto')

const { APP_ID } = require('./constants.js')
const { getTicket } = require('./token.js')

function generateRandomString () {
  const n = Math.floor(Math.random() * 32)
  let str = ''
  for (let i = 0; i < n; i++) {
    str += String.fromCharCode(Math.floor(Math.random() * 58) + 65)
  }
  return str
}

async function wxSign (body) {
  const { url } = body
  const ticket = await getTicket()
  console.log(ticket)
  const nonceStr = generateRandomString()
  const timestamp = Math.floor(Date.now() / 1000)
  const str = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
  const signature = crypto.createHash('sha1').update(str).digest('hex')
  return {
    appId: APP_ID,
    nonceStr,
    timestamp,
    signature
  }
}

function createApi (fn) {
  return async (ctx) => {
    let res
    try {
      res = await fn(ctx.request.body)
    } catch (err) {
      console.log(err)
      ctx.response.body = {
        err: {
          msg: err.message
        },
        code: err.code,
        data: null
      }
      return
    }
    ctx.response.body = {
      err: null,
      code: 0,
      data: res
    }
  }
}

exports.createApi = createApi
exports.wxSign = wxSign
