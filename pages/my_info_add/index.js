// pages/my_info_add/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    relaArray: [],
    index: 0,
    shotoast: false,
    selectValue: '',
    idCards: '',
    stuName: ''
  },

  showWin() {
  },

  hideWin() {
    this.setData({
      shotoast: false
    })
  },

  bindPickerChange(ev) {
    this.setData({
      selectValue: this.data.array[ev.detail.value]
    })
  },

  // 学生姓名
  changeStyName(e) {
    this.setData({
      stuName: e.detail.value
    })
  },

  // 学生身份证号
  changeIdCards(e) {
    this.setData({
      idCards: e.detail.value
    })
  },

  // 获取关系列表
  getRelationDic() {
    let _this = this;
    app.HTTP({
      url: 'wxapi/home/getRelationDic',
      method: "GET",
      isLoading: false
    }).then(res => {
      res.result.records.forEach(item => {
        _this.data.array.push(item.name)
      })
      _this.setData({
        relaArray: res.result.records,
        array: _this.data.array
      })
    })
  },

  /**
   * 确定按钮
   */
  submitBack() {
    if (!this.data.selectValue || !this.data.idCards || !this.data.stuName) {
      wx.showToast({
        title: '数据不能为空',
        icon: 'none'
      })
      return false;
    }

    if (!(/\d{6}(19|20)\d{2}[01]\d[0123]\d{4}[\dxX]/.test(this.data.idCards))) {
      this.setData({
        shotoast: true
      })
      return false;
    }
    app.HTTP({
      url: 'wxapi/user/bindStudents',
      title: "绑定中...",
      method: "GET",
      data: {
        idCards: this.data.idCards,
        stuName: this.data.stuName,
        type: this.data.selectValue
      }
    }).then(res => {
      if (res.result) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRelationDic();
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
    // console.error(wx.getStorageSync("token"))
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