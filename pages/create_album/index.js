// pages/create_album/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lenText: 0, // 输入框文字长度
        val: '', // 内容
        adviceImgList: [], // 上传图片数组
        phone: ''
    },

    deleteImg(e) {
        let _this = this;
        wx.showModal({
            title: '删除提示',
            content: '是否删除当前选中图片',
            showCancel: true,
            success: function (res) {
                if (res.confirm) {
                    _this.data.adviceImgList.splice(e.currentTarget.dataset.index, 1);
                    _this.setData({
                        adviceImgList: _this.data.adviceImgList
                    });
                }
            }
        });

    },

    changephone(e) {
        this.setData({
            phone: e.detail.value
        });
    },

    // 输入框改变事件
    textChange(e) {
        this.setData({
            lenText: e.detail.value.length,
            val: e.detail.value.replace(/\s+/g, '')
        });
    },

    selectImg() {
        let _this = this;
        wx.chooseImage({
            count: 9,
            sizeType: ['original'],
            sourceType: ['album', 'camera'],
            success(res) {
                let base64 = null;
                let temp = res.tempFilePaths.map((item, iindex) => {
                    return {
                        url: item,
                        base64: wx.getFileSystemManager().readFileSync(res.tempFilePaths[iindex], 'base64')
                    };
                });
                let newarr = _this.data.adviceImgList.concat(temp);
                if (newarr.length > 5) {
                    newarr.splice(5, newarr.length - 5);
                }
                _this.setData({
                    adviceImgList: newarr
                });
            }
        });
    },

    // 改变图片
    changeImg(e) {
        let _this = this;
        let index = e.currentTarget.dataset.index; //
        wx.chooseImage({
            count: 1,
            sizeType: ['original'],
            sourceType: ['album', 'camera'],
            success(res) {
                _this.data.adviceImgList[index].url = res.tempFilePaths[0];
                _this.setData({
                    adviceImgList: _this.data.adviceImgList
                });
            }
        });
    },

    // 验证是否可以提交
    validation() {
        return this.data.val ? true : false;
    },
    createPhoto(imgStr){
        const url=imgStr?imgStr.join(";"):'';
        const data= {
            des: this.data.val,
        };
        if(url){
            data.imgStr=imgStr;
        }
        app.HTTP({
            url: 'wxtapi/photo',
            method: "post",
            title: "上传中...",
            data:data
        }).then(resut => {
            console.log(resut);
            wx.showToast({
                title: '上传成功！'
            });
            setTimeout(function () {
                wx.navigateBack({
                    delta: 1,
                });
            }, 1500);
        });
    },
    submitBack() {
        let imgLen = this.data.adviceImgList.length;
        let loading = 0;
        let imgStr = [];
        let _this = this;
        if (!this.data.val) {
            return;
        }
        // 提交
        if (this.validation()) {
            if(imgLen>0){
                wx.showLoading({
                    title: "图片上传中...",
                    mask: true,
                });
                for (let i = 0; i < imgLen; i++) {
                    app.uploadImg("data:image/png;base64," + this.data.adviceImgList[i].base64, function (src) {
                        imgStr.push(src);
                        loading++;
                        if (loading >= imgLen) {
                            wx.hideLoading();
                            _this.createPhoto(imgStr)
                        }
                    });
                }
            }else{
                    this.createPhoto();
            }

        } else {
            wx.showToast({
                title: '数据格式不正确',
                icon: "none"
            });
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

    }
});