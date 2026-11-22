
<script setup>
import { computed } from 'vue'

const props = defineProps({
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value),
  },

  bordered: {
    type: Boolean,
    default: true,
  },

  shadow: {
    type: Boolean,
    default: false,
  },

  hover: {
    type: Boolean,
    default: false,
  },

  radius: {
    type: String,
    default: 'lg',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value),
  },
})

const safePadding = computed(() =>
  ['none', 'sm', 'md', 'lg'].includes(props.padding)
    ? props.padding
    : 'md',
)

const safeRadius = computed(() =>
  ['sm', 'md', 'lg', 'xl'].includes(props.radius)
    ? props.radius
    : 'lg',
)
</script>

<template>
  <div
    class="base-card"
    :class="[
      `base-card--padding-${safePadding}`,
      `base-card--radius-${safeRadius}`,
      {
        'base-card--bordered': bordered,
        'base-card--shadow': shadow,
        'base-card--hover': hover,
      },
    ]"
  >
    <header
      v-if="$slots.header || $slots.actions"
      class="base-card__header"
    >
      <div v-if="$slots.header" class="base-card__heading">
        <slot name="header" />
      </div>

      <div v-if="$slots.actions" class="base-card__actions">
        <slot name="actions" />
      </div>
    </header>

    <div class="base-card__body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.base-card {
  width: 100%;
  min-width: 0;
  background: #fff;
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

/* Padding */
.base-card--padding-none {
  padding: 0;
}

.base-card--padding-sm {
  padding: 12px;
}

.base-card--padding-md {
  padding: 20px;
}

.base-card--padding-lg {
  padding: 24px;
}

/* Radius */
.base-card--radius-sm {
  border-radius: 6px;
}

.base-card--radius-md {
  border-radius: 9px;
}

.base-card--radius-lg {
  border-radius: 12px;
}

.base-card--radius-xl {
  border-radius: 16px;
}

/* Border */
.base-card--bordered {
  border: 1px solid var(--border, #e7ebf3);
}

/* Shadow */
.base-card--shadow {
  box-shadow: 0 4px 16px rgb(24 36 59 / 5%);
}

/* Hover */
.base-card--hover:hover {
  border-color: #d5def0;
  box-shadow: 0 8px 24px rgb(24 36 59 / 8%);
  transform: translateY(-2px);
}

/* Header */
.base-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.base-card__heading {
  flex: 1;
  min-width: 0;
}

.base-card__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* Body */
.base-card__body {
  min-width: 0;
}

/* Footer */
.base-card__footer {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--border, #e7ebf3);
}

@media (prefers-reduced-motion: reduce) {
  .base-card {
    transition: none;
  }

  .base-card--hover:hover {
    transform: none;
  }
}
</style>
