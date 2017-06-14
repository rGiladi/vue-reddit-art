<script>
import axios from 'axios'
import Toolbar from '@/components/Toolbar'
import Explore from '@/components/Explore'

export default {
  name: 'hello',
  data () {
    return {
      isLoading: true,
      urlsA: [],
      urlsB: [],
      winHeight: window.innerHeight + 'px',
      winWidth: window.innerWidth,
      aoHover: false,
      fullScreenImage: false,
      isFullScreen: false,
      isToolsOpen: true,
      imageOn: '',
      imgAuthor: 'Image Author',
      imgTitle: 'Image Title',
      imgReddit: 'Image Reddit',
      lastAfter: '',
      isMobile: false,
      isExploring: false,
      sites: [{
        thumbnail: 'http://i-cdn.phonearena.com/images/article/49220-image/Samsungs-PEN.UP-is-Instagram-for-your-digital-artwork.jpg',
        url: 'https://www.penup.com/',
        title: 'PEN.UP',
        first: true
      },
      {
        thumbnail: 'http://img.freepik.com/free-icon/deviantart_318-136402.jpg?size=338&ext=jpg',
        url: 'http://www.deviantart.com/whats-hot/?offset=0',
        title: 'DEVIANT ART'
      },
      {
        thumbnail: 'https://image.flaticon.com/icons/svg/56/56479.svg',
        url: 'https://www.behance.net',
        title: 'BEHANCE'
      }],
      about: about
    }
  },
  components: {
    'Toolbar': Toolbar,
    'Explore': Explore
  },
  computed: {
    isWideScreen () {
      if (this.winWidth > 754) {
        return true
      }
      return false
    }
  },
  methods: {
    chooseImage (e) {
      this.imageOn = e.target.src
      this.imgAuthor = e.target.getAttribute('imgAuthor')
      this.imgTitle = e.target.getAttribute('imgTitle')
      this.imgReddit = e.target.getAttribute('imgReddit')
      this.$refs.aoImg.src = this.imageOn
      if (window.innerWidth < 754) {
        this.openImg()
        this.$refs.artOn.style.display = 'block'
      }
    },
    openImg () {
      if (!this.isFullScreen) {
        this.$refs.artOn.style.width = '100%'
        this.fullScreenImage = true
        this.isToolsOpen = false
      }
    },
    closeImg () {
      if (window.innerWidth < 754) {
        this.$refs.artOn.style.display = 'none'
      }
      this.$refs.artOn.style.width = '50%'
      this.fullScreenImage = false
      this.isToolsOpen = true
    },
    loadImages () {
      var vm = this
      var after = vm.lastAfter ? '&after=' + vm.lastAfter : ''
      axios.get('https://www.reddit.com/r/Art/.json?count=15' + after).then(function (res) {
        var images = res.data.data.children
        vm.lastAfter = res.data.data.after
        for (var i = 0; i <= 14; i++) { // Dividing art works into two columns
          if (/(.jpg$|.jpeg$|.png$|reddituploads)/.test(images[i].data.url)) {
            if (i % 2 === 0) {
              vm.urlsA.push({
                'src': images[i].data.url.replace(/&amp;/g, '&'),
                'author': images[i].data.author,
                'title': images[i].data.title,
                'reddit': images[i].data.permalink
              })
            } else {
              vm.urlsB.push({
                'src': images[i].data.url.replace(/&amp;/g, '&'),
                'author': images[i].data.author,
                'title': images[i].data.title,
                'reddit': images[i].data.permalink
              })
            }
          }
        }
        vm.imageOn = vm.urlsA[0].src
        vm.imgTitle = vm.urlsA[0].title
        vm.imgAuthor = vm.urlsA[0].author
        vm.imgReddit = 'https://www.reddit.com' + vm.urlsA[0].reddit
        vm.fixColsDifferences()
      }).then(function () {
        setTimeout(function () {
          vm.isLoading = false
        }, 500)
      }).catch(function (err) {
        vm.$toast('Something went wrong... Try to refresh the page', 4000)
        console.log(err)
      })
    },
    moreImages () {
      this.loadImages()
    },
    fixColsDifferences () {
      var uA = this.urlsA
      var uB = this.urlsB
      while (uA.length !== uB.length) {
        if (Math.abs(uA.length - uB.length) !== 1) {
          if (uA.length > uB.length) {
            uB.push(uA[uA.length - 1])
            uA.pop()
          } else if (uA.length < uB.length) {
            uA.push(uB[uB.length - 1])
            uB.pop()
          }
        } else {
          break
        }
      }
    },
    openExploreContent (val) {
      this.isExploring = true
      this.$refs[val].style.display = 'block'
      if (window.innerHeight < 640) {
        if (window.innerHeight < 372) {
          this.$refs['explore-content'].style.height = '100%'
        } else {
          this.$refs['explore-content'].style.height = '70%'
        }
      } else {
        this.$refs['explore-content'].style.height = '54%'
      }
    },
    closeExploreContent () {
      var vm = this
      vm.isExploring = false
      vm.$refs['explore-content'].style.height = '0'
      setTimeout(function () {
        vm.$refs['ex-about'].style.display = 'none'
        vm.$refs['ex-more'].style.display = 'none'
      }, 300)
    },
    handleHover () {
      var imgOp
      if (this.isMobile) {
        imgOp = document.getElementById('iop-mobile')
      } else {
        imgOp = document.getElementById('iop-desktop')
      }
      if (this.aoHover) {
        this.aoHover = false
        imgOp.style.opacity = '1'
      } else {
        this.aoHover = true
        imgOp.style.opacity = '0.7'
      }
    },
    toolsHandleHover () {
      this.handleHover()
    }
  },
  created () {
    var vm = this
    vm.loadImages()
  },
  mounted () {
    var vm = this
    window.addEventListener('resize', function () {
      vm.winHeight = window.innerHeight + 'px'
      vm.winWidth = window.innerWidth

      if (window.innerHeight > 372 && vm.isExploring) {
        vm.$refs['explore-content'].style.height = '70%'
      }
    })
    window.addEventListener('keydown', (e) => {
      if (vm.fullScreenImage && e.keyCode === 27) {
        vm.closeImg()
      }
      if (vm.isExploring && e.keyCode === 27) {
        vm.closeExploreContent()
      }
    })
    window.addEventListener('click', (e) => {
      if (vm.isExploring && !e.target.parents('.explore-ele').length > 0 && !e.target.matches('.explore-ele')) {
        vm.closeExploreContent()
      }
    })
    window.addEventListener('touchstart', function detectMobile () {
      window.removeEventListener('touchstart', detectMobile)
      vm.isMobile = true
    })
    var fsprefixes = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange']
    fsprefixes.forEach(function (prefix) {
      document.addEventListener(prefix, function (e) {
        if (vm.isFullScreen) {
          vm.isFullScreen = false
        } else {
          vm.isFullScreen = true
        }
      }, false)
    })
  }
}

