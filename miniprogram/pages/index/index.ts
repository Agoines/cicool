const RGBaster = require('rgbaster')
Page({

    onLoad: function () {


        let height = wx.getSystemInfoSync().windowHeight;
        let width = wx.getSystemInfoSync().windowWidth;
        this.setData(
            {
                imageUri: "https://source.unsplash.com/random/" + width + "x" + height
            })
    },
    onShow: function () {
        const img = document.querySelector('img');

        // 或者
        // const img = 'http://example.com/image.jpg';
        RGBaster.colors(img, {
            // 调色板大小，就是提取的样本，越大越精确，同时性能越差
            paletteSize: 30,
            // 颜色排除
            exclude: ['rgb(255,255,255)', 'rgb(0,0,0)'],
            success: function (payload: { dominant: any; secondary: any; palette: any; }) {
                console.log('Dominant color:', payload.dominant);// 提取出来的主色
                console.log('Secondary color:', payload.secondary);// 次色
                console.log('Palette:', payload.palette); // 调色板
                const c = payload.dominant.match(/\d+/g);
                const grayLevel = c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114;

                let getTextColor = function () {
                    if (grayLevel >= 192)
                        return "#ffffff"
                    else
                        return "#000000"
                }

                // 若为浅色，把文字设置为黑色
                wx.setNavigationBarColor({
                        animation: {
                            duration: 300,
                            timingFunc: 'easeIn'
                        },
                        backgroundColor: "#00000000",
                        frontColor: getTextColor(),
                        fail: res => {
                            console.log('颜色判断，出现错误', res.errMsg)
                        }
                    }
                )

            }
        })
    }
})
