<template>
  <div>测试</div>
  <mikuIcon class="miku-icon_feedback" color="red" :size="18">hello  miku</mikuIcon>  
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const state = reactive({username: '', password: ''})
</script>

<style>
</style>
