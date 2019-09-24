// pages/homeword_receiver_List/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabArr: ["已完成", "未完成"],
        unreadList: [],
        navIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            workId: options.id
        });
        this.getReadyData(options.id);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    /**
     * 获取数据
     */
    getReadyData(workId) {
        // /GET wxtapi/msg/noReadNoticeList
        app.HTTP({
            url: 'wxtapi/homeWork/finishWorkList',
            method: 'GET',
            data: {
                workId
            }
        }).then(res => {
            const data = res.result;
            data.map(item => {
                if (item.url) {
                    item.urlList = item.url.split(';');
                } else {
                    item.urlList = [];
                }
            });
            this.setData({
                unreadList: data
            });
        });
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

    },
    pageTabFun: function (e) {
        const navIndex = e.detail.index;
        const workId = this.data.workId;
        this.setData({
            navIndex
        });
        console.log(navIndex);
        if (navIndex === 1) {
            this.getReadList(workId);
        } else {
            this.getReadyData(workId);
        }
    },
    getReadList(workId) {
        app.HTTP({
            url: 'wxtapi/homeWork/noFinishWorkList',
            method: 'GET',
            data: {
                workId
            }
        }).then(res => {
            const data = res.result;
            this.setData({
                unreadList: data
            });
        });
    },
    setPhone: function (e) {
        const phone = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: phone //仅为示例，并非真实的电话号码
        });
    }
});