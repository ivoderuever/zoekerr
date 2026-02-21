<script setup lang="ts">
import Fuse from 'fuse.js'
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import data from '../../dataset/data.json'

const isVisible = ref(false);
const popupContainer = ref<HTMLElement | null>(null);

const query = ref('');
// Replace with your preferred default item or null
const selectedId = ref<string | null>('core-stats');

const fuse = new Fuse(data, {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "tags", weight: 0.3 },
    { name: "content", weight: 0.2 }
  ],
  threshold: 0.35,
  ignoreLocation: true
})

const results = computed(() => {
  if (!query.value) return []

  return fuse.search(query.value).map(r => r.item)
})

const selectedItem = computed(() => {
  if (!selectedId.value) {
    return results.value[0] ?? null
  }

  return data.find(item => item.id === selectedId.value) ?? null
})

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
    <div v-if="isVisible" class="z-overlay">
      <div ref="popupContainer" class="z-popup-container">
        <div class="z-search-container">
          <div class="z-search-bar">
            <input v-model="query" type="text" placeholder="Search..." class="z-search-input" />
          </div>
          <div class="z-search-results">
            <div v-for="result in results" :key="result.id" class="z-search-result" @click="selectedId = result.id">
              {{ result.title }}
            </div>
          </div>
        </div>
        <div class="z-selected-item">
            <h2>{{ selectedItem?.title }}</h2>
            <p>{{ selectedItem?.content }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.z-overlay {
  --light-bg: #efefef;
  --dark-bg: #1e1e1e;

  --light-font: #1e1e1e;
  --dark-font: #efefef;
  
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999999998;
}

.z-popup-container {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  margin: 1.25rem;
  z-index: 999999999999;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  display: flex;
  flex-direction: column;

}

.z-search-container {
  background-color: var(--light-bg);
  color: var(--light-font);  
  padding: 10px 20px;
}

@media (prefers-color-scheme: dark) {
  .z-search-container {
    background-color: var(--dark-bg);
    color: var(--dark-font);
  }
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
