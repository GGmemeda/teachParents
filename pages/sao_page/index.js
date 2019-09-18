// pages/sao_page/index.js

let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {},

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
    /**
     * 开启二维码扫描
     */
    onScan: function () {
        wx.scanCode({
            onlyFromCamera: true,
            success(res) {
                var url = res.result;
                const token = wx.getStorageSync('token');
                console.log(token);
                wx.request({
                    url: `${url}&token=${token}&type=/fileList`,
                    method: "GET",
                    success(res) {
                        if (res.data && res.data.status == 200) {
                            wx.navigateTo({
                                url: "/pages/sao_finish/index",
                            });
                        }
                    },
                    fail(err) {
                        console.log(err);
                        wx.showToast({
                            title: err.msg,
                            icon: 'fail',
                        });
                    }
                });
            }
        });
    }
});