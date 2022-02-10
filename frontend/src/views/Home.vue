<template>
  <page-container title="首页" sub-title="这个是首页">
    <span>page-content</span>
    <a-button type="primary" @click="handleClick">Button</a-button>
    <p v-for="item in new Array(20)" :key="item">text block...</p>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Button, message } from 'ant-design-vue';

export default defineComponent({
  components: {
    [Button.name]: Button,
  },
  setup() {
    const text = ref<string>('1');
    const handleClick = () => {
      message.info('clicked');
      text.value = `${Math.random()}`;
    };
    return {
      handleClick,
      text,
    };
  },
});
</script>
