// pages/results/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ["独立考试", "统一考试"],
    navTabIndex: 0,
    transcriptData: [],
    notext: '你还没有添加考试哦，点击下方【添加考试】按钮立即添加'
  },

  addresults() {
    wx.navigateTo({
      url: '/pages/addtest/index'
    })
  },

  openUrl(e) {
    let a = e.currentTarget.dataset;
    if (a.status == 2) { // 录入状态,直接跳转录入页面
      wx.navigateTo({
        url: `/pages/add_students_scores/index?id=${a.id}`
      })
    } else {
      wx.navigateTo({
        url: `/pages/results_det/index?status=${a.status}&id=${a.id}`
      })
    }
  },

  pageTabFun(e) {
    this.setData({
      navTabIndex: e.detail.index,
      notext: this.data.navTabIndex ? '你还没有添加考试哦，点击下方【添加考试】按钮立即添加' : '暂无统一考试哦！'
    })
    this.transcript(this.data.navTabIndex ? true : false)
  },

  transcript(tokenUserType = false) {
    app.HTTP({
      url: 'wxtapi/transcript',
      data: {
        tokenUserType
      },
      method: 'GET'
    }).then(res => {
      this.setData({
        transcriptData: res.result,
        tabArr: this.data.tabArr
      })
    })
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
    if (!this.data.navTabIndex) {
      this.transcript()
    } else {
      this.transcript(true)
    }
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