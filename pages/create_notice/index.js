// pages/create_notice/index.js
let commonConfig = require('../../utils/commonConfig.js');
console.log(commonConfig);
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
        chooseFiles: [{
            creationTime: "2019-09-18 16:35:51",
            id: "1174240614867652609",
            name: "上传文件.docx",
            path: "https://ytwl-prd.oss-cn-hangzhou.aliyuncs.com/2019-09-18/d09b3d84-af2c-42d9-ac87-35b65c44b35d.docx",
            size: "11.93KB",
            suffix: "docx",
            uid: 118,
            updateTime: "2019-09-18 16:35:51"
        }]
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
        app.CHOOSE_FILE_DATA= [{
            creationTime: "2019-09-18 16:35:51",
            id: "1174240614867652609",
            name: "上传文件.docx",
            path: "https://ytwl-prd.oss-cn-hangzhou.aliyuncs.com/2019-09-18/d09b3d84-af2c-42d9-ac87-35b65c44b35d.docx",
            size: "11.93KB",
            suffix: "docx",
            uid: 118,
            updateTime: "2019-09-18 16:35:51"
        }];
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log(app.CHOOSE_FILE_DATA);
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
                _this.setData({
                    imageFilePaths: tempFilePaths,
                    imageFiles: tempFiles
                });
            }
        });
    },
    deleteFile: function (e) {
        const index = e.currentTarget.dataset.index;
        const imageFilePaths = this.data.imageFilePaths;
        imageFilePaths.splice(index, 1);
        const imageFiles = this.data.imageFiles;
        imageFiles.splice(index, 1);
        this.setData({
            imageFilePaths,
            imageFiles
        });
    },
    toChooseFile: function () {
        wx.navigateTo({
            url: "/pages/choose_file/index"
        });
    },
    deleteChooseFile: function () {
        const index = e.currentTarget.dataset.index;
        const chooseFiles = this.data.chooseFiles;
        chooseFiles.splice(index,1);
        this.setData({chooseFiles});
        app.CHOOSE_FILE_DATA=chooseFiles;
    }
});