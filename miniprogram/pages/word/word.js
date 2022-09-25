const wordApi = require("../../utils/wordApi.js");
const app = getApp();
let wordData;
let wordList;
let right;
let tempList = ["", "", "", ""]
let isLoading = true
let chooseNum = 0
let wordType;
let wordNum = 0;

let page;
let innerAudioContext = wx.createInnerAudioContext({useWebAudioImplement: true});

async function getData() {
    console.log("bookId 是", page.data.bookId)
    switch (wordType) {
        case 'learn':
            page.setData({
                isLearn: true
            })
            return await wordApi.getLearningData(
                app.getToken(),
                app.getUserId(),
                page.data.bookId,
                parseInt(page.data.learnNum, 10)
            )
        case 'review':
            page.setData({
                isLearn: false
            })
            return await wordApi.getReviewData(
                app.getToken(),
                app.getUserId(),
                page.data.bookId,
                parseInt(page.data.reviewNum, 10)
            )
    }
}

function getWord() {

    page.setData({
            word: wordList[0].word,
            phonetic: wordList[0].phonetic
        }
    )
    let pronunciation = page.data.pronunciation + 1
    let source = page.data.source
    // 设置读音
    innerAudioContext.src = wordApi.getWordVoiceUrl(wordList[0].word, source, pronunciation)
    console.log(innerAudioContext.src)
    // 自动发声
    if (page.data.pronounce) innerAudioContext.play()

    page.setData({
            inNotebook: wordList[0].inNotebook
        }
    )

    let translation = wordList[0].translation
    // 生成零到四的随机数
    right = Math.floor(Math.random() * 4)
    tempList[right] = translation
    for (let i = 0; i < 4;) {
        if (i === right) {
            i++;
            continue;
        }

        const {sampleList} = wordList[0]
        let x = sampleList[Math.floor(Math.random() * sampleList.length)].translation
        if (tempList.indexOf(x) === -1) {
            tempList[i] = x
            i++;
        }
    }
    if (wordList[0].repeatTimes === undefined) {
        wordList[0].repeatTimes = 0
    }

    page.setData({
        wordTranslation: tempList
    })

    console.log("第几次", wordList[0].repeatTimes)

    let repeatTimes = [false, false, false]
    repeatTimes[wordList[0].repeatTimes] = true

    page.setData({
        repeatTimes: repeatTimes
    })
    console.log(page.data.repeatTimes)
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
        noteBookColor: "#4D5E80",
        wordBg: [{textColor: "#202124", background: "#FFFFFF"},
            {textColor: "#202124", background: "#FFFFFF"},
            {textColor: "#202124", background: "#FFFFFF"},
            {textColor: "#202124", background: "#FFFFFF"}],
    },

    onLoad: async function (options) {
        wordNum = 0;
        page = this
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('setData', async function (data) {
            console.log(data.data)
            page.setData({
                pronunciation: data.data.pronunciation,
                pronounce: data.data.pronounce,
                source: data.data.source,
                bookId: data.data.bookId,
                learnNum: data.data.learnNum,
                reviewNum: data.data.reviewNum
            })

            wordType = options.type
            await getData().then(
                function (data) {
                    wordData = data
                    wordList = wordData.wordList
                    if (wordList.length === 0) {
                        page.setData({
                            isListEmpty: true
                        })
                        return
                    }
                    getWord(wordData);
                }
            );
        })
    },

    refresh(event) {
        if (isLoading || this.data.afterChange) return;
        this.setData({
            isChoose: true
        })
        chooseNum = event.currentTarget.dataset.viewId
        this.setData({
            afterChange: false,
            wordBg: [{textColor: "#202124", background: "#FFFFFF"},
                {textColor: "#202124", background: "#FFFFFF"},
                {textColor: "#202124", background: "#FFFFFF"},
                {textColor: "#202124", background: "#FFFFFF"}]
        })

        let temp = this.data.wordBg
        temp[chooseNum].background = "#202124"
        temp[chooseNum].textColor = "#FFFFFF"
        this.setData({
                wordBg: temp
            }
        )

    },

    // 播放
    playVoice() {
        innerAudioContext.stop()
        innerAudioContext.play()
    },

    async next() {

        if (this.data.isChoose) {
            if (!this.data.afterChange) {
                let temp = this.data.wordBg
                if (chooseNum !== right) {
                    temp[chooseNum].background = "#FF4D3C"
                    temp[chooseNum].textColor = "#FFFFFF"
                    wordList.push(wordList.shift());
                } else {
                    wordList[0].repeatTimes += 1
                    await wordApi.addLearningRecord(
                        app.getUserId(),
                        [{
                            wordId: wordList[0].wordId,
                            repeatTimes: wordList[0].repeatTimes,
                            completed: tempList.repeatTimes === 3
                        }],
                        app.getToken(),
                    )

                    if (tempList.repeatTimes === 3) {
                        wordNum++;
                        wordList.shift();
                    } else {
                        wordList.push(wordList.shift());
                    }
                }
                temp[right].background = "#07C160"
                temp[right].textColor = "#FFFFFF"
                this.setData({
                        afterChange: true,
                        wordBg: temp
                    }
                )
            } else {
                if (wordList.length > 0) {
                    this.setData({
                        isChoose: false,
                        afterChange: false,
                        wordBg: [{textColor: "#202124", background: "#FFFFFF"},
                            {textColor: "#202124", background: "#FFFFFF"},
                            {textColor: "#202124", background: "#FFFFFF"},
                            {textColor: "#202124", background: "#FFFFFF"}],
                    })
                    getWord(wordData)
                    return
                }
                wx.navigateTo({
                    url: '../finish/finish?wordType=' + wordType + '&&wordNum=' + wordNum,
                    success: {}
                })
            }
        }


    },

    setNoteBook() {
        wordList[0].inNotebook = !wordList[0].inNotebook
        page.setData({
                inNotebook: wordList[0].inNotebook
            }
        )

        wordApi.toggleAddToNB(
            app.getUserId(),
            wordList[0].wordId,
            wordList[0].inNotebook,
            app.getToken()
        )
    },

    back() {
        wx.navigateBack({
            delta: 1,
            success: {}
        })
    }
});
