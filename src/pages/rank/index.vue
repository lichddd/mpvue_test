<template>
<div class="main">
  <player></player>
  <div class="ranklist1" v-if="type==1">
    <template v-for="(rank,$index) in ranklist.rank1" >
    <div v-if="$index%3>0" style="width:15px;height:1px;float:left;"></div>
    <div class="rank1" :style="{visibility:(rank.list.length>0?'visible':'hidden')}">
      <div class="rankimg1" :style="{background:'url('+rank.picUrl+'?param=150y150) '+rank.bkc+' no-repeat 0px -40px'}"  v-on:click="goPlaylist(rank.code)">

        <span>({{rank.time}}更新)</span>


      </div>
      <div class="hot" v-for="(li,$index_li) in rank.list">
        <span style="font-weight: 900;" :style="{color:($index_li>2?'':'#4fc08d')}">{{$index_li+1}}</span>
        <span v-vue-tooltip="'播放 '+li.name" style="font-weight:600;flex-grow: 1;cursor:pointer;" v-on:click="playsong([li])">{{li.name}}</span>
        <span style="width:25%;"><span v-for="(artist,$index_a) in li.artists"><span style="cursor:pointer"  v-vue-tooltip="'艺人详细 '+artist.name" v-on:click="goArtist(artist.id)">{{artist.name}}</span><span v-if="$index_a<li.artists.length-1">、</span></span></span>
      </div>
      <div class="more"  v-vue-tooltip="'查看全部'" v-on:click="goPlaylist(rank.code)">查看全部 > </div>
    </div>

  </template>
  </div>
</div>
</template>

<script>
import player from '@/components/player'
import playmusic from '@/playmusic'
export default {
  data() {
    return {
      ranklist: {
        rank1: [
          {
            code: "3779629",
            name: " 云音乐新歌榜",
            picUrl: "",
            bkc: "#5ec2ca",
            time: 0,
            list: []
          }, {
            code: "3778678",
            name: " 云音乐热歌榜",
            picUrl: "",
            bkc: "#c88160",
            time: 0,
            list: []
          }, {
            code: "2884035",
            name: " 网易原创歌曲榜",
            picUrl: "",
            bkc: "#d06080",
            time: 0,
            list: []
          }, {
            code: "19723756",
            name: " 云音乐飙升榜",
            picUrl: "",
            bkc: "#819ee8",
            time: 0,
            list: []
          }, {
            code: "10520166",
            name: " 云音乐电音榜",
            picUrl: "",
            bkc: "#333333",
            time: 0,
            list: []
          }
        ],
      },
      type: 1,

    }
  },

  components: {
    player
  },

  methods: {
    bindViewTap() {
      const url = '../logs/main'
      wx.navigateTo({
        url
      })
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    goPlaylist()
    {
      wx.navigateTo({url:'/pages/logs/main'});
    },
    playsong(arr)
    {
      this.$play(arr);
    },
    search() {
      this.ranklist.rank1.forEach((obj)=>{

        wx.request({
            url: 'http://music.163.com/api/playlist/detail?id=' + obj.code,
            header: {
              'Accept': '*/*',
              'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
              // 'Connection': 'keep-alive',
              'Content-Type': 'application/x-www  .0-0    form-urlencoded',
              // 'Referer': 'http://music.163.com',
              'Cookie': 'appver=2.0.2',
              // 'Host': 'music.163.com',
              // 'Cookie': cookie,
              // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',
            },
            success: function(m) {
              console.log(m);
              if (m.data&&m.data.code == 200 && m.data.result && m.data.result.tracks) {
                obj.picUrl = m.data.result.coverImgUrl;
                obj.name = m.data.result.name;
                obj.list = m.data.result.tracks.filter((elt, i, arr) => {

                  return true;
                }).slice(0,8);
                obj.time = (new Date(m.data.result.trackNumberUpdateTime)).Format('YYYY-MM-DD');
                obj.count = m.data.result.playCount;
              }
              console.log(obj);
            }
          });



      });

      },
    },

    created() {
      // 调用应用实例的方法获取全局数据
      console.log(this);
      this.search();
    }
  }
</script>

<style scoped>

.ranklist1 {
  /* padding-top: 20px; */
  height: calc(100% - 60px);
  overflow:scroll;
}

.ranklist1 .rank1 {
  height: 360px;
  width: calc(33.3% - 10px);
  /*cursor: pointer;*/
  overflow: hidden;
  /*margin-left: 15px;*/
  display: inline-block;
  float: left;
  margin-bottom: 20px;
  border: solid 1px #e6e6e6;
}


.ranklist1 .rank1 .rankimg1 {
  height: 80px;
  width: 100%;
  position: relative;
}

.ranklist1 .rank1 .rankimg1 span {
  font-size: 12px;
  color: #ffffff;
  position: absolute;
  bottom: 5px;
  left: 50px;
}

.ranklist1 .rank1 .hot {
  height: 30px;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;

  line-height: 30px;
}
.ranklist1 .rank1 .more
{
  font-size: 14px;
    color: #666666;
    float: right;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
}
.ranklist1 .rank1 .hot > span {
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  /*display: flex;
  align-items: center;*/
}


.hotlist .hot p {
  width: 100%;
  margin: 0px;
  text-align: left;
}

.hotimg {
  width: 150px;
  height: 150px;
  border: solid 1px #e6e6e6;
}

.main {
  /* padding-left: 30px; */
  /* padding-right: 30px; */
  text-align: left;
  height: 100%;
}

.main .h1 {
  margin: 0px;
  border-bottom: solid 3px #e6e6e6;
  display: inline-block;
  font-size: 24px;
  color: #666666;
  margin-right: 20px;
}

.main .h3 {
  margin: 0px;
  display: inline-block;
  font-size: 16px;
  color: #666666;
  margin-right: 20px;
  cursor: pointer;
}
.main h3 {
  transition: font-size 0.5s;
}



  .ranklist2 {
    border-top: solid 2px #e6e6e6;
  }

  .ranklist1 .rank1
  {
    width: 100%;
    height: 720px;
  }





  .ranklist1 .rank1 .rankimg1 {
    height: 160px;
    width: 100%;
    background-size: 50% !important;
    background-position:0px 0px !important;
    position: relative;
  }



  .ranklist1 .rank1 .rankimg1 span {
    font-size: 24px;
    position: absolute;
    bottom: 10px;
    left: 160px;
  }

  .ranklist1 .rank1 .hot {
    height: 60px;
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 28px;

    line-height: 60px;
  }
  .ranklist1 .rank1 .more
  {
    font-size: 28px;
      color: #666666;
      float: right;
      margin-right: 10px;
      margin-top: 10px;
      cursor: pointer;
  }

  .main .h1 {
    border-bottom: solid 6px #e6e6e6;
    font-size: 48px;
  }
  .main .h3 {
    font-size:32px;
  }


</style>
<style>
page{
  height: 100%;
}
</style>
