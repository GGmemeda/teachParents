const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  created() {
    console.log(123123123)
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    }, 
    toSizer:{
      type: [Boolean, String],
      default: false
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    comeback:{
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
    tobegin:{
      type: [Boolean, String],
      default: false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    windowHeight: app.globalData.windowHeight,
    windowWidth: app.globalData.windowWidth,
    windowIsBang: app.globalData.windowIsBang
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    comeback(){
      wx.reLaunch({
        url: '/pages/01home/findfriends/findfriends',
      })
    },
    toHome(){
      wx.reLaunch({
        url: '/pages/index/index',
      })
    },
    toSizer(){
      wx.reLaunch({
        url: '/pages/01home/childPage/sponsorPage/sponsorPage',
      })
    },
    tobegin(){
      wx.reLaunch({
        url: '/pages/01home/begin/begin',
      })
    },
  }
})