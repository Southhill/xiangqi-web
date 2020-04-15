<template>
  <div id="app">
    <Chessboard
      :chessboard="chessboard"
      :selected-chess="selectedChess"
      :player-color="playerColor"
    />
  </div>
</template>

<script>
import Chessgame from 'xiangqi'

import Chessboard from './components/Chessboard.vue'

export default {
  name: 'App',
  components: {
    Chessboard,
  },
  data() {
    return {
      chessgame: new Chessgame(),
      selectedChess: null,
    }
  },
  computed: {
    chessboard() {
      return this.chessgame.chessboard
    },
    playerColor() {
      return this.chessgame.player.color
    },
  },
  created() {
    this.chessgame.setup()

    this.$bus.$on('click-chess', (chess) => {
      if (
        this.selectedChess === null ||
        chess.color === this.selectedChess.color
      ) {
        // 选中了一个棋子
        this.selectedChess = chess
      } else if (chess.position === this.selectedChess.position) {
        // 取消选中
        this.selectedPosition = null
      } else {
        // 吃掉对方的棋子
        const treads = this.chessgame.player
          .getSelfChess(this.selectedChess.position)
          .getTreads(this.chessgame.chessboard)

        if (treads.indexOf(chess.position) > -1) {
          this.chessgame.playChess(this.selectedChess.position, chess.position)
        }
      }
    })
  },
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
