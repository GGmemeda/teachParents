// pages/index/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    swiperId: null,
    isWin: false, // 控制遮罩层
    newsArr: [], // 益体咨询
    isStudentData: false,
    bannerid: null,
    navsArray: [],
    userInfo: [], // 学生列表
    activeIndex: 0,
    navsWidth: 0,
    navTabIndex: 0,
    tabArray: ["动态", "已缴费"],
    tabNav: [
      {
        text: "推荐"
      }, {
        text: "热点"
      }, {
        text: "学校"
      }, {
        text: "成都"
      }, {
        text: "健康"
      }, {
        text: "教体局"
      }
    ],
    selectStudentObj: {}, //得到当前选择的学生
  },

  changeNav(e) {
    let ob = e.currentTarget.dataset;
    wx.setStorageSync("newsid", ob.id)
    this.setData({
      activeIndex: ob.index
    })
    this.getNews(undefined, ob.id);
  },

  // swiper 改变事件
  swiperChange(e) {
    this.setData({
      bannerid: e.detail.current
    })
  },

  pageTabFun(e) {
    this.setData({
      navTabIndex: e.detail.index
    })
  },

  // 获取数据
  getStudentList() {
    // app.HTTP({
    //   url: 'wxapi/user/getStudentInfoList',
    //   method: "GET",
    //   isLoading: false,
    // }).then(res => {
    //   // 隐藏导航栏加载框
    //   wx.hideNavigationBarLoading();
    //   // // 停止下拉动作
    //   wx.stopPullDownRefresh();
    //   if (res.result.records.length) { // 没有用户
    //     // 判断本地是否存在studentid
    //     let studentid = wx.getStorageSync("studentid");
    //     let studentList = res.result.records;
    //     this.setData({
    //       isStudentData: true,
    //       userInfo: studentList
    //     })
    //     if (!studentid) { // 如果存在说明选择过获取第一次过
    //       wx.setStorageSync("studentid", studentList[0].id);
    //     }
    //     this.getSelectStudent();
    //     this.changeArr();
    //
    //     this.getIndexData();
    //   } else {
    //     this.getIndexData();
    //     this.setData({
    //       isStudentData: false
    //     })
    //   }
    // })
  },

  // 改变数据
  changeArr() {
    this.data.userInfo.forEach((item) => {
      if (item.id == this.data.selectStudentObj.id) {
        item.select = true
      } else {
        item.select = false
      }
    })
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  // 切换学生
  chengStudent(e) {
    let id = e.currentTarget.dataset.id;
    wx.setStorageSync("studentid", id);
    this.getSelectStudent();
    this.changeArr(this.data.userInfo, this.data.selectStuobj);
    this.getStudentList();
    this.closeWin();
  },

  // 得到当前选择的学生
  getSelectStudent() {
    let stuid = wx.getStorageSync("studentid");
    let sArr = this.data.userInfo.filter(item => {
      return item.id == stuid
    })
    this.setData({
      selectStudentObj: sArr[0]
    })
    return sArr[0]
  },

  /**
   * 关闭遮罩层
   */
  closeWin() {
    this.setData({
      isWin: false
    })
  },

  /**
   * 打开遮罩层
   */
  openWin() {
    this.setData({
      isWin: true
    })
  },

  openUrls(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/index_details/index?id=${id}`,
    })
  },

  /**
   * 打开页面
   */
  openUrl(e) {
    let id = e.currentTarget.dataset.id;
    let type = e.currentTarget.dataset.type;
    let url = e.currentTarget.dataset.url;
    console.log(url)
    if (!url) {
      return false;
    }
    if (type == "link") { // webview
      wx.navigateTo({
        url: `/pages/webview/index?url=${url}`,
      })
    } else if (type == "information") { // 咨询
      wx.navigateTo({
        url: `/pages/index_details/index?id=${id}`,
      })
    } else if (type == "afterClass") { // 课后服务列表
      wx.navigateTo({
        url: '/pages/class_after_class_service/index'
      })
    } else {
      wx.navigateTo({
        url: `/pages/index_details/index?id=${id}`,
      })
    }
  },

  // 获取首页数据
  getIndexData() {
    let banner = new Promise((resolve, reject) => {
      app.HTTP({
        url: 'wxtapi/home/getBannerPic',
        isLoading: false,
        method: "GET"
      }).then(res => {
        resolve(res.result.records);
      })
    })

    let news = new Promise((resolve, reject) => {
      this.getNews(resolve);
    })

    let navs = new Promise((resolve, reject) => {
      app.HTTP({
        url: 'wxtapi/home/getNewType',
        isLoading: false,
        method: "GET"
      }).then(res => {
        resolve(res.result)
      })
    })

    Promise.all([banner, news, navs]).then(res => {
      this.setData({
        newsArr: res[1],
        navsArray: res[2],
        navsWidth: res[2].length * 120
      })
      if (res[0].length) {
        this.setData({
          imgUrls: res[0],
          bannerid: res[0][0]['id']
        })
      }
    })
  },

  getNews(resolve, dicId = wx.getStorageSync("newsid") ? wx.getStorageSync("newsid") : 24) {
    app.HTTP({
      url: 'wxtapi/home/getNews',
      method: "GET",
      isLoading: false,
      data: {
        dicId
      }
    }).then(res => {
      if (resolve) {
        resolve(res.result.records);
      } else {
        this.setData({
          newsArr: res.result.records
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getIndexData();
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
    if (wx.getStorageSync("token")) {
      this.getIndexData();
    } else {
      this.getIndexData();
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
    if (app.isToken()) {
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();
      this.getIndexData();
    }
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