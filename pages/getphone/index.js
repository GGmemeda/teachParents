// pages/getphone/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxUser: {}
  },

  bindgetphonenumber(e) {
    if (e.detail.errMsg != "getPhoneNumber:ok") {
      return false;
    }
    wx.checkSession({
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.log(err)
      }
    })
  
    app.HTTP({
      url: "wxapi/auth/getPhoneNumber",
      method: "POST",
      data: { ...e.detail, wxCode: app.data.code, wxUser:this.data.wxUser}
    }).then(res => {
      if (res.msg) {
        wx.showToast({
          title: '请点击确定',
        })
      } else {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
    // wx.cloud.callFunction({
    //   name: 'sum',
    //   complete: res => {
    //     console.log('callFunction test result: ', res)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: (res) => {
        this.setData({
          wxUser: res
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})