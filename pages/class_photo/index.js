// pages/class_photo/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    imgHz: ["BMP", "JPG", "JPEG", "PNG", "GIF"]
  },

  getReadyData() {
    app.HTTP({
      url: `wxtapi/photo/getPhotoList`,
      method: 'GET'
    }).then(res => {
      res.result.forEach((item, index) => {
        let urlList = item.url&&item.url.split(";")||[];
        let arr = [];
        urlList.forEach((cItem, cIndex) => {
          arr.push({
            url: cItem,
            isImg: this.data.imgHz.includes(app.getImageSuffix(cItem).toUpperCase()) ? true : false
          })
          console.log(arr);
        })
        item.urlList = arr;
      })
      console.log(res.result)
      this.setData({
        dataList: res.result
      })
    })
  },

  open() {
    wx.navigateTo({
      url: '/pages/class_photo_upload/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReadyData();
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