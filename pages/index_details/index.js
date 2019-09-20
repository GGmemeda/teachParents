// pages/index_details/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {}
  },

  getData(newId) {
    let _this = this;
    app.HTTP({
      url: 'wxtapi/home/getNewsById',
      title: '获取新闻数据中...',
      method: "GET",
      data: {
        newId
      }
    }).then(res => {
      res.result.content = res.result.content.replace('<img ', '<img style="max-width:100%;height:auto"');
      console.log(res.result)
      _this.setData({
        content: res.result
      })
      console.log(res);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.id);
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