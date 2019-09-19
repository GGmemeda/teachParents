// 封装HTTP请求
export class HTTP {

  constructor() {}

  // 数据请求
  request({
    url, 
    isLoading = true,
    success,
    title = '获取数据中', 
    fail, 
    method = 'POST', 
    data = {}, 
    header = {}
  }) {
    let _this = this;
    // 获取token,如果有的话就写入header
    let token = wx.getStorageSync("token");
    let ClassRoomId = wx.getStorageSync("Schoolid");
    let Schoolid = wx.getStorageSync("ClassRoomId");
    let Subjects = wx.getStorageSync("Subjects");
    if (token) {
      header.token = token;
    }
    if (Schoolid) {
      header.Schoolid = Schoolid;
    }
    if (ClassRoomId) {
      header.ClassRoomId = ClassRoomId;
    }
    if (Subjects) {
      header.Subjects = Subjects;
    }
    // 是否显示Loading
    if (isLoading) {
      wx.showLoading({
        title,
        mask: true,
      })
    }

    // console.log(`${this.data.baseUrl}${url}`, data)

    return new Promise((resolve, rejeck) => {
      wx.request({
        url: `${this.data.baseUrl}${url}`,
        data,
        header: { ...header, ...this.data.header },
        method,
        success: (res) => {
          if (!res.data.msg) { // 接口成功
            resolve(res.data);
            _this.hideTime = 0;
          } else {
            _this.hideTime = 2500;
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2500
            })
          }
        },
        fail: (res) => {
          // console.error("错误" , res)
          // 请求失败
          HTTP.errToast(res);
        },
        complete: (res) => {
          setTimeout(() => {
            wx.hideLoading();
          }, _this.hideTime)
        },
      })
    })
  }

  static errToast(err = {}) {
    if (err.errMsg == 'request:fail timeout') {
      wx.showToast({
        title: '请求超时',
        icon: 'none',
        duration: 2500
      })
    } else {
      if (err.msg) {
        wx.showToast({
          // 根据后台决定
          title: err.msg,
          icon: 'none',
          duration: 2500
        })
      } else {
        wx.showToast({
          title: "服务器开小差啦",
          icon: 'none',
          duration: 2500
        })
      }
    }
  }
}
