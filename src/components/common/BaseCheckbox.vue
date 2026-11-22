
<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Boolean, Array],
    default: false,
  },
  value: {
    type: [String, Number, Boolean],
    default: true,
  },
  label: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
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
  indeterminate: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const inputId = useId()

const safeSize = computed(() =>
  ['sm', 'md', 'lg'].includes(props.size) ? props.size : 'md',
)

const isChecked = computed(() =>
  Array.isArray(props.modelValue)
    ? props.modelValue.includes(props.value)
    : props.modelValue,
)

function handleChange(event) {
  const checked = event.target.checked

  if (Array.isArray(props.modelValue)) {
    const updatedValue = checked
      ? [...props.modelValue, props.value]
      : props.modelValue.filter((item) => item !== props.value)

    emit('update:modelValue', updatedValue)
    emit('change', updatedValue)
    return
  }

  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>

<template>
  <label
    class="base-checkbox"
    :class="[
      `base-checkbox--${safeSize}`,
      { 'base-checkbox--disabled': disabled },
    ]"
    :for="inputId"
  >
    <input
      :id="inputId"
      type="checkbox"
      class="base-checkbox__input"
      :checked="isChecked"
      :disabled="disabled"
      :indeterminate="indeterminate"
      @change="handleChange"
    />

    <span
      class="base-checkbox__box"
      :class="{
        'base-checkbox__box--checked': isChecked,
        'base-checkbox__box--indeterminate': indeterminate,
      }"
      aria-hidden="true"
    >
      <svg
        v-if="indeterminate"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3.5 8h9"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>

      <svg
        v-else-if="isChecked"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m3.5 8 3 3 6-6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>

    <span v-if="label || description || $slots.default" class="base-checkbox__content">
      <span v-if="label || $slots.default" class="base-checkbox__label">
        <slot>{{ label }}</slot>
      </span>

      <span v-if="description" class="base-checkbox__description">
        {{ description }}
      </span>
    </span>
  </label>
</template>

<style scoped>
.base-checkbox {
  display: inline-flex;
  align-items: flex-start;
  gap: 10px;
  width: fit-content;
  color: #344054;
  font-family: inherit;
  cursor: pointer;
}

.base-checkbox__input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

.base-checkbox__box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1.5px solid #d0d5dd;
  border-radius: 5px;
  background: #fff;
  color: #fff;
  transition: background 0.15s, border-color 0.15s;
}

.base-checkbox--sm .base-checkbox__box {
  width: 16px;
  height: 16px;
}

.base-checkbox--md .base-checkbox__box {
  width: 19px;
  height: 19px;
}

.base-checkbox--lg .base-checkbox__box {
  width: 22px;
  height: 22px;
}

.base-checkbox__box--checked,
.base-checkbox__box--indeterminate {
  border-color: #315fe8;
  background: #315fe8;
}

.base-checkbox__box svg {
  width: 100%;
  height: 100%;
}

.base-checkbox__content {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.base-checkbox__label {
  color: #344054;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
}

.base-checkbox__description {
  color: #98a2b3;
  font-size: 12px;
  line-height: 1.5;
}

.base-checkbox:has(.base-checkbox__input:focus-visible) .base-checkbox__box {
  outline: 3px solid #a9c0ff;
  outline-offset: 2px;
}

.base-checkbox--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-checkbox--disabled .base-checkbox__box {
  background: #f2f4f7;
}
</style>
