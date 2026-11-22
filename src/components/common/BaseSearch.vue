
<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Cari...',
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  ariaLabel: {
    type: String,
    default: 'Cari data',
  },
})

const emit = defineEmits([
  'update:modelValue',
  'search',
  'clear',
])

const safeSize = computed(() =>
  ['sm', 'md', 'lg'].includes(props.size)
    ? props.size
    : 'md',
)

function handleInput(event) {
  emit('update:modelValue', event.target.value)
}

function handleSearch() {
  emit('search', props.modelValue.trim())
}

function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <div
    class="base-search"
    :class="[
      `base-search--${safeSize}`,
      { 'base-search--disabled': disabled },
    ]"
  >
    <svg
      class="base-search__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>

    <input
      type="search"
      class="base-search__input"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-label="ariaLabel"
      @input="handleInput"
      @keydown.enter.prevent="handleSearch"
    />

    <button
      v-if="clearable && modelValue && !disabled"
      type="button"
      class="base-search__clear"
      aria-label="Hapus pencarian"
      @click="handleClear"
    >
      ×
    </button>
  </div>
</template>

<style scoped>
.base-search {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border: 1px solid var(--border, #e7ebf3);
  border-radius: 9px;
  background: #fff;
  color: #667085;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.base-search:focus-within {
  border-color: var(--blue, #315fe8);
  box-shadow: 0 0 0 3px rgb(49 95 232 / 10%);
}

.base-search--sm {
  min-height: 34px;
  padding: 0 10px;
}

.base-search--md {
  min-height: 42px;
  padding: 0 12px;
}

.base-search--lg {
  min-height: 48px;
  padding: 0 14px;
}

.base-search__icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.base-search__input {
  flex: 1;
  width: 100%;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: #18243b;
  font-family: inherit;
  font-size: 13px;
}

.base-search__input::placeholder {
  color: #98a2b3;
}

.base-search__input:focus-visible {
  outline: none;
}

.base-search__input::-webkit-search-cancel-button {
  display: none;
}

.base-search__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: #98a2b3;
  font-size: 20px;
  cursor: pointer;
}

.base-search__clear:hover {
  background: #f2f4f7;
  color: #344054;
}

.base-search--disabled {
  background: #f9fafb;
  opacity: 0.6;
  cursor: not-allowed;
}

.base-search--disabled .base-search__input {
  cursor: not-allowed;
}

.base-search__clear:focus-visible {
  outline: 2px solid #a9c0ff;
  outline-offset: 2px;
}
</style>
