<template>
  <div
    :class="[
      'chess',
      { red: color === 'red', black: color === 'black', selected: isSelected },
    ]"
    :style="style"
    @click="handleClick"
  >
    <span :class="{ red: color === 'red' }">{{ name }}</span>
  </div>
</template>

<script>
import { getChessPosition } from '../utils/position'

export default {
  name: 'Chess',
  props: {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    selectedChess: {
      validator(value) {
        return (
          value === null ||
          Object.prototype.toString.call(value).slice(8, -1) === 'Object'
        )
      },
      required: true,
    },
    playerColor: {
      type: String,
      required: true,
    },
  },
  computed: {
    style() {
      const [x, y] = this.position.split(',').map(Number)

      return {
        ...getChessPosition(x, y),
      }
    },
    isSelected() {
      return this.selectedChess && this.selectedChess.position === this.position
    },
  },
  methods: {
    handleClick() {
      if (this.color !== this.playerColor && this.selectedChess === null) return

      this.$bus.$emit('click-chess', {
        position: this.position,
        color: this.color,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.chess {
  width: var(--chess-size);
  height: var(--chess-size);
  line-height: calc(var(--chess-size) - 3px);
  border-radius: 50%;
  border: 3px double gray;
  transform: translate(-50%, -50%);
  background-color: #e9a051;
  font-size: 1.5em;
  position: absolute;
  cursor: pointer;
  left: 0;
  top: 0;
  &:hover {
    box-shadow: 0 0 10px #000;
  }
  &.red {
    color: var(--red-player-color);
  }
  &.black {
    color: var(--black-player-color);
  }
  span {
    &.red {
      display: block;
      transform: rotate(180deg);
    }
  }
  &.selected {
    &::before {
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
    &::after {
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
</style>
