const Router = require('@koa/router')
const router = new Router()

const { createApi, wxSign } = require('./controllers.js')

router.post('/sign', createApi(wxSign))

module.exports = router
