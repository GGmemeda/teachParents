// pages/homework_list/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        homeworkList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getAllHomeworkList();
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
    getAllHomeworkList() {
        app.HTTP({
            url: 'wxtapi/homeWork/getWorkList',
            isLoading: false,
            method: "GET"
        }).then(res => {
            const homeworkList = res.result;
            homeworkList.map(item => {
                if (item.urlPic) {
                    item.urlPic = item.urlPic.split(';');
                }
            });
            this.setData({
                homeworkList
            });
        });
    },
    /**
     * 撤回
     */
    onRecall(e){
        const workId=e.currentTarget.dataset.id;
        const _this=this;
        wx.showModal({
            title: '提示',
            content: '是否撤回当前作业.',
            showCancel: true,
            success: function (res) {
                app.HTTP({
                    url: 'wxtapi/homeWork/recallWorkById',
                    isLoading: true,
                    method: "GET",
                    data:{
                        workId
                    }
                }).then(res => {
                    wx.showToast({
                        icon:'success',
                        title:'撤回成功'
                    });
                    _this.getAllHomeworkList();
                });
            }})
    },
    /**
     * 删除作业
     */
    onDelete(e){
        const workId=e.currentTarget.dataset.id;
        const _this=this;
        wx.showModal({
            title: '提示',
            content: '是否删除当前作业.',
            showCancel: true,
            success: function (res) {
                app.HTTP({
                    url: 'wxtapi/homeWork/delWorkById',
                    isLoading: true,
                    method: "GET",
                    data:{
                        workId
                    }
                }).then(res => {
                    wx.showToast({
                        icon:'success',
                        title:'删除成功'
                    });
                    _this.getAllHomeworkList();
                });
            }})
    },
    toHomeworkDetail(e){
        wx.navigateTo({
            url: `/pages/homeword_receiver_List/index?id=${e.currentTarget.dataset.id}`,
        });
    }
});