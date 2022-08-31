const domain = 'https://apitest.nijigen.fun/cicool'

const getWBLearnData = (userId, bookId, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getWBLearnData',

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

const getAllWBData = (userId, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getAllWBData',

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

const getSingleWBData = (token, userId, bookId) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getSingleWBData',

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

const getAllLearnData = (userId, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getAllLearnData',

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

const getTodayLearnData = (userId, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getTodayLearnData',

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

const getDailySum = (userId, size = 20, skip = 0, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getDailySum',

            data: {
                userId: userId,
                size: size,
                skip: skip
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

const getNoteBookWord = (userId, size = 20, skip = 0, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getNoteBookWord',

            data: {
                userId: userId,
                size: size,
                skip: skip
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

const getBkLearnedWord = (userId, bookId, size = 20, skip = 0, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getBkLearnedWord',

            data: {
                userId: userId,
                bookId: bookId,
                size: size,
                skip: skip
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

const getBkMasteredWord = (userId, bookId, size = 20, skip = 0, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getBkMasteredWord',

            data: {
                userId: userId,
                bookId: bookId,
                size: size,
                skip: skip
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

const getBkUnlearnedWord = (userId, bookId, size = 20, skip = 0, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getBkUnlearnedWord',

            data: {
                userId: userId,
                bookId: bookId,
                size: size,
                skip: skip
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

const getBkWord = (userId, bookId, size = 20, skip = 0, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getBkWord',

            data: {
                userId: userId,
                bookId: bookId,
                size: size,
                skip: skip
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

const getLearnedWord = (userId, size = 20, skip = 0, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getLearnedWord',

            data: {
                userId: userId,
                size: size,
                skip: skip
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

const getMasteredWord = (userId, size = 20, skip = 0, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getMasteredWord',

            data: {
                userId: userId,
                size: size,
                skip: skip
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

const getReviewWord = (userId, size = 20, skip = 0, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getReviewWord',

            data: {
                userId: userId,
                size: size,
                skip: skip
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

const getTodayLearnWord = (userId, size = 20, skip = 0, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getTodayLearnWord',

            data: {
                userId: userId,
                size: size,
                skip: skip
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

const getTodayReviewWord = (userId, size = 20, skip = 0, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/statistic/getTodayReviewWord',

            data: {
                userId: userId,
                size: size,
                skip: skip
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
    getWBLearnData: getWBLearnData,
    getAllWBData: getAllWBData,
    getSingleWBData: getSingleWBData,
    getAllLearnData: getAllLearnData,
    getTodayLearnData: getTodayLearnData,
    getDailySum: getDailySum,
    getNoteBookWord: getNoteBookWord,
    getBkLearnedWord: getBkLearnedWord,
    getBkMasteredWord: getBkMasteredWord,
    getBkUnlearnedWord: getBkUnlearnedWord,
    getBkWord: getBkWord,
    getLearnedWord: getLearnedWord,
    getMasteredWord: getMasteredWord,
    getReviewWord: getReviewWord,
    getTodayLearnWord: getTodayLearnWord,
    getTodayReviewWord: getTodayReviewWord
}
