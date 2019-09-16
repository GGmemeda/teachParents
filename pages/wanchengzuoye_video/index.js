// pages/my_help_center/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lenText: 0, // 输入框文字长度
    val: '', // 内容
    adviceImgList: [], // 上传图片数组
    phone: ''
  },

  deleteImg(e) {
    let _this = this;
    wx.showModal({
      title: '删除提示',
      content: '是否删除当前选中图片',
      showCancel: true,
      success: function (res) {
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

  selecVideo() {
    let _this = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
        let newarr = _this.data.adviceImgList.concat([res.tempFilePath])
        if (newarr.length > 3) {
          newarr.splice(3, newarr.length - 3)
        }
        _this.setData({
          adviceImgList: newarr
        })
      }
    })
  },

  selectImg() {
    let _this = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success(res) {
        let base64 = null;
        let temp = res.tempFilePaths.map((item, iindex) => {
          return {
            url: item,
            base64: wx.getFileSystemManager().readFileSync(res.tempFilePaths[iindex], 'base64')
          }
        });
        let newarr = _this.data.adviceImgList.concat(temp)
        if (newarr.length > 6) {
          newarr.splice(6, newarr.length - 6)
        }
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
    if (this.data.val && this.data.adviceImgList.length) {
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
    console.log(this.data.adviceImgList)
    // 提交
    if (this.validation()) {
      wx.showLoading({
        title: "视频上传中...",
        mask: true,
      })
      for (let i = 0; i < imgLen; i++) {
        app.uploadIV(this.data.adviceImgList[i], function (src) {
          imgStr.push(src);
          loading++;
          if (loading >= imgLen) {
            wx.hideLoading();
            console.log("success")
            app.HTTP({
              url: 'wxapi/work/finishWork',
              title: "提交中...",
              data: {
                workId: _this.workid,
                url: imgStr.join(";"),
                des: _this.data.val
              }
            }).then(resut => {
              if (resut.status == 200) {
                wx.showToast({
                  title: '成功!'
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 2,
                  })
                }, 1500)
              }
            })
          }
        })
      }
    } else {
      wx.showToast({
        title: '数据格式不正确',
        icon: "none"
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.workid = options.workid;
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