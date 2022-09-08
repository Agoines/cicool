const wordApi = require("../../../utils/wordApi.js")
const app = getApp()
Page({
    data: {
        bookList: [],
        word: '',
        definition: '',
        exchange: '',
        phonetic: ''
    },
    async onLoad(options) {
        let wordId = options.wordId
        let wordDetail = await wordApi.getWordDetail(
            app.getUserId(),
            wordId,
            app.getToken()
        )

        this.setData({
            bookList: wordDetail.bookList,
            word: wordDetail.word.word,
            definition: wordDetail.word.definition,
            exchange: wordDetail.word.exchange,
            phonetic: wordDetail.word.phonetic

        })
        console.log(wordDetail)
    }
});
