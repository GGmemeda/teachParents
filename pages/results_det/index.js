// pages/results_det/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    thisselectIndex: 0,
    openurl: '',
    status: null, //设置状态 4 未设置规则   3 未录入状态  2录入状态  1 撤回状态  0 发布状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openurl = ''
    if (options.status == 4) {
      openurl = `/pages/set_level/index?id=${options.id}`
    } else if (options.status == 3) {
      openurl = `/pages/add_students_scores/index?id=${options.id}&tokenUserType=${options.tokenUserType}`
    }
    this.setData({
      status: options.status,
      openurl
    })
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