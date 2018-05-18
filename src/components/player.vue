<template>
  <div class="continer">
    <div class="t">
      <image class="img" :src="music.now.album&&music.now.album.picUrl&&(music.now.album.picUrl+'?param=100y100')"></image>
      <slider style="flex:1;margin-top:15px;" @change="seek" :value="music.play.currentTime" :min="0" :max="music.play.duration"/>
    </div>
    <div class="p">
      <p>{{music.now.name}}  {{currentTimeStr}}/{{durationStr}}</p>
    </div>



  </div>
</template>

<script>
export default {
  created() {
    // 调用应用实例的方法获取全局数据
    console.log(this);
  },
  methods:{
    seek(data){
      this.$seek(data.mp.detail.value);
    }
  },
  computed:{
    durationStr(){
      return (new Date(this.music.play.duration*1000)).Format('mm:ss');
    },
    currentTimeStr(){
      return (new Date(this.music.play.currentTime*1000)).Format('mm:ss');
    }

  }
}
</script>

<style>
.continer
{
  width: 100%;
  height: 60px;
  background: #ababab;
}
.t{
  width: 100%;
  height: 40px;
  flex:1;
  flex-direction:row;
  display:flex;

}
.p{
  width: 100%;
  height: 20px;
  font-size:16px;

}
.img{
  width: 40px;
  height: 40px;

}
</style>
