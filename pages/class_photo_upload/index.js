// pages/class_photo_upload/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lenText: 0, // 输入框文字长度
    val: '', // 内容
    adviceImgList: [], // 上传图片数组
    phone: '',
    videosrc: "",
    isUpload: false
  },

  inputChange(e) {
    this.setData({
      val: e.detail.value
    })
  },

  changeImgVideo() {
    let _this = this;
    wx.showActionSheet({
      itemList: ['视频', '图片'],
      success(res) {
        if (res.tapIndex) {
          _this.selectImg();
        } else {
          _this.selectVideo();
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  changeIMG() {
    if (this.data.adviceImgList.length) {
      this.setData({
        isUpload: true
      })
    } else {
      this.setData({
        isUpload: false
      })
    }
  },

  selectVideo() {
    let _this = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        let obj = {
          isimg: false,
          url: res.tempFilePath
        }
        _this.data.adviceImgList.push(obj);
        _this.setData({
          adviceImgList: _this.data.adviceImgList
        })
        _this.changeIMG();
      }
    })
  },

  selectImg() {
    let _this = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success(res) {
        let base64 = null;
        let temp = res.tempFilePaths.map((item, iindex) => {
          return {
            url: item,
            isimg: true
          }
        });
        let newarr = _this.data.adviceImgList.concat(temp)
        _this.setData({
          adviceImgList: newarr
        })

        _this.changeIMG();
      }
    })
  },

  upl() {
    let imgLen = this.data.adviceImgList.length;
    let loading = 0;
    let upArr = [];
    let _this = this;
    if (this.data.isUpload) {
      wx.showLoading({
        title: '上传中...',
        mask: true,
      })
      this.data.adviceImgList.forEach(item => {
        app.uploadIV(item.url, function (src) {
          upArr.push(src);
          loading++;
          if (loading >= imgLen) {
            _this.upiiii(upArr.join(";"))
            // 上传完成
          }
        })
      })
    }
  },

  upiiii(url) {
    app.HTTP({
      url: 'wxapi/photo/addPhoto',
      title: '上传中...',
      data: {
        des: this.data.val,
        userId: 1,
        url
      }
    }).then(res => {
      if (res.status == 200) {
        wx.showToast({
          title: '上传成功'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1500)
      }
    })
  },

  deleteImg(e) {
    let _this = this;
    wx.showModal({
      title: '删除提示',
      content: '是否删除当前所选项',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          _this.data.adviceImgList.splice(e.currentTarget.dataset.index, 1);
          _this.setData({
            adviceImgList: _this.data.adviceImgList
          })
          _this.changeIMG();
        }
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