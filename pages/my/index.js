// pages/my/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  toLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },

  getReadyData() {
    let _this = this;
    app.HTTP({
      url: "wxtapi/user",
      isLoading: false,
      method: "GET"
    }).then(res => {
      this.setData({
        userInfo: res.result
      })
    })
  },

  /**
   * 页面跳转
   */
  toPage(e) {
    let name = e.currentTarget.dataset.name;
    if (name == "my_feedback") {
      wx.navigateTo({
        url: `/pages/${name}/index`,
      })
    } else {
      if (app.isToken()) {
        wx.navigateTo({
          url: `/pages/${name}/index`,
        })
      } else {
        wx.showToast({
          title: '请登录',
          icon: "none"
        })
      }
    }
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
    if (app.isToken()) {
      this.getReadyData();
    }
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