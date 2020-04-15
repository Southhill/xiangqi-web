<template>
  <div id="app">
    <Chessboard :chessboard="chessboard" />
  </div>
</template>

<script>
import Chessgame from 'xiangqi'

import Chessboard from './components/Chessboard.vue'

export default {
  name: 'App',
  components: {
    Chessboard
  },
  data() {
    return {
      chessgame: new Chessgame()
    }
  },
  computed: {
    chessboard() {
      return this.chessgame.chessboard
    }
  },
  created() {
    this.chessgame.setup()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
