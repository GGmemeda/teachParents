// pages/create_notice/index.js
let commonConfig = require('../../utils/commonConfig.js');
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        textareaVal: '',
        titleVal: '',
        imageFilePaths: [],
        imageFiles: [],
        imageFileArray: commonConfig.imageFileArray,
        chooseFiles: [],
        adviceImgList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const _this=this;
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('acceptDataFromOpenerPage', function(data) {
            const currentData=data.data;
            _this.pageType='edit';
            console.log(data);
            app.CHOOSE_FILE_DATA=currentData.urlFile;
            const imageArray=[];
            currentData.urlPic.map(item=>{
                imageArray.push({url:item})
            });
            _this.setData({
                titleVal:currentData.title,
                textareaVal:currentData.content,
                adviceImgList:imageArray,
                chooseFiles:currentData.urlFile
            })
        })
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
        if (app.CHOOSE_FILE_DATA) {
            this.setData({
                chooseFiles: app.CHOOSE_FILE_DATA
            });
        }
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
    onTextareaChange: function (e) {
        this.setData({
            textareaVal: e.detail.value
        });
    },
    onTitleChange: function (e) {
        this.setData({
            titleVal: e.detail.value
        });
    },
    /**
     * 图片选择
     */
    onChoosePic: function () {
        const _this = this;
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths;
                const tempFiles = res.tempFiles;
                let base64 = null;
                let temp = res.tempFilePaths.map((item, iindex) => {
                    return {
                        url: item,
                        base64: wx.getFileSystemManager().readFileSync(res.tempFilePaths[iindex], 'base64')
                    };
                });
                let newarr = _this.data.adviceImgList.concat(temp);
                if (newarr.length > 9) {
                    newarr.splice(9, newarr.length - 9);
                }
                _this.setData({
                    adviceImgList: newarr
                });
            }
        });
    },
    deleteFile: function (e) {
        let _this = this;
        wx.showModal({
            title: '删除提示',
            content: '是否删除当前选中图片.',
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
    toChooseFile: function () {
        wx.navigateTo({
            url: "/pages/choose_file/index"
        });
    },
    deleteChooseFile: function (e) {
        let _this = this;
        wx.showModal({
            title: '删除提示',
            content: '是否删除当前选中文件.',
            showCancel: true,
            success: function (res) {
                if (res.confirm) {
                    _this.data.chooseFiles.splice(e.currentTarget.dataset.index, 1);
                    app.CHOOSE_FILE_DATA = _this.data.chooseFiles;
                    _this.setData({
                        chooseFiles: _this.data.chooseFiles
                    });
                }
            }
        });
    },
    /**
     * 发布通知
     */
    createNotice() {
        if (!this.data.titleVal||!this.data.textareaVal) {
            return;
        }
        const urlFile = [];
        let imgLen = this.data.adviceImgList.length;
        const _this=this;
        let loading = 0;
        let imgStr = [];
        const data = {
            title: this.data.titleVal,
            content: this.data.textareaVal
        };
        if (this.data.chooseFiles.length > 0) {
            this.data.chooseFiles.map(item => {
                urlFile.push(item.id);
            });
            data.urlFile = urlFile.join(';');
        }
        if (this.data.titleVal&&this.data.textareaVal) {
            console.log('title和content都有了');
            console.log(imgLen>0);
            if(imgLen>0){
                wx.showLoading({
                    title: "图片上传中...",
                    mask: true,
                });
                const upImages=[];
                this.data.adviceImgList.map(item=>{
                    if(item.base64){
                        upImages.push(item)
                    }else{
                        imgStr.push(item.url);
                    }
                });
                if(upImages.length>0){
                    for (let i = 0; i < upImages; i++) {
                        app.uploadImg("data:image/png;base64," + this.data.adviceImgList[i].base64, function (src) {
                            imgStr.push(src);
                            loading++;
                            if (loading >= upImages.length) {
                                wx.hideLoading();
                                data.urlPic=imgStr.join(';');
                                console.log(data);
                                _this.noticeApi(data)
                            }
                        });
                    }
                }else{
                    wx.hideLoading();
                    data.urlPic=imgStr.join(';');
                    console.log(data);
                    _this.noticeApi(data)
                }

            }else{
                this.noticeApi(data);
            }

        } else {
            wx.showToast({
                title: '数据格式不正确',
                icon: "none"
            });
        }

    },
    noticeApi(data) {
        console.log(data);
        app.HTTP({
            url: 'wxtapi/msg/editNotice',
            method: 'Post',
            data: data
        }).then(res => {
            console.log(res);
            wx.showToast({
                title: '通知编辑成功',
                icon: "success",
                duration: 1000
            })
            setTimeout(()=>{
                wx.redirectTo({
                   url:'/pages/class_tz/index'
                })
            },1500)
        });
    }
});