
<script setup>
import { computed, nextTick, ref, watch } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
  variant: {
    type: String,
    default: 'underline',
    validator: (value) => ['underline', 'pills'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const tabButtons = ref([])

const safeVariant = computed(() =>
  ['underline', 'pills'].includes(props.variant)
    ? props.variant
    : 'underline',
)

const safeSize = computed(() =>
  ['sm', 'md'].includes(props.size) ? props.size : 'md',
)

const activeTab = computed(() =>
  props.tabs.find((tab) => tab.value === props.modelValue && !tab.disabled)
  || props.tabs.find((tab) => !tab.disabled)
  || null,
)

function selectTab(tab) {
  if (!tab || tab.disabled || tab.value === props.modelValue) return

  emit('update:modelValue', tab.value)
  emit('change', tab.value)
}

async function handleKeydown(event, index) {
  const enabledTabs = props.tabs
    .map((tab, originalIndex) => ({ tab, originalIndex }))
    .filter(({ tab }) => !tab.disabled)

  if (!enabledTabs.length) return

  const currentPosition = enabledTabs.findIndex(
    ({ originalIndex }) => originalIndex === index,
  )

  if (currentPosition < 0) return

  let nextPosition = currentPosition

  if (event.key === 'ArrowRight') {
    nextPosition = (currentPosition + 1) % enabledTabs.length
  } else if (event.key === 'ArrowLeft') {
    nextPosition = (currentPosition - 1 + enabledTabs.length) % enabledTabs.length
  } else if (event.key === 'Home') {
    nextPosition = 0
  } else if (event.key === 'End') {
    nextPosition = enabledTabs.length - 1
  } else {
    return
  }

  event.preventDefault()

  const nextTab = enabledTabs[nextPosition]
  selectTab(nextTab.tab)

  await nextTick()
  tabButtons.value[nextTab.originalIndex]?.focus()
}

watch(
  () => props.tabs,
  () => {
    if (!props.tabs.some((tab) => tab.value === props.modelValue && !tab.disabled)) {
      const firstEnabled = props.tabs.find((tab) => !tab.disabled)

      if (firstEnabled) {
        emit('update:modelValue', firstEnabled.value)
        emit('change', firstEnabled.value)
      }
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div class="base-tabs">
    <div
      class="base-tabs__list"
      :class="[
        `base-tabs__list--${safeVariant}`,
        `base-tabs__list--${safeSize}`,
      ]"
      role="tablist"
      aria-label="Navigasi tab"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="tab.value"
        :ref="(element) => (tabButtons[index] = element)"
        type="button"
        role="tab"
        class="base-tabs__tab"
        :class="{
          'base-tabs__tab--active': activeTab?.value === tab.value,
          'base-tabs__tab--disabled': tab.disabled,
        }"
        :aria-selected="activeTab?.value === tab.value"
        :aria-controls="`tab-panel-${String(tab.value)}`"
        :tabindex="activeTab?.value === tab.value ? 0 : -1"
        :disabled="tab.disabled"
        @click="selectTab(tab)"
        @keydown="handleKeydown($event, index)"
      >
        {{ tab.label }}
        <span v-if="tab.count !== undefined" class="base-tabs__count">
          {{ tab.count }}
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.base-tabs {
  width: 100%;
}

.base-tabs__list {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
}

.base-tabs__list--underline {
  gap: 20px;
  border-bottom: 1px solid var(--border, #e7ebf3);
}

.base-tabs__list--pills {
  flex-wrap: wrap;
  padding: 4px;
  border-radius: 9px;
  background: #f2f4f7;
}

.base-tabs__tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  flex-shrink: 0;
  border: 0;
  background: transparent;
  color: #667085;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
}

.base-tabs__list--sm .base-tabs__tab {
  min-height: 34px;
  padding: 6px 9px;
  font-size: 12px;
}

.base-tabs__list--md .base-tabs__tab {
  min-height: 42px;
  padding: 9px 12px;
}

.base-tabs__list--underline .base-tabs__tab {
  position: relative;
  margin-bottom: -1px;
  border-bottom: 2px solid transparent;
}

.base-tabs__list--underline .base-tabs__tab--active {
  border-bottom-color: var(--blue, #315fe8);
  color: var(--blue, #315fe8);
  font-weight: 600;
}

.base-tabs__list--pills .base-tabs__tab {
  border-radius: 7px;
}

.base-tabs__list--pills .base-tabs__tab--active {
  background: #fff;
  color: #315fe8;
  font-weight: 600;
  box-shadow: 0 1px 3px rgb(16 24 40 / 10%);
}

.base-tabs__tab--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.base-tabs__tab:focus-visible {
  outline: 3px solid #a9c0ff;
  outline-offset: 2px;
}

.base-tabs__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 19px;
  height: 19px;
  padding: 0 5px;
  border-radius: 999px;
  background: #f2f4f7;
  color: #667085;
  font-size: 10px;
  font-weight: 600;
}

.base-tabs__tab--active .base-tabs__count {
  background: #edf2ff;
  color: #315fe8;
}

@media (max-width: 480px) {
  .base-tabs__list--underline {
    gap: 8px;
    overflow-x: auto;
  }

  .base-tabs__list--underline .base-tabs__tab {
    flex-shrink: 0;
  }
}
</style>
