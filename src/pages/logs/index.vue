<template>
<div class="main"  v-on:mousedown="preX=$event.clientX;preY=$event.clientY;" v-on:mouseup="preX=preY=null"
v-on:mousemove="drag($event)">
  <div id="canvas" style="width: 100%;height: 100%;overflow: hidden;">
    <div class="object3d" v-bind:style="{transform:'translate3d('+(ball.x-ball.clipwidthheight/2)+'px,'+(ball.y-ball.clipwidthheight/2)+'px,'+ball.z+'px) rotateX('+ball.rx+'deg) rotateY('+ball.ry+'deg) rotateZ('+ball.rz+'deg)'}">
      <div



      v-vue-tooltip="b.name"
      v-on:click="$playsong([Object.assign({}, b)])"
      v-on:mouseover="b.hanasu+=10;"  v-on:mouseout="b.hanasu-=10;" class="clip" v-for="(b,$index) in ball.clips" :key="$index" v-if="lines[$index]" style="" v-bind:style="{

                 'background-image': 'url('+(b.album&&b.album.picUrl)+'?param=60y60)',
                 'width':(ball.clipwidthheight-2)+'px',
                 'height':(ball.clipwidthheight-2)+'px',
                 'border-radius':(((($index==0||$index >= (ball.clips.length - 1))?(Math.floor($index / (ball.clips.length - 1)) - 90):lines[$index].y)==90)||((($index==0||$index >= (ball.clips.length - 1))?(Math.floor($index / (ball.clips.length - 1)) - 90):lines[$index].y)==-90)?'100% !important':''),
                 'transform':'rotateY('+lines[$index].x+'deg) '

                 +'rotateX('+(($index==0||$index >= (ball.clips.length - 1))?(Math.floor($index / (ball.clips.length - 1)) - 90):lines[$index].y)+'deg) '
                 +((($index==0||$index >= (ball.clips.length - 1))?(Math.floor($index / (ball.clips.length - 1)) - 90):lines[$index].y)>0?'rotateZ(180deg)':'')
                 +' translateZ('+(ballR+ball.hanasuR+b.hanasu)+'px)'
                 +' scale('+(b.hanasu/20)+')'
                 ,

                }"></div>

    </div>

  </div>

</div>
</template>
<script>
export default {
  name: 'rank',
  mounted() {



    for (var i = 0; i < 210; i++) {
      this.ball.clips.push({uri:'',hanasu:20});
}





  },
  data() {
    return {
      type: 1,
      searchString: "",
      msg: 'Welcome to Your Vue.js App',
      ball: {

        x: 0,
        y: 0,
        z: 0,
        rx: 0,
        ry: 0,
        rz: 0,
        clipwidthheight: 50,
        hanasuR: 0,
        clips: []
      },
      whRate:8,
      preX:null,
      preY:null,

    }
  },
  methods: {
    rotateYDeg($index, len) {
      if ($index == 0 || $index >= (len - 1)) {
        return (Math.floor($index / (len - 1)) - 90);
      } else {


        return this.lines[$index].y;
      }

    },
    rotateXDeg($index) {
      console.log(this.lines[$index].x);
      return this.lines[$index].x;
    },

    search() {

    },
    goPlaylist(id) {},
    goSong(id) {},
    drag($event){


              if (this.preX&&this.preY) {
                this.ball.ry+=($event.clientX-this.preX)/10;
        				this.ball.rx-=($event.clientY-this.preY)/10;
        				this.preX=$event.clientX;
        				this.preY=$event.clientY;
              }
    }
  },
  computed: {
    ballR: {
      get: function() {

        return Math.sqrt(this.ball.clips.length * this.ball.clipwidthheight * this.ball.clipwidthheight / 4 / Math.PI)

      },
      set: function(newValue) {

      }
    },
    lines: {
      get: function() {

        var lineCount = Math.floor(0.5 * Math.PI * this.ballR / this.ball.clipwidthheight);
        var lines = []
        var inx = 0;
        for (var i = 0; i <= lineCount; i++) {
          var count = Math.floor((2 * Math.PI * i / lineCount) * Math.floor(this.ballR / this.ball.clipwidthheight)) + Math.ceil(Math.sin(i / lineCount * Math.PI) * lineCount + 1);

          for (var j = 0; j < count; j++) {
            lines[inx] = {
              x: j * 360 / count,
              y: i / lineCount * 90 - 90
            };
            inx += 1;
          }

        }
        for (var i = 0; i <= (lineCount - 1); i++) {
          var count = Math.floor((2 * Math.PI * i / lineCount) * Math.floor(this.ballR / this.ball.clipwidthheight)) + Math.ceil(Math.sin(i / lineCount * Math.PI) * lineCount + 1);

          for (var j = 0; j < count; j++) {
            lines[inx] = {
              x: j * 360 / count,
              y: i / lineCount * 90 + 90
            };
            inx += 1;
          }

        }
        console.log(lines);
        return lines;


      },
      set: function(newValue) {

      }
    }





  },
  components: {

  },
  beforeDestroy() {

    this.source.cancel("aaaa");
    window.removeEventListener("resize",()=>{this.ball.clipwidthheight=(this.$el.offsetWidth>this.$el.offsetHeight?this.$el.offsetHeight:this.$el.offsetWidth)/this.whRate;});

  },
  watch: {
    $route() {

    },





  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvas {
  transform-style: preserve-3d;
  perspective: 5000px;
  -webkit-transform-style: preserve-3d;
  -webkit-perspective: 5000px;
  -moz-transform-style: preserve-3d;
  -moz-perspective: 5000px;
  -ms-transform-style: preserve-3d;
  -ms-perspective: 5000px;
}

#canvas>* {
  transform-style: preserve-3d;
  perspective: 5000px;
  -webkit-transform-style: preserve-3d;
  -webkit-perspective: 5000px;
  -moz-transform-style: preserve-3d;
  -moz-perspective: 5000px;
  -ms-transform-style: preserve-3d;
  -ms-perspective: 5000px;
}

.object3d {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0px;
  height: 0px;
  transform-origin: center;
}

.clip {
  transform-origin: center;

  width: 18px;
  height: 18px;
  top: -10px;
  left: -10px;
  background: rgba(79, 192, 141, 0.5);
  border: inset 1px rgba(200, 200, 200, 0.5);
  position: absolute;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: transform 0.5s;
  cursor: pointer;
}
.main
{
  position: fixed;
  width: calc(100% - 200px);
  height: calc(100% - 160px);
  margin-top: -20px;
}

@media screen and (max-width: 750px){
  .main
  {
    width: 100%;
  }
}
</style>
