Page({
  imageError: function(e: { detail: { errMsg: any } }) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
  }
})
