<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};

//解决讨厌的ResizeObserver loop completed with undelivered notifications.
// app.vue写在script里面  main.js写在app挂载完之后
const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 200);
    super(callback);
  }
}

</script>

<style>
/* 全局样式根据需要添加 */
</style>
