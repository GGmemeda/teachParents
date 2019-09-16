// components/tab/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabarr: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    topnavFn(e) {
      let i = e.currentTarget.dataset.id;
      this.triggerEvent("changetab", {index: i}, {});
      this.setData({
        selectIndex: i
      })
    }
  }
})
