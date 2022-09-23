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

const toggleAddToNB = (userId, wordId, add, token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/word/toggleAddToNB',

            data: {
                userId: userId,
                wordId: wordId,
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

const addLearningRecord = (userId, record, token, repeatTimes, completed = false) => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: domain + '/word/addLearningRecord',

            data: {
                userId: userId,
                record: record,
                completed: completed,
                repeatTimes: repeatTimes
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



// 用于生成单词音频链接
// 有道词典: http://dict.youdao.com/dictvoice?type={1:英式;2:美式}&audio={word}
// gstatic oxford: https://ssl.gstatic.com/dictionary/static/sounds/oxford/{word}--_gb_1.mp3
const getWordVoiceUrl = (word, source = 0, type = 2) => {
    let url = ''
    if (source === '0') {
        url = `https://dict.youdao.com/dictvoice?type=${type}&audio=${word}`
    } else if (source === '1') {
        url = `https://ssl.gstatic.com/dictionary/static/sounds/oxford/${word}--_gb_1.mp3`
    }
    return url
}

module.exports = {
    getSearchResult: getSearchResult,
    getWordDetail: getWordDetail,
    getBasicLearningData: getBasicLearningData,
    getLearningData: getLearningData,
    getReviewData: getReviewData,
    toggleAddToNB: toggleAddToNB,
    addLearningRecord: addLearningRecord,
    getWordVoiceUrl: getWordVoiceUrl
}

