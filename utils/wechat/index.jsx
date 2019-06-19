import wx from 'weixin-js-sdk';

function getBrowserType() {
  var ua = window.navigator.userAgent.toLowerCase();
  var browserList = ['', 'micromessenger', 'qq', 'ucbrowser', 'safari'];
  if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
    for (var i = 0; i < browserList.length; i++) {
      if (browserList[i] && (ua.indexOf(browserList[i]) !== -1)) {
        return i;
      }
    }
  }
  return 0;
}

function setShareObj(shareParams) {
  console.warn('WeChat.setShareObj', JSON.stringify(shareParams))
  if (getBrowserType() == 1) {
    let {
      baseURL,
      title,
      desc,
      imgUrl,
      success,
    } = shareParams;

    wx.updateAppMessageShareData({ //自定义“分享给朋友”及“分享到QQ”按钮的分享内容 1.4.0版本sdk
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: baseURL, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        success && success()
      }
    })

    wx.updateTimelineShareData({ //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容 1.4.0版本sdk
      title: title, // 分享标题
      link: baseURL, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        success && success()
      }
    })

    wx.onMenuShareTimeline({//分享到朋友圈
      title: title,
      link: baseURL,
      imgUrl: imgUrl,
      success: function () {//接口调用成功时执行的回调函数
        success && success()
      },
    });
    wx.onMenuShareAppMessage({//分享给朋友
      title: title,
      desc: desc,
      link: baseURL,
      imgUrl: imgUrl,
      type: '',//分享类型,music、video或link，不填默认为link
      dataUrl: '',// 如果type是music或video，则要提供数据链接，默认为空
      success: function () {//接口调用成功时执行的回调函数
        success && success()
      },
    });
    wx.onMenuShareQQ({//分享到QQ
      title: title,
      desc: desc,
      link: baseURL,
      imgUrl: imgUrl,
      success: function () {//接口调用成功时执行的回调函数
        success && success()
      },
    });
    wx.onMenuShareQZone({//分享到QQ空间
      title: title,
      desc: desc,
      link: baseURL,
      imgUrl: imgUrl,
      success: function () {//接口调用成功时执行的回调函数
        success && success()
      },
    });
  }
}


function getLocation(callback) {
  console.warn('WeChat.getLocation');
  wx.getLocation({
    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: function (res) {
      if (res.errMsg === 'getLocation:ok') {
        callback && callback(res)
      } else {
        callback && callback(false)
      }
    },
    cancel: function (res) {
      callback && callback(false)
    },
    fail: function (res) {
      callback && callback(false)
    }
  });
}

function openLocation(params) {
  wx.openLocation({
    latitude: 0, // 纬度，浮点数，范围为90 ~ -90
    longitude: 0, // 经度，浮点数，范围为180 ~ -180。
    name: '', // 位置名
    address: '', // 地址详情说明
    scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
    infoUrl: '',// 在查看位置界面底部显示的超链接,可点击跳转
    ...params,
  });
}

function onBridgeReady(config, callback) {
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', config,
    function (res) {
      // 使用以下方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
      if (res.err_msg == "get_brand_wcpay_request:ok") {
        callback && callback(true)
        return;
      }
      callback && callback(false)
    }
  )
}

function payment(config, callback) {
  console.warn('WeChat.payment', config);
  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', () => { onBridgeReady(config, callback) }, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', () => { onBridgeReady(config, callback) });
      document.attachEvent('onWeixinJSBridgeReady', () => { onBridgeReady(config, callback) });
    }
  } else {
    onBridgeReady(config, callback);
  }
}

function scanQrcode(callback) {
  wx.scanQRCode({
    needResult: 1,
    scanType: ["qrCode", "barCode"],
    success: function (res) {
      callback && callback(res)
    },
    fail: function (res) {
    }
  });
}

export default {
  getConfig,
  getLocation,
  openLocation,
  payment,
  scanQrcode,
  setShareObj,
}
