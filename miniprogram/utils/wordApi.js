const domain = 'https://apitest.nijigen.fun/cicool'

const getSearchResult = (userId, keyword, token, getLemma = true, size = 20, skip = 0) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/word/getSearchResult',

            data: {
                userId: userId,
                keyword: keyword,
                getLemma: getLemma,
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

const getWordDetail = (userId, wordId, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/word/getWordDetail',

            data: {
                userId: userId,
                wordId: wordId
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

const getBasicLearningData = (userId, wordBookId, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/word/getBasicLearningData',

            data: {
                userId: userId,
                wordBookId: wordBookId
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

const getLearningData = (token, userId, wordBookId, size = 10, sample = true) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/word/getLearningData',

            data: {
                userId: userId,
                wordBookId: wordBookId,
                size: size,
                sample: sample
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

const getReviewData = (token, userId, wordBookId, size = 10, sample = true) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/word/getReviewData',

            data: {
                userId: userId,
                wordBookId: wordBookId,
                size: size,
                sample: sample
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

const toggleAddToNB = (userId, wordBookId, add, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/word/toggleAddToNB',

            data: {
                userId: userId,
                wordBookId: wordBookId,
                add: add
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

const addLearningRecord = (userId, record, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/word/addLearningRecord',

            data: {
                userId: userId,
                record: record
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

const updateLearningRecord = (userId, record, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/word/',

            data: {
                userId: userId,
                record: record
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
    getSearchResult: getSearchResult,
    getWordDetail: getWordDetail,
    getBasicLearningData: getBasicLearningData,
    getLearningData: getLearningData,
    getReviewData: getReviewData,
    toggleAddToNB: toggleAddToNB,
    addLearningRecord: addLearningRecord,
    updateLearningRecord: updateLearningRecord,
}

