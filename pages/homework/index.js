// pages/my_help_center/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lenText: 0, // 输入框文字长度
    val: '', // 内容
    title: '',
    adviceImgList: [], // 上传图片数组
    phone: '',
    index: 0,
    isswitch: true,
    arrayTj: ["默认", "图片", "视频"],
    array: ['默认:只需要家长点击完成即可，无需提交任何信息', '图片:需要家长拍照并上传图片，最多可上传9张图片', '视频:需要家长录制并上传视频，最多可上传3个5分钟以内视频'],
  },

  titleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },

  switch1Change(e) {
    this.setData({
      isswitch: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  deleteImg(e) {
    let _this = this;
    wx.showModal({
      title: '删除提示',
      content: '是否删除当前选中图片',
      showCancel: true,
      success: function(res) {
        if (res.confirm) {
          _this.data.adviceImgList.splice(e.currentTarget.dataset.index, 1);
          _this.setData({
            adviceImgList: _this.data.adviceImgList
          })
        }
      }
    })
    
  },

  changephone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 输入框改变事件
  textChange(e) {
    this.setData({
      lenText: e.detail.value.length,
      val: e.detail.value.replace(/\s+/g, '')
    })
  },

  selectImg() {
    let _this = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success(res) {
        let temp = res.tempFilePaths.map((item, iindex) => {
          return {
            url: item
          }
        });
        let newarr = _this.data.adviceImgList.concat(temp)
        _this.setData({
          adviceImgList: newarr
        })
      }
    })
  },

  // 改变图片
  changeImg(e) {
    let _this = this;
    let index = e.currentTarget.dataset.index; // 
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success(res) {
        _this.data.adviceImgList[index].url = res.tempFilePaths[0];
        _this.setData({
          adviceImgList: _this.data.adviceImgList
        })
      }
    })
  },

  // 验证是否可以提交
  validation() {
    if (this.data.title && this.data.val) {
      return true;
    } else {
      return false;
    }
  },

  submitBack() {
    let imgLen = this.data.adviceImgList.length;
    let loading = 0;
    let imgStr = [];
    let _this = this;
    let urlMap = [];
    // 提交
    if (this.validation()) {
      if (this.data.adviceImgList.length) {
        wx.showLoading({
          title: '发布中...',
          mask: true
        })
        this.data.adviceImgList.forEach(item => {
          app.uploadIV(item.url, (backUrl) => {
            loading++;
            urlMap.push(backUrl);
            if (loading >= this.data.adviceImgList.length) {
              this.submitHomeWork(urlMap.join(";"))
            }
          })
        })
      } else {
        this.submitHomeWork("")
      }
    } else {
      wx.showToast({
        title: '数据格式不正确',
        icon: "none"
      })
    }
  },

  getWorkInfo(workId) {
    app.HTTP({
      url: 'wxtapi/homeWork/getWorkInfo',
      method: 'GET',
      data: {
        workId: workId
      }
    }).then(res => {
      if (res.result.url) {
        res.result.url.split(";").forEach((item) => {
          this.data.adviceImgList.push({
            url: item
          })
        })
      }
      this.id = res.result.id;
      this.setData({
        title: res.result.title,
        val: res.result.content,
        isswitch: res.result.isConfirm ? true : false,
        index: res.result.completeMode - 1,
        adviceImgList: this.data.adviceImgList
      })
    })
  },

  submitHomeWork(url) {
    let data = {
      title: this.data.title,
      content: this.data.val,
      url: url,
      isConfirm: this.data.isswitch ? 1 : 0, // 1是需要，0不需要
      completeMode: Number.parseInt(this.data.index) + 1 //1默认，2图片，3视频
    }
    if (this.isedit) {
      data.id = this.id;
    }
    app.HTTP({
      url: this.isedit ? 'wxtapi/homeWork/editWorkById' : 'wxtapi/homeWork/addWork',
      data: data
    }).then(res => {
      wx.showToast({
        title: '布置成功',
        duration: 1500,
        success: function(res) {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 1500)
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isedit = options.workid ? true : false 
    if (options.workid) {
      // 需要请求接口渲染到页面中
      this.getWorkInfo(options.workid)
    }
    wx.setNavigationBarTitle({
      title: options.title
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