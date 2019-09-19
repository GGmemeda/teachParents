// pages/addtest/index.js
let app = getApp();
var moment = require('../../utils/moment.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: '',
    issubmit: false,
    subjectName: '',
    date: moment().format("YYYY-MM-DD")
  },

  input(e) {
    this.setData({
      val: e.detail.value,
      issubmit: e.detail.value ? true : false
    })
  },

  getsubjectName() {
    this.setData({
      subjectName: decodeURI(wx.getStorageSync("Subjects"))
    })
  },

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  postTea() {
    app.HTTP({
      url: 'wxtapi/tea',
      data: {
        "examName": this.data.val,
        "examTime": this.data.date
      }
    }).then(res => {
      wx.showToast({
        title: '添加考试成功',
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 1500)
    })
  },

  submit() {
    if (this.data.issubmit) {
      this.postTea();
    } else {
      wx.showToast({
        title: '请输入名称',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getsubjectName();
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