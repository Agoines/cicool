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

const changeUserInfo = (userId, nickName, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/user/changeUserInfo',

            data: {
                userId: userId,
                nickName: nickName
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

const getAvatar = (userId, token) => {
    //
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

module.exports = {
    login: login,
    getUserInfo: getUserInfo,
    changeUserInfo: changeUserInfo,
    uploadAvatar: uploadAvatar,
    getAvatar: getAvatar,
    changeWordBook: changeWordBook
}
