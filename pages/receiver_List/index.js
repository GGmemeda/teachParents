// pages/receiver_List/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabArr: ["未读", "已读"],
        unreadList: [],
        navIndex:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        options.id = 6;
        this.setData({
            noticeId: options.id
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
    getReadyData(noticeId) {
        // /GET wxtapi/msg/noReadNoticeList
        app.HTTP({
            url: 'wxtapi/msg/noReadNoticeList',
            method: 'GET',
            data: {
                noticeId
            }
        }).then(res => {
            const data = res.result.list;
            console.log(data);
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
        const noticeId = this.data.noticeId;
        this.setData({
            navIndex
        })
        if (index === 1) {
            this.getReadList(noticeId);
        } else {
            this.getReadyData(noticeId);
        }
    },
    getReadList(noticeId) {
        app.HTTP({
            url: 'wxtapi/msg/readNoticeList',
            method: 'GET',
            data: {
                noticeId
            }
        }).then(res => {
            const data = res.result.list;
            this.setData({
                unreadList: data
            });
        });
    },
    setPhone:function (e) {
        const phone=e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: phone //仅为示例，并非真实的电话号码
        })
    }
});