const domain = 'https://apitest.nijigen.fun/cicool'

let isLogin = false
let token = ''
let userId = ''
let bookId = ''

let nickname = ''
let avatarPic = ''

let getAvatarPic = false
let getNickname = false

function getToken() {
    return 'TOKEN=' + token
}

function getUserId() {
    return userId
}

App({
    // 对应的例名
    globalData: {},

    onLaunch: function () {
        wx.login({
                success: function (res) {
                    //发送请求
                    wx.request({
                        method: "POST",
                        url: domain + '/user/login',

                        data: {
                            code: res.code
                        },

                        header: {
                            'content-type': 'application/json',
                        },
                        // 调用成功口
                        success(r) {
                            const res = r.data
                            const data = res.data
                            console.log(data)
                            // 判断返回值
                            if (res.errcode === 0) {
                                // 存储对应的 信息
                                try {
                                    userId = data.id
                                    token = data.token
                                    bookId = data.bookId
                                    nickname = data.nickName
                                    avatarPic = data.avatarPic
                                } catch (e) {
                                    console.log(e)
                                }
                                isLogin = true
                            }
                        },
                    })
                }
            }
        )
    },

    getNickname() {
        console.log('getNickname')
        if (nickname === '') {
            return '词酷用户#8848'
        } else {
            return nickname
        }
    },

    getAvatarPic() {
        console.log('getAvatarPic')
        if (avatarPic === '') {
            return "https://api.multiavatar.com/" + getUserId() + "svg"
        } else {
            return avatarPic
        }
    }
})

