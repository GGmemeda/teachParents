// pages/set_level/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [
      {
        levelName: '',
        level_min: '',
        level_max: ''
      }
    ]
  },

  levelInput(e) {
    let a = e.currentTarget.dataset;
    this.changeData(a.index, a.name, e.detail.value);
  },

  changeData(i, name, val) {
    this.data.dataList[i][name] = val;
    console.log(this.data.dataList)
    this.setData({
      dataList: this.data.dataList
    })
  },

  addList() {
    this.data.dataList.push({
      levelName: '',
      level_min: '',
      level_max: ''
    })
    this.setData({
      dataList: this.data.dataList
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