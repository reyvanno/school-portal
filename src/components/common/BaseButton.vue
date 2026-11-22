
<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value),
  },

  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },

  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  loading: {
    type: Boolean,
    default: false,
  },

  block: {
    type: Boolean,
    default: false,
  },

  pill: {
    type: Boolean,
    default: false,
  },
})

// Fallback untuk mencegah class yang tidak dikenal
const safeVariant = computed(() =>
  ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(props.variant)
    ? props.variant
    : 'primary',
)

const safeSize = computed(() =>
  ['sm', 'md', 'lg'].includes(props.size) ? props.size : 'md',
)

const safeType = computed(() =>
  ['button', 'submit', 'reset'].includes(props.type) ? props.type : 'button',
)
</script>

<template>
  <button
    :type="safeType"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :class="[
      'base-button',
      `base-button--${safeVariant}`,
      `base-button--${safeSize}`,
      {
        'base-button--block': block,
        'base-button--pill': pill,
        'base-button--loading': loading,
      },
    ]"
  >
    <span
      v-if="loading"
      class="base-button__spinner"
      role="status"
      aria-label="Sedang memproses"
    ></span>

    <span class="base-button__content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 10px;
  font-family: inherit;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;
}

.base-button:focus-visible {
  outline: 3px solid var(--color-primary-ring, rgb(59 130 246 / 25%));
  outline-offset: 2px;
}

.base-button:active:not(:disabled) {
  transform: translateY(1px);
}

.base-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}

/* Sizes */
.base-button--sm {
  min-height: 34px;
  padding: 7px 12px;
  font-size: 12px;
}

.base-button--md {
  min-height: 42px;
  padding: 10px 16px;
  font-size: 14px;
}

.base-button--lg {
  min-height: 48px;
  padding: 12px 20px;
  font-size: 15px;
}

/* Variants */
.base-button--primary {
  color: #fff;
  background: var(--color-primary, #3157d5);
}

.base-button--primary:hover:not(:disabled) {
  background: var(--color-primary-hover, #2648b8);
}

.base-button--secondary {
  color: var(--color-text, #344054);
  background: var(--color-surface-secondary, #f2f4f7);
  border-color: var(--color-border, #e4e7ec);
}

.base-button--secondary:hover:not(:disabled) {
  background: var(--color-surface-hover, #e9edf3);
}

.base-button--outline {
  color: var(--color-primary, #3157d5);
  background: transparent;
  border-color: var(--color-primary, #3157d5);
}

.base-button--outline:hover:not(:disabled) {
  background: var(--color-primary-soft, #eff4ff);
}

.base-button--ghost {
  color: var(--color-text, #344054);
  background: transparent;
}

.base-button--ghost:hover:not(:disabled) {
  background: var(--color-surface-secondary, #f2f4f7);
}

.base-button--danger {
  color: #fff;
  background: var(--color-danger, #dc3545);
}

.base-button--danger:hover:not(:disabled) {
  background: var(--color-danger-hover, #bb2534);
}

/* Modifiers */
.base-button--block {
  display: flex;
  width: 100%;
}

.base-button--pill {
  border-radius: 999px;
}

.base-button__content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.base-button__spinner {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: base-button-spin 0.7s linear infinite;
}

@keyframes base-button-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .base-button {
    transition: none;
  }

  .base-button__spinner {
    animation-duration: 1.5s;
  }
}
</style>
