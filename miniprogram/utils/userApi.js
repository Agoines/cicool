const domain = 'https://apitest.nijigen.fun/cicool'

const login = (code) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/user/login',

            data: {
                code: code
            },

            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

const getUserInfo = (userId, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/user/getUserInfo',

            data: {
                userId: userId
            },

            header: {
                Cookie: token
            },

            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

const changeUserNickname = (token, userId, nickName) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/user/changeUserInfo',

            data: {
                userId: userId,
                nickName: nickName,
            },

            header: {
                Cookie: token
            },

            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

const changeUserAvatarPic = (token, userId, avatarPic) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/user/changeUserInfo',

            data: {
                userId: userId,
                avatarPic: avatarPic
            },

            header: {
                Cookie: token
            },

            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

const uploadAvatar = (userId, filePath, token) => {
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: domain + '/user/uploadAvatar',
            filePath: filePath,

            name: 'file',

            header: {
                Cookie: token,
                "X-User-Id": userId
            },

            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

const changeWordBook = (userId, bookId, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/user/changeWordBook',

            data: {
                userId: userId,
                bookId: bookId
            },

            header: {
                Cookie: token
            },

            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

const changeUserSetting = (userId, token, settings) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/user/changeWordBook',

            data: {
                userId: userId,
                settings: settings
            },

            header: {
                Cookie: token
            },

            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
module.exports = {
    login: login,
    getUserInfo: getUserInfo,
    changeUserNickname: changeUserNickname,
    changeUserAvatarPic: changeUserAvatarPic,
    uploadAvatar: uploadAvatar,
    changeWordBook: changeWordBook,
    changeUserSetting: changeUserSetting
}
