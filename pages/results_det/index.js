// pages/results_det/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    thisselectIndex: 0,
    openurl: '',
    status: null, //设置状态 4 未设置规则   3 未录入状态  2录入状态  1 撤回状态  0 发布状态
    averageObj: {},
    groupCount: [],
    groupList: [],
    selectIndex: 0,
    cArr: []
  },

  back() {
    app.HTTP({
      url: 'wxtapi/transcript/withdraw',
      method: 'GET',
      data: {
        id: this.id,
        tokenUserType: this.tokenUserType,
        status: 1, //  发布0，撤回1
      }
    }).then(res => {
      wx.showToast({
        title: '撤回成功！'
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 1500)
    })
  },

  changeNav(e) {
    let ae = e.currentTarget.dataset
    this.setData({
      selectIndex: ae.index,
      groupList: this.data.cArr[ae.name]
    })
  },

  edi() {
    wx.navigateTo({
      url: this.data.openurl
    })
  },

  del() {
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '将清空此考试所有分数，是否继续！',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          _this.clearFs();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  clearFs() {
    app.HTTP({
      url: 'wxtapi/transcript',
      method: 'DELETE',
      title: '删除中...',
      data: {
        id: this.id,
        tokenUserType: JSON.parse(this.tokenUserType)
      }
    }).then(res => {
      wx.showToast({
        title: '删除成功',
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 1500)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id;
    this.tokenUserType = options.tokenUserType;
    let openurl = ''
    if (options.status == 4) {
      openurl = `/pages/set_level/index?id=${options.id}`
    } else if (options.status == 3 || options.status == 1) {
      openurl = `/pages/add_students_scores/index?id=${options.id}&tokenUserType=${options.tokenUserType}`
    }
    this.setData({
      status: options.status,
      openurl
    })
    this.getView();
  },

  getView() {
    if (this.data.status == 1 || this.data.status == 0) {
      app.HTTP({
        url: 'wxtapi/transcript/view',
        method: 'GET',
        data: {
          id: this.id,
          tokenUserType: this.tokenUserType
        }
      }).then(res => {
        let arr = []
        for (let item in res.result.groupCount) {
          arr.push({
            a: item,
            b: res.result.groupCount[item]
          })
        }
        this.setData({
          averageObj: res.result.averageObj,
          groupCount: arr,
          groupList: res.result.groupList['全部'],
          cArr: res.result.groupList
        })
        wx.setNavigationBarTitle({
          title: res.result.name
        });
      })
    }
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