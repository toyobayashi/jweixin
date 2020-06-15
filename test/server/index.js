const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const router = require('./router.js')
const { PORT } = require('./constants.js')

const app = new Koa()

app
  .use(require('koa-static')(require('path').join(__dirname, '..')))
  .use(cors())
  .use(bodyParser({ enableTypes: ['json', 'form', 'text'] }))
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`)
})
