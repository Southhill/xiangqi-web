<template>
  <div
    :class="['chess', { red: color === 'red', black: color === 'black' }]"
    :style="style"
  >
    <span>{{ name }}</span>
  </div>
</template>

<script>
import { getChessPosition } from '../utils/position'

export default {
  name: 'Chess',
  props: {
    name: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    style() {
      const [x, y] = this.position.split(',').map(Number)

      return {
        ...getChessPosition(x, y)
      }
    }
  }
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
  // &:hover {
  //   box-shadow: 2px 2px 2px;
  // }
  &.red {
    color: var(--red-player-color);
  }
  &.black {
    color: var(--black-player-color);
  }
}
</style>
