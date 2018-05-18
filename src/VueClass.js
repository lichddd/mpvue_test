import Vue from 'vue'
import qs from "qs"
import crypto from "@/utils/crypto"
let backgroundAudioManager = wx.getBackgroundAudioManager();
let music={now:{},play:{}};
Vue.mixin({

  data() {
    return {music: music,};
  }
  ,
  methods:{
    $play(list) {

      let ids = [];
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
          success: (m)=> {
            console.log(m);
            m.data.data.forEach((obj) => {

              let temp = list.find((value) => {

                return value.id == obj.id;
              })
              temp.url = obj.url;
              temp.artists = temp.artists || temp.ar;
              temp.album = temp.album || temp.al;
            })
            // Vue.set(this.music,'now',list[0]);
            music.now=list[0];


            backgroundAudioManager.title = music.now.name;
            backgroundAudioManager.epname = music.now.album.name;
            backgroundAudioManager.singer = music.now.artists[0].name;
            backgroundAudioManager.coverImgUrl = music.now.album.picUrl;
            backgroundAudioManager.src = music.now.url;
          }
        });

  },
  $seek(time){
    backgroundAudioManager.seek(time);
  }
  }

})

backgroundAudioManager.onCanplay(()=>{

});

backgroundAudioManager.onTimeUpdate(()=>{
  Vue.set(music.play,'duration',backgroundAudioManager.duration);
  Vue.set(music.play,'currentTime',backgroundAudioManager.currentTime);
});

export default Vue;
