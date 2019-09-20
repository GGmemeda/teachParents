// pages/my_feedback_details/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: {}
  },


  escape2Html: function (str) {
    var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
  },

  getReadyData(helpId) {
    app.HTTP({
      url: "wxtapi/user/helpCenterById",
      method: "GET",
      data: {
        helpId
      }
    }).then(res => {
      res.result.richText = res.result.richText.replace('<img ', '<img style="max-width:100%;height:auto"')
      res.result.richText = this.escape2Html(res.result.richText)
      this.setData({
        obj: res.result
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReadyData(options.id)
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