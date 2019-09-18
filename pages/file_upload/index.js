// pages/file_upload/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fileArray: [],
        imageArray: {
            docx: '/images/upload_file/word.png',
            ppt: '/images/upload_file/ppt.png',
            pptx: '/images/upload_file/ppt.png',
            pdf: '/images/upload_file/pdf.png',
            excel: '/images/upload_file/excel.png',
            xlsx: '/images/upload_file/excel.png',
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
        this.getDocumentList();
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
        this.getDocumentList();
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
     * 获取数据
     */
    getDocumentList:function() {
        app.HTTP({
            url: '/wxtapi/document',
            method: "GET",
            isLoading: false,
        }).then(res => {
            // // 停止下拉动作
            wx.stopPullDownRefresh();
            if (res.result.length) { // 没有用户
                const fileArray = res.result;
                this.setData({
                    fileArray
                });
            }
        });
    },


    toUploadPage: function () {
        console.log('进来了');
        wx.navigateTo({
            url: '/pages/sao_page/index'
        });
    }
});