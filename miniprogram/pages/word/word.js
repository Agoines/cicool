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
            word: wordData.wordList[0].word,
            phonetic: wordData.wordList[0].phonetic
        }
    )

    let translation = wordData.wordList[0].translation
    // 生成零到四的随机数
    right = Math.floor(Math.random() * 4)
    tempList[right] = translation
    for (let i = 0; i < 4;) {
        if (i === right) {
            i++;
            continue;
        }

        const sampleList = wordData.wordList[0].sampleList
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
        afterChange: false,
        wordBg: [{textColor: "#202124", background: "#FFFFFF"},
            {textColor: "#202124", background: "#FFFFFF"},
            {textColor: "#202124", background: "#FFFFFF"},
            {textColor: "#202124", background: "#FFFFFF"}],
    },
    onLoad: async function (options) {
        wordData = await getData(options.type);
        if (options.type === 'review' && wordData.wordList.length === 0) {
            this.setData({
                isListEmpty: true
            })

            return
        }
        getWord(this, wordData);
    },


    refresh(event) {
        if (isLoading || this.data.afterChange) return;
        console.log(event.currentTarget.dataset.viewId)
        let temp = this.data.wordBg
        if (event.currentTarget.dataset.viewId !== right) {
            temp[event.currentTarget.dataset.viewId].background = "#FF4D3C"
            temp[event.currentTarget.dataset.viewId].textColor = "#FFFFFF"
            wordData.wordList.push(wordData.wordList.shift());
        } else {
            wordData.wordList.shift();
        }
        temp[right].background = "#07C160"
        temp[right].textColor = "#FFFFFF"
        this.setData({
                afterChange: true,
                wordBg: temp
            }
        )
    },

    next() {
        if (wordData.wordList.length > 0) {
            this.setData({
                afterChange: false,
                wordBg: [{textColor: "#202124", background: "#FFFFFF"},
                    {textColor: "#202124", background: "#FFFFFF"},
                    {textColor: "#202124", background: "#FFFFFF"},
                    {textColor: "#202124", background: "#FFFFFF"}],
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
