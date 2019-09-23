//app.js
var md5 = require('utils/md5.js');
var http = require('utils/http.js');
App({
  data: {
    // baseUrl: 'http://47.108.69.129:8087/',
    // baseUrl: 'https://weixin.yitiwanlian.com/',
    // baseUrl: 'https://xiaochengxu.yitiwanlian.com/',
    // baseUrl: 'http://192.168.0.107:8087/',
    baseUrl: 'http://192.168.0.106:8089/',
    header: {
      openid: '2n4nqmdic8j38cj4'
    },
    code: ""
  },

  onLaunch: function () {
    let _this = this;
    wx.login({
      success(res) {
        _this.data.code = res.code;
      }
    })
    // let _this = this;
    // // wx.cloud.init();
    // if (!this.isToken()) { // 未登录状态，跳转登录页面
    //   wx.login({
    //     success(res) {
    //       _this.data.code = res.code;
    //     }
    //   })
    //   wx.reLaunch({
    //     url: '/pages/login/index'
    //   })
    // }
  },

  uploadImg(url, fn) {
    this.HTTP({
      url: 'wxtapi/upload/uploadBase64',
      method: "POST",
      data: url
    }).then(res => {
      if (res.status == 200) {
        fn(res.result)
      }
      // fn(JSON.parse(r.data).result)
    })
    
  },

  uploadIV(url, fn) {
    wx.uploadFile({
      url: this.data.baseUrl + 'wxapi/upload/uploadImg',
        filePath: url,
        name: 'file',
        success(r) {
          fn(JSON.parse(r.data).result);
        },
        fail(errMsg) {
          console.log(errMsg)
        }
      })
  },

  // 判断是否存在token
  isToken() {
    return wx.getStorageSync("token");
  },

  HTTP: (new http.HTTP).request,

  S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  },
  // 生产UUID
  UUID() {
    return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
  },
  
  // 获取阿里云对象存储签名
  getOssSign(back) {
    this.httpGet({
      title: '获取签名',
      url: 'Basics/OssSign',
      back(res) {
        back(res)
      }
    })
  },

  // 获取图片后缀.png .jpg .jpeg
  getImageSuffix(src) {
    let a = src.lastIndexOf('.');
    let b = src.length;
    return src.substring(a + 1, b);
  },
  
  globalData: {
    userInfo: null
  }
})