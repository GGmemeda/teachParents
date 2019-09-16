// pages/homework_type_images/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: {}
  },

  getReadyData(workId) {
    app.HTTP({
      url: 'wxapi/work/getWorkInfo',
      method: 'GET',
      data: {
        workId
      }
    }).then(res => {
      res.result.url = res.result.url.split(";");
      this.setData({
        obj: res.result
      })
      wx.setNavigationBarTitle({
        title: res.result.title
      })
    })
  },

  submit() {
    app.HTTP({
      url: 'wxapi/work/finishWork',
      data: {
        workId: this.workid
      }
    }).then(res => {
      wx.showToast({
        title: '成功！'
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 1500)
    })
  },

  openUpload() {
    wx.navigateTo({
      url: `/pages/wanchengzuoye_images/index?workid=${this.workid}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.workid = options.workid;
    this.getReadyData(options.workid);
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