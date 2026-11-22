
<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
  placeholder: {
    type: String,
    default: 'Pilih tindakan',
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
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue', 'select'])

const dropdownRef = ref(null)
const isOpen = ref(false)

const safeSize = computed(() =>
  ['sm', 'md', 'lg'].includes(props.size) ? props.size : 'md',
)

const selectedOption = computed(() =>
  props.options.find((option) => option.value === props.modelValue),
)

function toggleDropdown() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

function selectOption(option) {
  if (option.disabled) return

  emit('update:modelValue', option.value)
  emit('select', option)
  isOpen.value = false
}

function handleOutsideClick(event) {
  if (!dropdownRef.value?.contains(event.target)) {
    isOpen.value = false
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    ref="dropdownRef"
    class="base-dropdown"
    :class="{ 'base-dropdown--disabled': disabled }"
  >
    <button
      type="button"
      class="base-dropdown__trigger"
      :class="`base-dropdown__trigger--${safeSize}`"
      :disabled="disabled"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      @click="toggleDropdown"
    >
      <span
        class="base-dropdown__trigger-label"
        :class="{ 'base-dropdown__placeholder': !selectedOption }"
      >
        {{ selectedOption?.label || placeholder }}
      </span>

      <svg
        class="base-dropdown__chevron"
        :class="{ 'base-dropdown__chevron--open': isOpen }"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        aria-hidden="true"
      >
        <path d="m5 7.5 5 5 5-5" />
      </svg>
    </button>

    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="base-dropdown__menu"
        :class="`base-dropdown__menu--${align}`"
        role="menu"
      >
        <template v-for="option in options" :key="option.value">
          <div
            v-if="option.divider"
            class="base-dropdown__divider"
            role="separator"
          />

          <button
            v-else
            type="button"
            class="base-dropdown__option"
            :class="{
              'base-dropdown__option--selected': option.value === modelValue,
              'base-dropdown__option--disabled': option.disabled,
              'base-dropdown__option--danger': option.variant === 'danger',
            }"
            :disabled="option.disabled"
            role="menuitem"
            @click="selectOption(option)"
          >
            <span>{{ option.label }}</span>

            <span
              v-if="option.value === modelValue"
              class="base-dropdown__check"
              aria-hidden="true"
            >
              ✓
            </span>
          </button>
        </template>

        <p
          v-if="options.length === 0"
          class="base-dropdown__empty"
        >
          Tidak ada pilihan.
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.base-dropdown {
  position: relative;
  display: inline-block;
  min-width: 180px;
  font-family: inherit;
}

.base-dropdown__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  border: 1px solid var(--border, #e7ebf3);
  border-radius: 8px;
  background: #fff;
  color: #344054;
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.base-dropdown__trigger--sm {
  min-height: 34px;
  padding: 0 10px;
}

.base-dropdown__trigger--md {
  min-height: 40px;
  padding: 0 12px;
}

.base-dropdown__trigger--lg {
  min-height: 46px;
  padding: 0 14px;
}

.base-dropdown__trigger:hover:not(:disabled) {
  border-color: #c5cfe0;
}

.base-dropdown__trigger:focus-visible {
  outline: 3px solid #a9c0ff;
  outline-offset: 2px;
}

.base-dropdown__trigger-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.base-dropdown__placeholder {
  color: #98a2b3;
}

.base-dropdown__chevron {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  transition: transform 0.15s;
}

.base-dropdown__chevron--open {
  transform: rotate(180deg);
}

.base-dropdown__menu {
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  min-width: 100%;
  max-height: 240px;
  overflow-y: auto;
  padding: 5px;
  border: 1px solid var(--border, #e7ebf3);
  border-radius: 9px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(16 24 40 / 12%);
}

.base-dropdown__menu--left {
  left: 0;
}

.base-dropdown__menu--right {
  right: 0;
}

.base-dropdown__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  min-height: 36px;
  padding: 8px 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #344054;
  font-family: inherit;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
}

.base-dropdown__option:hover:not(:disabled) {
  background: #f8f9fc;
}

.base-dropdown__option--selected {
  background: #edf2ff;
  color: #315fe8;
  font-weight: 600;
}

.base-dropdown__option--danger {
  color: #b42318;
}

.base-dropdown__option--disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.base-dropdown__option:focus-visible {
  outline: 2px solid #a9c0ff;
  outline-offset: -2px;
}

.base-dropdown__check {
  font-size: 12px;
}

.base-dropdown__divider {
  height: 1px;
  margin: 5px 0;
  background: #e7ebf3;
}

.base-dropdown__empty {
  margin: 0;
  padding: 12px;
  color: #98a2b3;
  font-size: 12px;
  text-align: center;
}

.base-dropdown--disabled {
  opacity: 0.55;
}

.base-dropdown__trigger:disabled {
  cursor: not-allowed;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: none;
  }
}
</style>
