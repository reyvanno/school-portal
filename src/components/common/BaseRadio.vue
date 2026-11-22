
<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  value: {
    type: [String, Number, Boolean],
    required: true,
  },
  name: {
    type: String,
    default: '',
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
})

const emit = defineEmits(['update:modelValue', 'change'])

const inputId = useId()

const safeSize = computed(() =>
  ['sm', 'md', 'lg'].includes(props.size) ? props.size : 'md',
)

const isChecked = computed(() => props.modelValue === props.value)

function handleChange() {
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<template>
  <label
    class="base-radio"
    :class="[
      `base-radio--${safeSize}`,
      { 'base-radio--disabled': disabled },
    ]"
    :for="inputId"
  >
    <input
      :id="inputId"
      type="radio"
      class="base-radio__input"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      @change="handleChange"
    />

    <span
      class="base-radio__circle"
      :class="{ 'base-radio__circle--checked': isChecked }"
      aria-hidden="true"
    >
      <span class="base-radio__dot"></span>
    </span>

    <span
      v-if="label || description || $slots.default"
      class="base-radio__content"
    >
      <span v-if="label || $slots.default" class="base-radio__label">
        <slot>{{ label }}</slot>
      </span>

      <span v-if="description" class="base-radio__description">
        {{ description }}
      </span>
    </span>
  </label>
</template>

<style scoped>
.base-radio {
  display: inline-flex;
  align-items: flex-start;
  gap: 10px;
  width: fit-content;
  color: #344054;
  font-family: inherit;
  cursor: pointer;
}

.base-radio__input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

.base-radio__circle {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1.5px solid #d0d5dd;
  border-radius: 50%;
  background: #fff;
  transition: border-color 0.15s;
}

.base-radio--sm .base-radio__circle {
  width: 16px;
  height: 16px;
}

.base-radio--md .base-radio__circle {
  width: 19px;
  height: 19px;
}

.base-radio--lg .base-radio__circle {
  width: 22px;
  height: 22px;
}

.base-radio__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: transparent;
  transform: scale(0.5);
  transition: background 0.15s, transform 0.15s;
}

.base-radio__circle--checked {
  border-color: #315fe8;
}

.base-radio__circle--checked .base-radio__dot {
  background: #315fe8;
  transform: scale(1);
}

.base-radio__content {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.base-radio__label {
  color: #344054;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
}

.base-radio__description {
  color: #98a2b3;
  font-size: 12px;
  line-height: 1.5;
}

.base-radio:has(.base-radio__input:focus-visible) .base-radio__circle {
  outline: 3px solid #a9c0ff;
  outline-offset: 2px;
}

.base-radio--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-radio--disabled .base-radio__circle {
  background: #f2f4f7;
}

@media (prefers-reduced-motion: reduce) {
  .base-radio__dot {
    transition: none;
  }
}
</style>
