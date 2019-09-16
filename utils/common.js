/*
常用公共类库
 */


//预览图片
function previewImg(thisImg,imgs) { 
  wx.previewImage({
    current: thisImg, // 当前显示图片的http链接  
    urls: imgs  // 需要预览的图片http链接列表  
  })
}

module.exports = {
  previewImg: previewImg
}  