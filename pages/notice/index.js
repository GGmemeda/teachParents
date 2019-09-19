// pages/notice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeArray:[{
      title:'暑假放假通知',
      time:'10:58',
      content:'这里是截取通知内容的前一部分，只显示两行。这里是截取通知内容的前一部',
      unread:'3人未读'
    }]
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

  },
  toNoticePage:function () {
    wx.navigateTo({
      url:'/pages/create_notice/index'
    })
  }
})