var about = 'One of my favourite habbits is looking over reddit\'s Art susbreddit and exploring art works of people from all over the world' +
            '<br class="about-br" />' +
            ' The idea for this project came to my mind due to reddit not been very interactive for this task' +
            '<br class="about-br" />' +
            'So I decided to fetch the art works that was posted on reddit into my own little website where i can control the design' +
            '<br class="about-br" />' +
            'This website is primarly targeted to desktop viewing and although it is nicely designed on mobile phones, reddit has a fast and comfortable <a href="https://www.reddit.com/mobile/download" target="_blank">app</a> for mobiles'
</script>

<template>
  <div id="arts-wrapper">
    <div class="arts" v-show="!isLoading">
      <div id="art-on" ref="artOn" :style="{height: winHeight}" :class="winWidth > 754 ? 'aoDisplayFix' : '' ">
        <toolbar v-show="!fullScreenImage || (winWidth < 754 && fullScreenImage)" v-on:handle-hover="toolsHandleHover" :full-screen="fullScreenImage" :is-tools="isToolsOpen" :image-share="imageOn" :reddit="imgReddit"></toolbar>
        <i class="fa fa-times ftimes" v-show="fullScreenImage" @click="closeImg"></i>
        <v-touch tag="span" id="iop-mobile" v-bind:class="{'img-opacity': isMobile}" v-on:tap="handleHover" v-show="isMobile">
          <img class="ao-img" ref="aoImg" v-bind:class="{imgActive: fullScreenImage}" :src="imageOn" @click="openImg"/>
        </v-touch>
        <span id="iop-desktop" v-bind:class="[isMobile ? '' : 'img-opacity', {'img-opacity-fs': isFullScreen}]" ref="img-opacity" @mouseleave="handleHover" @mouseenter="handleHover" v-show="!isMobile">
          <img class="ao-img" ref="aoImg" v-bind:class="[{imgActive: fullScreenImage}, {'ao-img-fs': isFullScreen}]" :src="imageOn" @click="openImg"/>
        </span>
        <div class="img-details" v-show="aoHover" @mouseleave="handleHover" @mouseenter="handleHover">
          <h1 id="imgTitle">{{ imgTitle }}</h1>
          <h2 id="imgAuthor">{{ imgAuthor }}</h2>
        </div>
      </div>
      <div id="arts-list" v-show="!fullScreenImage">
        <explore v-show="!isLoading" v-on:open-ec="openExploreContent"></explore>
        <div class="al-container">
          <div class="colA" ref="colA">
            <div :id="index" class="al-item" v-for="(img, index) in urlsA">
              <img class="img-res" :src="img.src" :imgAuthor="img.author" :imgTitle="img.title" :imgReddit="'https://www.reddit.com' + img.reddit" @click="chooseImage" />
            </div>
          </div>
          <div class="colB" ref="colB">
            <div :id="index" class="al-item" v-for="(img, index) in urlsB">
              <img class="img-res" :src="img.src" :imgAuthor="img.author" :imgTitle="img.title" :imgReddit="'https://www.reddit.com' + img.reddit" @click="chooseImage" />
            </div>
          </div>
          <input class="more_btn" type="button" value="More" @click="moreImages" />
        </div>
      </div>
      <div class="clearboth"></div>
    </div>
    <div class="spinner" v-show="isLoading">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <div id="toastc"></div>
    <div id="explore-content" ref="explore-content" class="explore-ele">
      <i class="fa fa-times ftimes" @click="closeExploreContent" v-show="isExploring"></i>
      <div ref="ex-more" class="explore-tab" style="display: none">
        <h1> Discover More Art </h1>
        <div id="ex-more-sites">
          <div v-for="site in sites" class="site-thumb" :class="site.first ? 'first' : ''">
            <p v-text="site.title" class="site-title"></p>
            <a :href="site.url" target="_blank"><img :src="site.thumbnail" alt="site.title" class="ex-sites-img" /></a>
          </div>
        </div>
      </div>
      <div ref="ex-about" class="explore-tab" style="display: none">
        <h1> About This Project </h1>
        <p class="about-p" v-html="about"></p>
      </div>
    </div>
  </div>
