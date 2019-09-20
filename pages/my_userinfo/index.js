// pages/my_userinfo/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  // 获取手机等加密数据，需要发给后台
  bindgetphonenumber(e) {
    console.log(e)
  },

  toPage() {
    wx.navigateTo({
      url: '/pages/my_userinfo_username/index',
    })
  },

  // 获取用户数据
  getUserData() {
    let _this = this;
    app.HTTP({
      url: "wxtapi/user",
      method: "GET"
    }).then(res => {
      this.setData({
        userInfo: res.result
      })
    })
  },

  // 更换头像
  changeAvator() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success(res) {
        let tempFilePaths = res.tempFilePaths[0];
        _this.setData({
          avatorurl: tempFilePaths
        })
      }
    })
  },

  /**
   * 手机号添加*号
   */
  hidePhone(mobile) {
    return (mobile + "").replace(/^(\d{3})\d{4}(\d+)/, "$1****$2")
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
    this.getUserData();
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