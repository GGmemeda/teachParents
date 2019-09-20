// pages/class_tz/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
  },

  openDet(e) {
    wx.navigateTo({
      url: `/pages/class_tz_det/index?id=${e.currentTarget.dataset.id}`,
    })
  },

  getReadyData() {
    app.HTTP({
      url: 'wxapi/notice/getNoticeList',
      method: 'GET'
    }).then(res => {
      this.setData({
        dataList: res.result
      })
      console.log(res)
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