// pages/add_students_scores/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    isShow: false,
    kemuArr: []
  },

  showWin() {
    this.setData({
      isShow: true
    })
  },

  hideWin() {
    this.setData({
      isShow: false
    })
  },

  getLevelList() {
    app.HTTP({
      url: `wxtapi/tea/erl`,
      method: 'GET',
      data: {
        teacherExamId: this.id
      }
    }).then(res => {
      res.result.map(item => {
        return {
          ...item,
          len: 0
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id;
    this.setData({
      name: decodeURI(wx.getStorageSync("Subjects"))
    })
    this.getLevelList();
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