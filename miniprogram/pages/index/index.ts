// 手指位置
let pageX = 0;
// 移动距离
let distance = 0;
// 是否是移动
let isMove = false;
Page({
        data: {
            wordBookName: '还未选择图书',
        },
        onLoad: function () {
            let height = wx.getSystemInfoSync().windowHeight;
            let width = wx.getSystemInfoSync().windowWidth;
            const imagePath = "https://source.unsplash.com/random/" + width + "x" + height;
            this.setData({
                imageUri: imagePath
            })
            const isLogin = getApp().globalData;
            if (isLogin) {
                this.data.wordBookName = ""
            } else {
                this.data.wordBookName = "请点击登陆"
            }
        },
        /**
         * 手指初始化位置
         * @param event
         */
        touchStart: (event: TouchEvent) => {
            // 三指手势是截屏，所以判断是否小于三个手指
            isMove = event.changedTouches.length < 3 && event.changedTouches.length > 0;
            if (isMove) {
                // 获取手指初始位置
                pageX = event.changedTouches[0].pageX
            }
        },
        /**
         * 手指最终位置
         * @param event
         */
        touchEnd: (event: TouchEvent) => {
            if (isMove) {
                distance = event.changedTouches[0].pageX - pageX
                if (distance > 30) {
                    wx.navigateTo({
                        url: "../search/search"
                    }).then(r =>
                        console.log(r))
                }
                pageX = 0
            }
        },

        moveChange: () => {
            wx.navigateTo({
                url: "../word/word"
            }).then(e =>
                console.log(e)
            )
        },
        selectWordBook: function () {
            wx.navigateTo({
                url: "../setting/setting"
            }).then(r =>
                console.log(r))
        },
    },
)
