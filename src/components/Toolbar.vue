<template>
  <div id="toolbar" ref="toolbar" @mouseleave="handleHover" @mouseenter="handleHover">
    <i class="fa fa-times custom-fa fa-open-close" ref="faTimes" :class="{faOpacity:!isBars}" @click="showTools" aria-hidden="true"></i>
    <i class="fa fa-bars custom-fa fa-open-close" ref="faBars" :class="{faOpacity:isBars}" @click="showTools" aria-hidden="true"></i>
    <div id="tools" ref="tools">
    <a :href="reddit" target="_blank"><i class="fa fa-reddit custom-fa toolsO" aria-hidden="true"></i></a>
    <i @click="saveFunction" class="fa fa-floppy-o custom-fa toolsO" aria-hidden="true"></i>
    <a v-show="showWhatsapp" :href="'whatsapp://send?text=' + getImgToShare" data-action="share/whatsapp/share"><i class="fa fa-whatsapp custom-fa toolsO" aria-hidden="true"></i></a>
    <i @click="openFullScreen" class="fa fa-arrows-alt custom-fa" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>

export default {
  name: 'toolbar',
  data () {
    return {
      fs: this.fullScreen,
      isBars: true
    }
  },
  props: ['fullScreen', 'isTools', 'imageShare', 'reddit'],
  computed: {
    getToolsState () {
      return this.isTools
    },
    getImgToShare () {
      return this.imageShare
    },
    getRedditLink () {
      return this.reddit
    },
    showWhatsapp () {
      var os = getOS()
      if (os === 'i' || os === 'A') {
        return true
      } else {
        return false
      }
    },
    getWindowWidth () {
      return window.innerWidth
    }
  },
  methods: {
    showTools () {
      var vm = this
      if (vm.isBars) {
        vm.rotateButton(vm.$refs.faTimes, true)
        vm.isBars = false
      } else {
        vm.rotateButton(vm.$refs.faBars, false)
        vm.isBars = true
      }
    },
    openFullScreen () {
      var element = document.getElementsByClassName('img-opacity')[0]
      var fullscreenEnabled = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement
      if (fullscreenEnabled) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        }
      }
    },
    rotateButton (ele, tools) {
      var t = this.$refs.tools
      var tb = this.$refs.toolbar
      if (tools) {
        t.style.opacity = '1'
        t.style.zIndex = '99'
        tb.style.visibility = 'visible'
      } else {
        t.style.opacity = '0'
        t.style.zIndex = '-10'
        tb.style.visibility = 'hidden'
      }
      if (ele.style.transform === '') {
        ele.style.transform = 'rotate(360deg)'
      } else {
        ele.style.transform = ''
      }
    },
    saveFunction () {
      this.$toast('Soon...')
    },
    handleHover () {
      this.$emit('handle-hover')
    }
  }
}

function getOS () {
  var userAgent = window.navigator.userAgent
  var platform = window.navigator.platform
  var iosPlatforms = ['iPhone', 'iPad', 'iPod']
  var os = null

  if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'i'
  } else if (/Android/.test(userAgent)) {
    os = 'A'
  }

  return os
}

</script>

<style>
  #toolbar {
    position: absolute;
    top: 5px;
    left: 5px;
    height: 40px;
    width: 80%;
    text-align: left;
    z-index: 99999;
    cursor: pointer;
    visibility: hidden;
  }

  #tools {
    display: inline-block;
    position: relative;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: -10;
  }

  .custom-fa {
    font-size: 20px;
    color: #fff;
    margin-top: 8px;
    margin-left: 10px;
    cursor: pointer;
    z-index: 10;
  }

  .toolsO:hover {
    color: #E0EAFC;
  }

  .fa-open-close {
    font-size: 24px;
    float: right;
    margin-right: 8px;
    margin-left: 6px;
    transition: transform 0.3s;
    opacity: 0;
    visibility: hidden;
  }

  .faOpacity {
    opacity: 1;
    float: left;
    visibility: visible;
  }

  .fa-times {
    position: relative;
    font-size: 28px;
    bottom: 5px;
  }

  .fa-times:before {
    color: #E94C6F;
  }

</style>
