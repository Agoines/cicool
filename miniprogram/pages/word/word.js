const wordApi = require("../../utils/wordApi.js");
const app = getApp();
let wordData;
let right;
let tempList = ["", "", "", ""]
let isLoading = true

function getData(type) {
    switch (type) {
        case 'learn':
            return wordApi.getLearningData(
                app.getToken(),
                app.getUserId(),
                app.getBookId()
            )
        case 'review':
            return wordApi.getReviewData(
                app.getToken(),
                app.getUserId(),
                app.getBookId()
            )
    }
}

function getWord($this, wordData) {
    $this.setData({
            word: wordData.wordList[$this.data.temp].word,
            phonetic: wordData.wordList[$this.data.temp].phonetic
        }
    )
    console.log($this.data.word)
    let translation = wordData.wordList[$this.data.temp].translation
    // 生成零到四的随机数
    right = Math.floor(Math.random() * 4)
    tempList[right] = translation
    for (let i = 0; i < 4;) {
        if (i === right) {
            i++;
            continue;
        }

        const sampleList = wordData.wordList[$this.data.temp].sampleList
        let x = sampleList[Math.floor(Math.random() * sampleList.length)].translation
        if (tempList.indexOf(x) === -1) {
            tempList[i] = x
            i++;
        }
    }
    $this.setData({
        wordTranslation: tempList
    })
    isLoading = false
}

Page({
    data: {
        word: "",
        phonetic: "",
        wordTranslation: ["", "", "", ""],
        temp: 0,
        isListEmpty: false,
        dialogButton: [{text: '确定'}],
    },
    onLoad: async function (options) {
        wordData = await getData(options.type);
        console.log(wordData)
        if (options.type === 'review' && wordData.wordList.length === 0) {
            this.setData({
                isListEmpty: true
            })

            return
        }
        console.log(wordData)
        getWord(this, wordData);
    },


    refresh(event) {
        if (isLoading) return;
        console.log(event.currentTarget.dataset.viewId)
        if (event.currentTarget.dataset.viewId === right) {
            console.log("正确的，中肯的")
        }


        let temp = this.data.temp + 1
        if (temp < wordData.wordList.length) {
            this.setData({
                temp: temp
            })
            getWord(this, wordData)
            return
        }


        wx.navigateTo({
            url: '../finish/finish',
        })


    },
    back() {
        wx.navigateBack()
    }
});
