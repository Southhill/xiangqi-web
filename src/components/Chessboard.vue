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
      <div class="chessboard-row" style="border-bottom: 0 none;">
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
          :color="chess.color"
          :selected-chess="selectedChess"
          :player-color="playerColor"
        />
        <template v-for="(list, index) in grid">
          <template v-for="(position, idx) in list">
            <div
              v-if="
                chessPool.findIndex(chess => chess.position === position) === -1
              "
              :key="position"
              :style="placeholderChessStyle[index][idx]"
              class="placeholder-chess"
              @click="clickPlaceholderChess(position)"
            ></div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Chess from './Chess.vue'
import { getChessPosition } from '../utils/position'

export default {
  name: 'Chessboard',
  components: { Chess },
  props: {
    chessboard: {
      type: Object,
      required: true
    },
    selectedChess: {
      validator(value) {
        return (
          value === null ||
          Object.prototype.toString.call(value).slice(8, -1) === 'Object'
        )
      },
      required: true
    },
    playerColor: {
      type: String,
      required: true
    }
  },
  computed: {
    chessPool() {
      // todo 偏置棋盘
      return this.chessboard ? this.chessboard.usableChessPool : []
    },
    grid() {
      return this.chessboard ? this.chessboard.grid : []
    },
    placeholderChessStyle() {
      return this.grid.map(list => {
        return list.map(position => {
          const [x, y] = position.split(',').map(Number)
          return {
            ...getChessPosition(x, y)
          }
        })
      })
    }
  },
  methods: {
    clickPlaceholderChess(position) {
      if (this.selectedChess) {
        this.$bus.$emit('click-placeholder', position)
      }
    }
  }
}
</script>

<style scoped lang="less">
.chessboard {
  font-family: LiSu, STLiti;
  background-color: #fff3d4;
  display: flex;
  justify-content: center;
  align-content: center;
  border: 7px solid #522a20;
  padding: 28px;
  width: 594px;
  overflow: hidden;
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
      z-index: 11;
      .placeholder-chess {
        width: var(--chess-size);
        height: var(--chess-size);
        line-height: calc(var(--chess-size) - 3px);
        border-radius: 50%;
        // border: 3px double gray;
        // background-color: #e9a051;
        transform: translate(-50%, -50%);
        position: absolute;
        cursor: pointer;
        left: 0;
        top: 0;
        &:hover::before {
          content: '';
          background-color: transparent;
          width: 15px;
          height: 15px;
          border-top: 2px solid #ccc;
          border-left: 2px solid #ccc;
          position: absolute;
          left: -8px;
          top: -8px;
        }
        &:hover::after {
          content: '';
          background-color: transparent;
          width: 15px;
          height: 15px;
          border-right: 2px solid #ccc;
          border-bottom: 2px solid #ccc;
          position: absolute;
          right: -8px;
          bottom: -8px;
        }
      }
    }
    // .placeholder-chess-body {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   z-index: 10;
    //   .placeholder-chess {
    //     width: var(--chess-size);
    //     height: var(--chess-size);
    //     line-height: calc(var(--chess-size) - 3px);
    //     border-radius: 50%;
    //     // border: 3px double gray;
    //     // background-color: #e9a051;
    //     transform: translate(-50%, -50%);
    //     position: absolute;
    //     cursor: pointer;
    //     left: 0;
    //     top: 0;
    //     &:hover::before {
    //       content: '';
    //       background-color: transparent;
    //       width: 15px;
    //       height: 15px;
    //       border-top: 2px solid #ccc;
    //       border-left: 2px solid #ccc;
    //       position: absolute;
    //       left: -8px;
    //       top: -8px;
    //     }
    //     &:hover::after {
    //       content: '';
    //       background-color: transparent;
    //       width: 15px;
    //       height: 15px;
    //       border-right: 2px solid #ccc;
    //       border-bottom: 2px solid #ccc;
    //       position: absolute;
    //       right: -8px;
    //       bottom: -8px;
    //     }
    //   }
    // }
  }
  &-row {
    width: 100%;
    height: var(--chessboard-cell-size);
    border-bottom: 2px solid #6a2c15;
    display: flex;
  }
  &-divide {
    border-bottom: 2px solid #6a2c15;
    display: flex;
    height: var(--chessboard-cell-size);
    &-text {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      font-weight: bold;
      letter-spacing: 20px;
      span {
        font-size: 2.5em;
        color: var(--black-player-color);
        &.rotate {
          color: var(--red-player-color);
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
