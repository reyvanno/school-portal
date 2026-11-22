
<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'secondary',
    validator: (value) =>
      ['primary', 'secondary', 'success', 'warning', 'danger', 'info'].includes(value),
  },

  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },

  pill: {
    type: Boolean,
    default: false,
  },

  dot: {
    type: Boolean,
    default: false,
  },
})

const safeVariant = computed(() =>
  ['primary', 'secondary', 'success', 'warning', 'danger', 'info'].includes(props.variant)
    ? props.variant
    : 'secondary',
)

const safeSize = computed(() =>
  ['sm', 'md', 'lg'].includes(props.size) ? props.size : 'md',
)
</script>

<template>
  <span
    class="base-badge"
    :class="[
      `base-badge--${safeVariant}`,
      `base-badge--${safeSize}`,
      {
        'base-badge--pill': pill,
      },
    ]"
  >
    <span
      v-if="dot"
      class="base-badge__dot"
      aria-hidden="true"
    ></span>

    <slot />
  </span>
</template>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: fit-content;
  border: 1px solid transparent;
  border-radius: 6px;
  font-family: inherit;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
}

/* Sizes */
.base-badge--sm {
  padding: 3px 7px;
  font-size: 11px;
}

.base-badge--md {
  padding: 4px 9px;
  font-size: 12px;
}

.base-badge--lg {
  padding: 6px 11px;
  font-size: 13px;
}

/* Variants */
.base-badge--primary {
  color: #315fe8;
  background: #edf2ff;
  border-color: #dce6ff;
}

.base-badge--secondary {
  color: #667085;
  background: #f2f4f7;
  border-color: #e4e7ec;
}

.base-badge--success {
  color: #16803c;
  background: #ecfdf3;
  border-color: #abefc6;
}

.base-badge--warning {
  color: #b54708;
  background: #fffaeb;
  border-color: #fedf89;
}

.base-badge--danger {
  color: #b42318;
  background: #fef3f2;
  border-color: #fecdca;
}

.base-badge--info {
  color: #026aa2;
  background: #f0f9ff;
  border-color: #b9e6fe;
}

/* Modifiers */
.base-badge--pill {
  border-radius: 999px;
}

/* Dot */
.base-badge__dot {
  width: 6px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 50%;
  background: currentColor;
}
</style>
