// pages/phone_login/index.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        password: '',
        phone: '',
        time: 60,
        timeWords: '获取验证码'
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
    /**
     * form提交
     */
    formSubmit: function (e) {
        if (!this.data.phone || !this.data.code) {
            return false;
        }
        const data = e.detail.value;
        this.login(data.code);
    },
    /**
     *
     */
    login: function (code) {
       const wxtCode=wx.getStorageSync("wxtCode");
        app.HTTP({
            url: 'wxtapi/login',
            method: 'POST',
            title: '发送验证码中...',
            data: {
                phone: this.data.phone,
                wxtCode,
                ndc:this.data.code
            }
        }).then(res => {
            wx.setStorageSync("token", res.result.token);
            wx.showToast({
                title: '手机号绑定成功!',
                icon: 'success',
            });
            setTimeout(()=>{
                wx.reLaunch({
                    url:'/pages/index/index'
                });
            },1500)
        });
    },

    getCode: function () {
        app.HTTP({
            url: 'wxtapi/login/sendCode',
            method: 'POST',
            data: {
                phone: this.data.phone
            }
        }).then(res => {
            wx.showToast({
                title: '验证码发送成功',
                icon: 'success',
            });
        });
    },
    /**
     * 计时器
     */
    timer: function (e) {
        const currentTime = this.data.time;
        if (this.data.time > 1) {
            this.setData({
                time: currentTime - 1,
                timeWords: currentTime - 1
            });
            setTimeout(() => {
                this.timer();
            }, 1000);
        } else {
            this.timeStatus = false;
            this.setData({
                time: 60,
                timeWords: '重发验证码'
            });
        }

    },
    onTimer: function () {
        console.log(this.data.phone);
        if (!this.data.phone || !this.phoneStatus) {
            wx.showToast({
                title: '请输入正确手机号',
                icon: 'none',
            });
            return;
        }
        if (!this.timeStatus) {
            this.getCode();
            this.setData({
                time: 60,
                timeWords: 60,
            });
            this.timeStatus = true;
            this.timer();
        }

    },
    inputBlur: function (e) {
        let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        this.phoneStatus = reg.test(e.detail.value);
    },
    inputChange: function (e) {
        this.setData({
            phone: e.detail.value
        });
    },
    codeChange: function (e) {
        this.setData({
            code: e.detail.value
        });
    }
});