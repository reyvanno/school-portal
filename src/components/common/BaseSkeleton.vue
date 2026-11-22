<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'text',
    validator: (value) =>
      ['text', 'circular', 'rectangular', 'rounded'].includes(value),
  },
  width: {
    type: String,
    default: null,
  },
  height: {
    type: String,
    default: null,
  },
  count: {
    type: Number,
    default: 1,
  },
  animation: {
    type: String,
    default: 'pulse',
    validator: (value) => ['pulse', 'wave', 'none'].includes(value),
  },
})

const safeVariant = computed(() =>
  ['text', 'circular', 'rectangular', 'rounded'].includes(props.variant)
    ? props.variant
    : 'text',
)

const safeAnimation = computed(() =>
  ['pulse', 'wave', 'none'].includes(props.animation)
    ? props.animation
    : 'pulse',
)

const safeCount = computed(() =>
  Math.max(1, Math.min(20, Math.floor(props.count))),
)

const skeletonStyle = computed(() => ({
  width: props.width ?? (safeVariant.value === 'circular' ? '40px' : '100%'),
  height: props.height ?? (safeVariant.value === 'circular' ? '40px' : '16px'),
}))
</script>

<template>
  <div class="base-skeleton-group" :aria-hidden="true">
    <span
      v-for="index in safeCount"
      :key="index"
      class="base-skeleton"
      :class="[
        `base-skeleton--${safeVariant}`,
        `base-skeleton--${safeAnimation}`,
      ]"
      :style="skeletonStyle"
    />
  </div>
</template>

<style scoped>
.base-skeleton-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.base-skeleton {
  display: block;
  max-width: 100%;
  flex-shrink: 0;
  overflow: hidden;
  background: #e9edf4;
}

.base-skeleton--text {
  border-radius: 5px;
}

.base-skeleton--circular {
  border-radius: 50%;
}

.base-skeleton--rectangular {
  border-radius: 0;
}

.base-skeleton--rounded {
  border-radius: 12px;
}

.base-skeleton--pulse {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

.base-skeleton--wave {
  position: relative;
  background: #e9edf4;
}

.base-skeleton--wave::after {
  position: absolute;
  inset: 0;
  content: '';
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgb(255 255 255 / 65%),
    transparent
  );
  animation: skeleton-wave 1.5s infinite;
}

.base-skeleton--none {
  animation: none;
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

@keyframes skeleton-wave {
  100% { transform: translateX(100%); }
}

@media (prefers-reduced-motion: reduce) {
  .base-skeleton--pulse,
  .base-skeleton--wave::after {
    animation: none;
  }
}
</style>
