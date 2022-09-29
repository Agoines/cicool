const wordApi = require("../../../utils/wordApi.js")
const app = getApp()
Page({
    data: {
        bookList: [],
        word: '',
        definition: '',
        exchange: [],
        phonetic: ''
    },
    async onLoad(options) {
        let wordId = options.wordId
        let wordDetail = await wordApi.getWordDetail(
            app.getUserId(),
            wordId,
            app.getToken()
        )
        console.log(wordDetail)
        let exchange = wordDetail.word.exchange
        let translation = wordDetail.word.translation
        if (exchange !== '') {
            console.log(exchange)
            exchange = exchange.split('/')
            for (let i = 0; i < exchange.length; i++) {
                const exchangeName = exchange[i].substring(0, 1)
                switch (exchangeName) {
                    case 'p':
                        exchange[i] = '过去式：' + exchange[i].substring(2)
                        break
                    case'd':
                        exchange[i] = '过去分词：' + exchange[i].substring(2)
                        break
                    case 'i':
                        exchange[i] = '现在分词：' + exchange[i].substring(2)
                        break
                    case'3':
                        exchange[i] = '第三人称单数：' + exchange[i].substring(2)
                        break
                    case'r':
                        exchange[i] = '比较级：' + exchange[i].substring(2)
                        break
                    case't':
                        exchange[i] = '最高级：' + exchange[i].substring(2)
                        break
                    case's':
                        exchange[i] = '复数形式：' + exchange[i].substring(2)
                        break
                    case'0':
                        exchange[i] = '原型：' + exchange[i].substring(2)
                        break
                    case'1':
                        exchange[i] = '原型的什么变体：' + exchange[i].substring(2)
                        break
                }
            }
        } else {
            exchange = []
        }

        this.setData({
            bookList: wordDetail.bookList,
            word: wordDetail.word.word,
            definition: wordDetail.word.definition,
            exchange: exchange,
            phonetic: wordDetail.word.phonetic,
            translation: translation
        })
        console.log(wordDetail)
    }
});
