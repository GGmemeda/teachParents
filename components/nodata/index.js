// components/nodata/index.js
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    setColor: {
      type: String,
      value: "b"
    },
    selectDataType: {
      type: String,
      value: "xs1" // xues1:我的学生信息没有数据
    },
    isshowbottom: {
      type: Boolean,
      value: false
    },
    isopenurl: {
      type: String,
      value: ""
    },
    urltext: {
      type: String,
      value: ""
    },
    morentext: {
      type: String,
      value: "你还没有绑定学生，快去绑定吧！"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    openUrl() {
      wx.navigateTo({
        url: this.data.isopenurl
      })
    },
    toBind() {
      if (app.isToken()) {
        // wx.navigateTo({
        //   url: '/pages/my_info_add/index',
        // })
      } else {
        wx.navigateTo({
          url: '/pages/login/index',
        })
      }
    }
  }
})