</template>

<style scoped>

#arts-list {
  position: relative;
  width: 50%;
  max-height: 100vh;
  height: 100%;
  float: left;
  overflow-y: scroll;
  overflow-x: hidden;
  direction: ltr;
}

.al-container {
  padding: 0 30px;
  position: relative;
  bottom: 10px;
  top: 80px;
}

.colA, .colB {
  width: 50%;
  float: left;
}

.img-res {
  width: 100%;
  height: 100%;
}

.al-item {
  width: calc(100% - 15px);
  float: right;
  margin: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.al-item:hover {
  transform: scale(1.02);
  opacity: 0.7;
}

#art-on {
  width: 50%;
  float: left;
  position: relative;
  z-index: 9997;
  background-color: #000;
}

.ao-img {
  max-height: 100%;
  max-width: 100%;
  max-width: calc(100%);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: -11;
  opacity: 1;
  cursor: pointer;
}

.ao-img-fs {
  cursor: default;
}

.imgActive {
  cursor: default !important;
}

.img-opacity {
  background-color: #000;
  display: inline-block;
  transition: opacity 0.3s;
}

.img-opacity-fs {
  opacity: 1 !important;
}

#imgAuthor, #imgTitle {
  position: absolute;
  left: 0;
  color: #fff;
  width: 100%;
  text-align: center;
  z-index: 9998;
}

#imgAuthor {
  bottom: 10%;
}

#imgTitle {
  bottom: 20%;
}

.ftimes {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 28px;
  cursor: pointer;
  z-index: 9999;
}

.ftimes:before {
  color: #7ACCC8;
}

/* Exploring Area */

#explore-content {
  position: absolute;
  top: 0;
  width: 100%;
  height: 0%;
  overflow-y: hidden;
  direction: ltr;
  background-color: #fff;
  z-index: 9999;
  transition: height .5s;
  text-align: left;
  box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.3);
}

.explore-tab {
  padding: 0 15px;
}

.site-thumb {
  display: inline-block;
  width: 200px;
  height: 256px;
  transition: all 0.3s;
  cursor: pointer;
  margin-left: 30px;
}

.site-thumb:hover {
  width: 190px;
  height: 246px;
  color: #FA6900;
}

.site-thumb.first {
  margin-left: 5px;
}

.ex-sites-img {
  width: 100%;
  height: 80%;
}

.about-p {
  font-size: 1.2rem;
}

/* Show more art button */

.more_btn {
  border-radius: 4px;
  background-color: #2c3e50;
  color: #fff;
  border: none;
  padding: 20px;
  margin: 5px;
  width: calc(100% - 15px);
  transition: all 0.5s;
  font-family: 'Work Sans', sans-serif;
  font-size: 24px;
  margin-bottom: 15px;
  cursor: pointer;
}

/* Fix div display problem */

.aoDisplayFix {
  display: block !important;
}

.clearboth {
  clear: both;
}

/* Media Queries */

@media screen and (max-width: 754px) {
  #arts-list {
    width: 100%;
  }

  #art-on {
    display: none;
  }
}

@media screen and (max-width: 696px) {
  .site-thumb {
    margin-left: 10px;
  }
}

@media screen and (max-width: 510px) {
  
  #explore-content {
    overflow-y: auto;
  }
  #explore-w {
    padding: 0 25px;
  }

  #explore-wrapper {
    padding: 0 25px;
  }

  .al-container {
    padding: 0 25px;
  }

  .colA, .colB {
    width: 100%;
  }

  .al-item {
    width: 100%;
    margin: 0;
  }
}

@media screen and (max-height: 480px) {
  .site-thumb {
    width: 140px !important;
    height: 176px !important;
  }
}
</style>

