/// <reference path="../typings/lib.wx.d.ts" />

// console.log(wx);

(async function () {
  function post (url: string, body: any) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json()).then(res => {
      if (res.code === 0) {
        return res.data
      }
      throw new Error(res.err.msg)
    })
  }
  function wxSign (jsApiList: wx.Method[]) {
    return new Promise<void>((resolve, reject) => {
      post('/sign', {
        url: window.location.href
      }).then(({ appId, nonceStr, timestamp, signature }) => {
        const configOptions = {
          appId,
          nonceStr,
          timestamp,
          // debug: true,
          signature,
          jsApiList
        }
        wx.config(configOptions)
        wx.ready(resolve)
        wx.error(reject)
      }).catch(reject)
    })
  }

  const apiList: wx.Method[] = [
    'chooseImage',
    'updateAppMessageShareData',
    'updateTimelineShareData',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'previewImage',
    'getLocalImgData',
    'checkJsApi',
    'openLocation',
    'getLocation',
    'scanQRCode',
    'showOptionMenu',
    'openBusinessView'
  ]

  await wxSign(apiList)

  wx.checkJsApi({
    jsApiList: ['chooseImage'],
    success (res) {
      console.log(res.checkResult.chooseImage)
    },
    fail (err) {
      console.log(err.errMsg)
    }
  })

  document.getElementById('updateAppMessageShareData')!.addEventListener('click', function () {
    wx.updateAppMessageShareData({
      title: '1',
      desc: '2',
      link: 'http://127.0.0.1',
      imgUrl: '',
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err.errMsg)
      }
    })
  }, false)
  document.getElementById('updateTimelineShareData')!.addEventListener('click', function () {
    wx.updateTimelineShareData({
      title: '1',
      link: 'http://127.0.0.1',
      imgUrl: '',
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err.errMsg)
      }
    })
  }, false)
  document.getElementById('startRecord')!.addEventListener('click', function () {
    wx.startRecord({
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err.errMsg)
      }
    })
  }, false)
  document.getElementById('stopRecord')!.addEventListener('click', function () {
    wx.stopRecord({
      success (res) {
        console.log(res.localId)
      },
      fail (err) {
        console.log(err.errMsg)
      }
    })
  }, false)
  document.getElementById('onVoiceRecordEnd')!.addEventListener('click', function () {
    wx.onVoiceRecordEnd({
      complete (res) {
        console.log(res.localId)
      }
    })
  }, false)
  document.getElementById('chooseImage')!.addEventListener('click', function () {
    wx.chooseImage({
      count: 1,
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err.errMsg)
      }
    })
  }, false)
  document.getElementById('previewImage')!.addEventListener('click', function () {
    wx.previewImage({
      current: 'https://www.ucloud.cn/yun/d/file/2019-07-05/581ee56c180b499e16c46ccf1da47905.png',
      urls: ['https://www.ucloud.cn/yun/d/file/2019-07-05/581ee56c180b499e16c46ccf1da47905.png'],
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err.errMsg)
      }
    })
  }, false)
  document.getElementById('getNetworkType')!.addEventListener('click', function () {
    wx.getNetworkType({
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err.errMsg)
      }
    })
  }, false)
  document.getElementById('openLocation')!.addEventListener('click', function () {
    wx.openLocation({
      latitude: 23.12908,
      longitude: 113.26436,
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err.errMsg)
      }
    })
  }, false)
  document.getElementById('getLocation')!.addEventListener('click', function () {
    wx.getLocation({
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err.errMsg)
      }
    })
  }, false)

  wx.miniProgram.getEnv((r) => {
    console.log(r)
  })

  wx.openBusinessView({
    businessType: '',
    success (res) {
      console.log(res)
    },
    fail (err) {
      console.log(err.errMsg)
    }
  })
})().catch(err => {
  console.error(err)
})
