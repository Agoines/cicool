const app = getApp();
// 手指位置
let pageX = 0;
// 移动距离
let distance = 0;
// 是否是移动
let isMove = false;

function login(
    complete
) {
    wx.login({
        success: function (res) {
            //发送请求
            wx.request({
                method: "POST",
                url: app.globalData.domain + '/user/login', data: {
                    code: res.code
                },
                header: {
                    'content-type': 'application/json',
                },
                // 调用成功口
                success: (r) => {
                    const res = r.data
                    const data = res.data
                    // 判断返回值
                    if (res.errcode === 0) {
                        // 存储对应的 信息
                        try {
                            wx.setStorageSync('userId', data.id)
                            wx.setStorageSync('token', data.token)
                            wx.setStorageSync('bookId', data.bookId)
                        } catch (e) {
                            console.log(e)
                        }
                        app.globalData.isLogin = true
                    } else {
                        wx.showToast({
                            title: '错误代码：' + res.errcode + ' ' + res.errmsg,
                            success: () => {
                            }
                        })
                    }
                },
                complete: complete
            })
        }
    })
}


Page({
    data: {
        wordBookName: '',
    }, onLoad: function () {
        login(
            () => {
                const isLogin = app.globalData.isLogin
                if (isLogin) {
                    if (wx.getStorageSync('bookId') === -1) {
                        this.setData({wordBookName: "未选择词书"})
                    }
                } else {
                    this.setData({wordBookName: "请点击登陆"})
                }
            }
        )

        let height = wx.getSystemInfoSync().windowHeight;
        let width = wx.getSystemInfoSync().windowWidth;
        const imagePath = "https://source.unsplash.com/random/" + width + "x" + height;
        this.setData({
            imageUri: imagePath
        })

    },


    onShow() {

        wx.request({
            method: "POST",
            url: app.globalData.domain + '/statistic/getSingleWBData',
            data: {
                "userId": wx.getStorageSync('userId'),
                "bookId": wx.getStorageSync('bookId')
            },
            header: {
                'content-type': 'application/json',
                'cookie': app.getToken()
            },
            success: (res) => {
                this.setData({wordBookName: res.data.book.name})
            }
        })
    },

    /**
     * 手指初始化位置
     * @param event
     */
    touchStart: (event) => {
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
    touchEnd: (event) => {
        if (isMove) {
            distance = event.changedTouches[0].pageX - pageX
            if (distance > 30) {
                wx.navigateTo({
                    url: "../search/search"
                }).then(r => console.log(r))
            }
            pageX = 0
        }
    },

    moveChange: () => {
        wx.navigateTo({
            url: "../word/word", success: () => {

            }
        })
    }, selectWordBook: function () {
        wx.navigateTo({
            url: "../setting/setting", success: () => {

            }
        })
    },
},)
