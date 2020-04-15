<template>
  <div class="chess" :style="style">{{ name }}</div>
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
    }
  },
  computed: {
    style() {
      const [x, y] = this.position.split(',').map(Number)

      return getChessPosition(x, y)
    }
  }
}
</script>

<style lang="less" scoped>
.chess {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px double gray;
  line-height: 30px;
  transform: translate(-50%, -50%);
  background-color: #ccc;
  font-size: 1.5em;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
