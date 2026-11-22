
<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Belum ada data',
  },
  description: {
    type: String,
    default: 'Data yang kamu cari belum tersedia.',
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
})

const safeSize = computed(() =>
  ['sm', 'md', 'lg'].includes(props.size) ? props.size : 'md',
)
</script>

<template>
  <div
    class="base-empty-state"
    :class="`base-empty-state--${safeSize}`"
    role="status"
  >
    <div v-if="$slots.icon" class="base-empty-state__icon">
      <slot name="icon" />
    </div>

    <div class="base-empty-state__content">
      <h3 class="base-empty-state__title">
        {{ title }}
      </h3>

      <p v-if="description" class="base-empty-state__description">
        {{ description }}
      </p>
    </div>

    <div v-if="$slots.action" class="base-empty-state__action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
.base-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
}

.base-empty-state--sm {
  gap: 12px;
  padding: 24px 16px;
}

.base-empty-state--md {
  gap: 16px;
  padding: 40px 20px;
}

.base-empty-state--lg {
  gap: 20px;
  padding: 64px 24px;
}

.base-empty-state__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
}

.base-empty-state--sm .base-empty-state__icon {
  font-size: 28px;
}

.base-empty-state--md .base-empty-state__icon {
  font-size: 40px;
}

.base-empty-state--lg .base-empty-state__icon {
  font-size: 52px;
}

.base-empty-state__content {
  max-width: 420px;
}

.base-empty-state__title {
  margin: 0;
  color: #18243b;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
}

.base-empty-state__description {
  margin: 6px 0 0;
  color: #718096;
  font-size: 14px;
  line-height: 1.6;
}

.base-empty-state__action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
