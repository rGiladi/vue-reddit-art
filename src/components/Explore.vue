<template>
  <div id="explore-wrapper" class="explore-ele">
    <div id="explore-more" class="explore-btn" @click="openExploreContent(1)">
      <a><i class="fa fa-search-plus fcustom" aria-hidden="true"></i></a>
    </div>
    <div id="explore-reddit" class="explore-btn">
      <a href="https://www.reddit.com/r/Art/" target="_blank"><i class="fa fa-reddit-alien fcustom" aria-hidden="true"></i></a>
    </div>
    <div id="explore-about" class="explore-btn" @click="openExploreContent(2)">
      <a><i class="fa fa-question fcustom" aria-hidden="true"></i></a>
    </div>
  </div>
</template>


<script>
export default {
  name: 'explore',
  data () {
    return {
      fs: this.fullScreen,
      isBars: true
    }
  },
  methods: {
    openExploreContent (n) {
      if (n === 1) {
        this.$emit('open-ec', 'ex-more') // Cant use CamelCase when emitting events
      } else if (n === 2) {
        this.$emit('open-ec', 'ex-about')
      }
    }
  }
}

</script>

<style>

#explore-wrapper {
  width: 100%;
  position: absolute;
  padding: 0 41px;
  top: 15px;
}

.explore-btn {
  display: inline-block;
  height: 48px;
  width: 48px;
  background: #2c3e50;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  transition: .2s ease-out;
  margin-right: 10px;
  float: left;
}

.explore-btn:hover {
  opacity: 0.9;
  box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14), 0 2px 6px 0 rgba(0,0,0,0.12), 0 4px 2px -3px rgba(0,0,0,0.2);
}

.fcustom {
  line-height: 48px;
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
}
</style>
