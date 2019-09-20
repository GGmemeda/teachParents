// pages/class_tz_det/index.js
let commonConfig = require('../../utils/commonConfig.js');
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: {},
        imageFileArray: commonConfig.imageFileArray,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getReadyData(options.id);
    },

    getReadyData(noticeId) {
        app.HTTP({
            url: 'wxtapi/msg/getNoticeInfo',
            method: 'GET',
            data: {
                noticeId
            }
        }).then(res => {
            const data = res.result;
            this.setData({
                dataList: data
            });
        });
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

    },
    /**
     * 撤回
     */
    onRecall() {
        const data = {
            noticeId: this.data.dataList.id
        };
        app.HTTP({
            url: 'wxtapi/msg/recallNotice',
            method: 'GET',
            title: '撤回中。。。',
            data: data
        }).then(res => {
            wx.showToast({
                icon: 'success',
                title: '已成功撤回'
            });
            wx.navigateBack({
                delta: 1
            });
        });
    },
    /**
     * 删除
     */
    deleteNotice(){
        let _this = this;
        wx.showModal({
            title: '删除提示',
            content: '是否删除当前通知',
            showCancel: true,
            success: function (res) {
                app.HTTP({
                    url: 'wxtapi/msg/delNotice',
                    method: 'GET',
                    title: '删除中。。。',
                    data: {
                        noticeId: _this.data.dataList.id
                    }
                }).then(res => {
                    wx.showToast({
                        icon: 'success',
                        title: '删除成功'
                    });
                    wx.navigateBack({
                        delta: 1
                    });
                });
            }
        });
    },
    editNotice(){
        const pushData=this.data.dataList;
        wx.navigateTo({
            url:'/pages/edit_notice/index',
            success(res) {
                res.eventChannel.emit('acceptDataFromOpenerPage', { data: pushData })
            }
        })
    }
});