import qs from "qs"
import crypto from "@/utils/crypto"

export default {
  play(list) {

    var ids = [];
    list.forEach((obj) => {

      ids.push(obj.id);

    });

    const cryptoreq = crypto({
      "ids": "[" + ids.join(',') + "]",
      "br": 999000,
      "csrf_token": ""
    });
    wx.request({
        url: 'https://music.163.com/weapi/song/enhance/player/url',
        method:"POST",
        data:qs.stringify({"params": cryptoreq.params, "encSecKey": cryptoreq.encSecKey}),
        header: {
          'Accept': '*/*',
          'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
          'Connection': 'keep-alive',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Referer': 'http://music.163.com',
          'Cookie': 'appver=2.0.2',
          'Host': 'music.163.com',
          // 'Cookie': cookie,
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',
        },
        success: function(m) {
          console.log(m);
          m.data.data.forEach((obj) => {

            let temp = list.find((value) => {

              return value.id == obj.id;
            })
            temp.url = obj.url;
            temp.artists = temp.artists || temp.ar;
            temp.album = temp.album || temp.al;
          })
          let data = list[0];

          let backgroundAudioManager = wx.getBackgroundAudioManager();

          backgroundAudioManager.title = '此时此刻'
          backgroundAudioManager.epname = '此时此刻'
          backgroundAudioManager.singer = '许巍'
          backgroundAudioManager.coverImgUrl = data.coverImgUrl;
          backgroundAudioManager.src = data.url;
        }
      });

}
}
