// pages/file_upload/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fileArray: [{
            id: '23',
            name: '名字1',
            size: '100kb',
            teacher: '涨雪峰',
            updateTime: '2019/10/11 12:30:22',
            type: 'word'
        }, {
            id: '23',
            name: '名字1',
            size: '100kb',
            teacher: '涨雪峰',
            updateTime: '2019/10/11 12:30:22',
            type: 'word'
        }, {
            id: '23',
            name: '名字1',
            size: '100kb',
            teacher: '涨雪峰',
            updateTime: '2019/10/11 12:30:22',
            type: 'word'
        }, {
            id: '23',
            name: '名字1',
            size: '100kb',
            teacher: '涨雪峰',
            updateTime: '2019/10/11 12:30:22',
            type: 'word'
        }, {
            id: '23',
            name: '名字1',
            size: '100kb',
            teacher: '涨雪峰',
            updateTime: '2019/10/11 12:30:22',
            type: 'word'
        }, {
            id: '23',
            name: '名字1',
            size: '100kb',
            teacher: '涨雪峰',
            updateTime: '2019/10/11 12:30:22',
            type: 'word'
        }, {
            id: '23',
            name: '名字1',
            size: '100kb',
            teacher: '涨雪峰',
            updateTime: '2019/10/11 12:30:22',
            type: 'word'
        }, {
            id: '23',
            name: '名字1',
            size: '100kb',
            teacher: '涨雪峰',
            updateTime: '2019/10/11 12:30:22',
            type: 'word'
        }, {
            id: '23',
            name: '名字1',
            size: '100kb',
            teacher: '涨雪峰',
            updateTime: '2019/10/11 12:30:22',
            type: 'word'
        }, {
            id: '23',
            name: '名字1',
            size: '100kb',
            teacher: '涨雪峰',
            updateTime: '2019/10/11 12:30:22',
            type: 'word'
        }, {
            id: '23',
            name: '名字1',
            size: '100kb',
            teacher: '涨雪峰',
            updateTime: '2019/10/11 12:30:22',
            type: 'word'
        }, {
            id: '23',
            name: '名字1',
            size: '100kb',
            teacher: '涨雪峰',
            updateTime: '2019/10/11 12:30:22',
            type: 'word'
        }],
        imageArray: {
            word: '/images/upload_file/word.png',
            ppt: '/images/upload_file/ppt.png',
            pdf: '/images/upload_file/pdf.png',
            excel: '/images/upload_file/excel.png',
        }
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

    },
    toUploadPage: function () {
        console.log('进来了');
        wx.navigateTo({
            url: '/pages/sao_page/index'
        });
    }
});