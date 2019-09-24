// pages/add_students_scores/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    isShow: false,
    kemuArr: [],
    luruArr: [],
    tokenUserType: null,
    slectIndex: 0
  },

  submit() {
    app.HTTP({
      url: 'wxtapi/transcript/withdraw',
      method: 'GET',
      data: {
        id: this.id,
        tokenUserType: this.tokenUserType,
        status: 0, //  发布0，撤回1
      }
    }).then(res => {
      wx.showToast({
        title: '发布成功'
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: this.backIndex ? this.backIndex : 2
        })
      }, 1500)
    })
  },

  openEdit() {
    wx.navigateTo({
      url: `/pages/set_level/index?id=${this.id}&isedit=true`
    })
  },

  uploadFs(e) {
    console.log(e)
    let result = e.detail.value;
    let stutdentId = e.currentTarget.dataset.stutdentid;
    let stutdentName = e.currentTarget.dataset.stutdentname;
    let schoolTranscriptId = e.currentTarget.dataset.schooltranscriptid;
    this.oploadFsjdh(result, stutdentId, stutdentName, schoolTranscriptId);
  },

  oploadFsjdh(result, stutdentId, stutdentName, schoolTranscriptId) {
    app.HTTP({
      url: 'wxtapi/transcript',
      isLoading: false,
      data: {
        result,
        "schoolExamId": this.id,
        id: schoolTranscriptId,
        stutdentId,
        stutdentName,
        "tokenUserType": this.tokenUserType
      }
    })
  },

  selectLanmu(e) {
    let i = e.currentTarget.dataset.index;
    let n = e.currentTarget.dataset.name;
    this.setData({
      slectIndex: i
    })
    if (i) {
      this.getLevelList(n)
    } else {
      this.getLevelList()
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

  getLevelList(grade = "") {
    app.HTTP({
      url: `wxtapi/transcript/entryView`,
      method: 'GET',
      data: {
        id: this.id,
        tokenUserType: this.tokenUserType,
        grade
      }
    }).then(res => {
      let aarr = [];
      for (let i in res.result.groupCount) {
        aarr.push({
          a: i,
          b: res.result.groupCount[i]
        })
      }
      res.result.ObjList.forEach(item => {
        item.idcard = item.idCards.replace(/^(.{4})(?:\d+)(.{4})$/, "$1****$2");
      })
      this.setData({
        kemuArr: aarr,
        luruArr: res.result.ObjList
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id;
    this.tokenUserType = JSON.parse(options.tokenUserType);
    this.backIndex = options.backIndex
    this.setData({
      name: decodeURI(wx.getStorageSync("Subjects")),
      tokenUserType: this.tokenUserType
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
    if (this.data.slectIndex != 0) {
      this.getLevelList(this.data.kemuArr[this.data.slectIndex]['a'])
    } else {
      this.getLevelList()
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