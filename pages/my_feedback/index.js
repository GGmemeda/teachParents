// pages/my_feedback/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpList: []
  },

  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '18081003716'
    })
  },

  toPage(e) {
    wx.navigateTo({
      url: `/pages/my_feedback_details/index?id=${e.currentTarget.dataset.id}`,
    })
  },

  getReadyData() {
    app.HTTP({
      url: "wxapi/user/helpCenter",
      method: "GET"
    }).then(res => {
      this.setData({
        helpList: res.result.helpList.records
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReadyData();
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