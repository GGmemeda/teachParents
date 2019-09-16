// pages/login/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  xieyi() {
    wx.navigateTo({
      url: '/pages/login_xieyi/index'
    })
  },

  /**
   * 获取用户信息
   */
  bindgetuserinfo(e) {
    console.log(e);
    if (e.detail.iv) { // 说明点的确定
      app.HTTP({
        title: '获取授权中...',
        url: 'wxapi/auth/login',
        data: {
          "headPic": e.detail.userInfo.avatarUrl,
          "iv": e.detail.iv,
          "nickName": e.detail.userInfo.nickName,
          "wxCode": app.data.code,
          "encrypData": e.detail.encryptedData
        }
      }).then(res => {
        // 保存用户数据到本地
        wx.setStorageSync("token", res.result.token);
        wx.reLaunch({
          url: '/pages/getphone/index',
        })
      })
    }
  },

  cloase() {
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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