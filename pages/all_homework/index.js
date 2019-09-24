// pages/all_homework/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   * workStatus 0 新建。1 撤回
   * type 0 默认 1 图片。2 视频
   * status 0 未完成 1已完成
   */
  data: {
    tabArr: ["作业动态", "全部作业"],
    navTabIndex: 0,
    dongtai: [],
    all: []
  },

  dongtaiOpenDetUrl(e) {
    // console.debug(e.currentTarget.dataset.type)
    // type 0 默认 1 图片。2 视频
    let type = e.currentTarget.dataset.type;
    let workid = e.currentTarget.dataset.workid;
    let status = e.currentTarget.dataset.status;
    if (!status) { // status 0 未完成 1已完成
      if (type == 0) {
        wx.navigateTo({
          url: `/pages/homework_type_text/index?workid=${workid}`
        })
      } else if (type == 1) {
        wx.navigateTo({
          url: `/pages/homework_type_images/index?workid=${workid}`
        })
      } else if (type == 2) {
        wx.navigateTo({
          url: `/pages/homework_type_video/index?workid=${workid}`
        })
      }
    } else {
      wx.navigateTo({
        url: `/pages/wanchengzuoye_det/index?workid=${workid}`
      })
    }
  },

  pageTabFun(e) {
    this.setData({
      navTabIndex: e.detail.index
    })
    if (!e.detail.index) {
      this.getDT();
    } else {
      this.getALl();
    }
  },

  getDT() {
    app.HTTP({
      url: 'wxtapi/work/getWorkActionList',
      method: 'GET'
    }).then(res => {
      this.setData({
        dongtai: res.result
      })
    })
  },

  getALl() {
    app.HTTP({
      url: 'wxapi/work/getWorkList',
      method: 'GET'
    }).then(res => {
      this.setData({
        all: res.result
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
      this.getDT();
    } else {
      this.getALl();
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