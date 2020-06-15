const fetch = require('node-fetch')
const { APP_ID, APP_SECRET } = require('./constants.js')

const tokens = {
  token: {
    value: '',
    expiresIn: 7200,
    createdOn: null
  },
  ticket: {
    value: '',
    expiresIn: 7200,
    createdOn: null
  }
}

async function getToken () {
  if (tokens.token.value !== '' && tokens.token.createdOn.getTime() + tokens.token.expiresIn * 1000 > Date.now()) {
    return tokens.token.value
  }

  const res = await fetch(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APP_ID}&secret=${APP_SECRET}`, {
    method: 'GET'
  }).then(res => {
    return res.json()
  })

  tokens.token.value = res.access_token
  tokens.token.expiresIn = res.expires_in
  tokens.token.createdOn = new Date()

  return tokens.token.value
}

async function getTicket () {
  if (tokens.ticket.value !== '' && tokens.ticket.createdOn.getTime() + tokens.ticket.expiresIn * 1000 > Date.now()) {
    return tokens.ticket.value
  }

  const token = await getToken()
  const res = await fetch(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`, {
    method: 'GET'
  }).then(res => {
    return res.json()
  })

  if (res.errcode === 0 && res.errmsg === 'ok') {
    tokens.ticket.value = res.ticket
    tokens.ticket.expiresIn = res.expires_in
    tokens.ticket.createdOn = new Date()

    return tokens.ticket.value
  }

  throw new Error(res.errmsg)
}

exports.getToken = getToken
exports.getTicket = getTicket
