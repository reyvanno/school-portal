
<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: (value) =>
      ['success', 'warning', 'danger', 'info'].includes(value),
  },
  title: {
    type: String,
    default: '',
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['dismiss'])

const safeVariant = computed(() =>
  ['success', 'warning', 'danger', 'info'].includes(props.variant)
    ? props.variant
    : 'info',
)

const icons = {
  success: '✓',
  warning: '!',
  danger: '×',
  info: 'i',
}

const icon = computed(() => icons[safeVariant.value])

function dismiss() {
  emit('dismiss')
}
</script>

<template>
  <div
    class="base-alert"
    :class="`base-alert--${safeVariant}`"
    role="alert"
  >
    <span class="base-alert__icon" aria-hidden="true">
      {{ icon }}
    </span>

    <div class="base-alert__content">
      <p v-if="title" class="base-alert__title">
        {{ title }}
      </p>

      <div class="base-alert__message">
        <slot />
      </div>
    </div>

    <button
      v-if="dismissible"
      type="button"
      class="base-alert__close"
      aria-label="Tutup notifikasi"
      @click="dismiss"
    >
      ×
    </button>
  </div>
</template>

<style scoped>
.base-alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding: 14px 16px;
  border: 1px solid transparent;
  border-radius: 10px;
  font-family: inherit;
}

.base-alert__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
}

.base-alert__content {
  flex: 1;
  min-width: 0;
}

.base-alert__title {
  margin: 0 0 3px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.5;
}

.base-alert__message {
  font-size: 13px;
  line-height: 1.6;
}

.base-alert__close {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin: -2px -4px 0 0;
  padding: 0;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: inherit;
  font-size: 20px;
  line-height: 1;
  opacity: 0.7;
  cursor: pointer;
}

.base-alert__close:hover {
  opacity: 1;
}

.base-alert__close:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* Success */
.base-alert--success {
  color: #16803c;
  background: #ecfdf3;
  border-color: #abefc6;
}

.base-alert--success .base-alert__icon {
  color: #16803c;
  background: #d1fadf;
}

/* Warning */
.base-alert--warning {
  color: #b54708;
  background: #fffaeb;
  border-color: #fedf89;
}

.base-alert--warning .base-alert__icon {
  color: #b54708;
  background: #fef0c7;
}

/* Danger */
.base-alert--danger {
  color: #b42318;
  background: #fef3f2;
  border-color: #fecdca;
}

.base-alert--danger .base-alert__icon {
  color: #b42318;
  background: #fee4e2;
}

/* Info */
.base-alert--info {
  color: #026aa2;
  background: #f0f9ff;
  border-color: #b9e6fe;
}

.base-alert--info .base-alert__icon {
  color: #026aa2;
  background: #e0f2fe;
}

@media (max-width: 480px) {
  .base-alert {
    padding: 12px;
    gap: 9px;
  }
}
</style>
