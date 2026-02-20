<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const isVisible = ref(false);
const popupContainer = ref<HTMLElement | null>(null);

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'toggle-search') {
    isVisible.value = !isVisible.value
  }
})

onClickOutside(popupContainer, () => {
  if (isVisible.value) {
    isVisible.value = false
  }
});
</script>

<template>
  <Transition name="fade">
    <div v-if="isVisible" class="overlay">
      <div ref="popupContainer" class="popup-container">
        <h1>LOLMao</h1>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999999998;
}

.popup-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 1.25rem;
  z-index: 999999999999;
  display: flex;
  align-items: flex-end;
  font-family: ui-sans-serif, system-ui, sans-serif;
  user-select: none;
  line-height: 1em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
