// pages/classroom/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    isLogin: app.isToken() ? true : false,
    classGradeArray: [],
    selectIndex: 0
  },
  
  students() {
    
  },

  toPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.name}/index`
    })
  },

  getData() {
    app.HTTP({
      url: 'wxtapi/list',
      method: 'GET'
    }).then(res => {
      if (res.result) {
        res.result.forEach(item => {
          this.data.array.push(item.classGradeName)
        })
        this.setData({
          array: this.data.array,
          classGradeArray: res.result
        })
        this.setHeaderData()
      }
    })
  },

  setHeaderData(obj = this.data.classGradeArray[this.data.selectIndex]) {
    wx.setStorageSync('Schoolid', obj.classGradeId)
    wx.setStorageSync('ClassRoomId', obj.id)
    wx.setStorageSync('Subjects', encodeURI(obj.subjectName))
  },

  bindPickerChange(e) {
    if (this.data.selectIndex != e.detail.value) {
      this.setData({
        selectIndex: e.detail.value
      })
      this.setHeaderData();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.isToken()) {
      this.getData();
    }
  },

  showAction() {
    wx.showActionSheet({
      itemList: ['切换课堂', '新增课堂', '修改课堂名称', '删除课堂'],
      success: function (e) {
        console.log(e.tapIndex) //没有item项下的key或index
      }
    })
  },

  actionChange(i) {
    if (!i) {

    }
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
    this.setData({
      isLogin: app.isToken()
    })
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