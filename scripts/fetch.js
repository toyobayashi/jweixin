const fetch = require('node-fetch')

function fetchSDKCode () {
  return fetch('https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html').then(res => res.text()).then(html => {
    const matchArr = html.match(/https?:\/\/res2?\.wx\.qq\.com\/open\/js\/jweixin-\S+\.js/g)
    if (matchArr) {
      return fetch(matchArr[0]).then(res => res.text()).catch((err) => {
        if (matchArr[1]) {
          return fetch(matchArr[1]).then(res => res.text())
        }
        throw err
      })
    }
    throw new Error('Regex match failed.')
  })
}

module.exports = fetchSDKCode
