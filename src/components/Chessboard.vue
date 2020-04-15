<template>
  <div class="chessboard">
    <div class="chessboard-body">
      <div class="chessboard-row">
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell jiang"></div>
        <div class="chessboard-cell jiang-rotate"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
      </div>
      <div class="chessboard-row">
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell jiang-rotate"></div>
        <div class="chessboard-cell jiang"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
      </div>
      <div class="chessboard-row">
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
      </div>
      <div class="chessboard-row">
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
      </div>
      <div class="chessboard-divide">
        <div class="chessboard-divide-text">
          <span class="rotate">楚</span><span class="rotate">河</span>
        </div>
        <div class="chessboard-divide-text"><span>汉</span><span>界</span></div>
      </div>
      <div class="chessboard-row">
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
      </div>
      <div class="chessboard-row">
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
      </div>
      <div class="chessboard-row">
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell jiang"></div>
        <div class="chessboard-cell jiang-rotate"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
      </div>
      <div class="chessboard-row">
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell jiang-rotate"></div>
        <div class="chessboard-cell jiang"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
        <div class="chessboard-cell"></div>
      </div>
      <div class="chess-body">
        <Chess
          v-for="(chess, index) in chessPool"
          :key="index"
          :name="chess.name"
          :position="chess.position"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Chess from './Chess.vue'

export default {
  name: 'Chessboard',
  components: { Chess },
  data() {
    return {
      chessPool: [
        {
          name: '车',
          position: '0,0'
        },
        {
          name: '将',
          position: '0,4'
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
.chessboard {
  font-family: '隶书';
  background-color: #fff3d4;
  display: flex;
  justify-content: center;
  align-content: center;
  border: 7px solid #522a20;
  padding: 40px;
  width: 600px;
  // height: 600px;
  &-body {
    border: 6px double #6a2c15;
    width: 100%;
    position: relative;
    .chess-body {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  &-row {
    width: 100%;
    height: 73px;
    border-bottom: 2px solid #6a2c15;
    display: flex;
    &:nth-last-of-type(1) {
      border-bottom: 0 none;
    }
  }
  &-divide {
    border-bottom: 2px solid #6a2c15;
    display: flex;
    height: 73px;
    &-text {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      font-weight: bold;
      letter-spacing: 20px;
      span {
        font-size: 2.5em;
        color: red;
        &.rotate {
          color: black;
          transform: rotate(180deg);
        }
      }
    }
  }
  &-cell {
    flex-grow: 1;
    height: 100%;
    border-right: 2px solid #6a2c15;
    &:nth-last-of-type(1) {
      border-right: 0 none;
    }
    &.jiang {
      position: relative;
      &::before {
        content: '';
        height: 2px;
        width: 103px;
        transform: rotate(45deg);
        background-color: #6a2c15;
        position: absolute;
        top: 48%;
        left: -16px;
      }
    }
    &.jiang-rotate {
      position: relative;
      &::before {
        content: '';
        height: 2px;
        width: 103px;
        transform: rotate(-45deg);
        background-color: #6a2c15;
        position: absolute;
        top: 48%;
        left: -16px;
      }
    }
  }
}
</style>
