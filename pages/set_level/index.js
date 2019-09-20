// pages/set_level/index.js
let app = getApp();
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

  submitAjax() {
    console.log(this.data.dataList)
    let list = this.data.dataList.map(item => {
      return {
        grade: item.levelName,
        id: '',
        maxPrice: item.level_max,
        minPrice: item.level_min,
        teacherExamId: this.id
      }
    })
    app.HTTP({
      url: 'wxtapi/tea/ers',
      data: list
    }).then(res => {
      wx.showToast({
        title: '设置成功',
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 2,
        })
      }, 1500)
    })
  },

  submit() {
    let reg = /^[A-Z]{1}$/;
    let ind = 0;
    for (let i = 0; i < this.data.dataList.length; i++) {
      if (!reg.test(this.data.dataList[i].levelName)) {
        wx.showToast({
          title: '等级名称不符合规则！',
          icon: 'none'
        })
        break;
      } else { // 等级名称符合规则
        // 验证是否填写分数
        if (!this.data.dataList[i]['level_min'] || !this.data.dataList[i]['level_max']) {
          wx.showToast({
            title: '请填写分数段！',
            icon: 'none'
          })
          break;
        } else {
          // 验证分数是否符合规则
          if (Number.parseInt(this.data.dataList[i]['level_min']) >= Number.parseInt(this.data.dataList[i]['level_max'])) {
            wx.showToast({
              title: '分数区间不正确！',
              icon: 'none'
            })
            break;
          } else {
            ind++;
          }
        }
      }
    }
    if (this.data.dataList.length === ind) { // 可以提交
      this.submitAjax();
    }
  },

  levelInput(e) {
    let a = e.currentTarget.dataset;
    this.changeData(a.index, a.name, e.detail.value);
  },

  changeData(i, name, val) {
    this.data.dataList[i][name] = val;
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
    this.id = options.id;
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