
<template>
  <div id="app">
  <main-page></main-page>
  </div>
</template>

<script>
import Main from './components/Main'
export default {
  name: 'app',
  components: {
    'main-page': Main
  }
}
</script>

<style>

html, body, #app, #arts-wrapper {
  height: 100%;
}

body {
  margin: 0;
  overflow: hidden;
  background: #E0EAFC;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #CFDEF3, #E0EAFC);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #CFDEF3, #E0EAFC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
#app {
  font-family: 'Work Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#toastc {
  right: 5%;
  top: 100px;
  position: fixed;
  min-width: 20%;
  max-width: 40%;
  background-color: #333;
  border-radius: 2px;
  padding: 20px;
  z-index: 9999;
  font-size: 24px;
  color: #fff;
  text-align: center;
  direction: ltr;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, top 0.3s ease-out;
}

.spinner {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}

.about-br {
  line-height: 30px;
}
</style>
