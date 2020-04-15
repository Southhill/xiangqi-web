<template>
  <div id="app">
    <Chessboard />
  </div>
</template>

<script>
import Chessboard from './components/Chessboard.vue'
import Chessgame from 'xiangqi'

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
