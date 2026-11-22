
<script setup>
import { computed, useId } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },

  id: {
    type: String,
    default: '',
  },

  label: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: 'text',
    validator: (value) =>
      ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'].includes(value),
  },

  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },

  placeholder: {
    type: String,
    default: '',
  },

  hint: {
    type: String,
    default: '',
  },

  error: {
    type: String,
    default: '',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  readonly: {
    type: Boolean,
    default: false,
  },

  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const generatedId = useId()

const inputId = computed(() => props.id || `base-input-${generatedId}`)
const hintId = computed(() => `${inputId.value}-hint`)
const errorId = computed(() => `${inputId.value}-error`)

const describedBy = computed(() => {
  const ids = []

  if (props.hint && !props.error) ids.push(hintId.value)
  if (props.error) ids.push(errorId.value)

  return ids.length ? ids.join(' ') : undefined
})

const safeType = computed(() =>
  ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'].includes(props.type)
    ? props.type
    : 'text',
)

const safeSize = computed(() =>
  ['sm', 'md', 'lg'].includes(props.size) ? props.size : 'md',
)

function handleInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="base-input">
    <label
      v-if="label"
      :for="inputId"
      class="base-input__label"
    >
      {{ label }}

      <span v-if="required" class="base-input__required">
        *
      </span>
    </label>

    <div
      class="base-input__wrapper"
      :class="{
        'base-input__wrapper--error': error,
        'base-input__wrapper--disabled': disabled,
        'base-input__wrapper--readonly': readonly,
      }"
    >
      <slot name="prefix" />

      <input
        v-bind="$attrs"
        :id="inputId"
        :type="safeType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :aria-invalid="Boolean(error)"
        :aria-describedby="describedBy"
        :class="[
          'base-input__field',
          `base-input__field--${safeSize}`,
        ]"
        @input="handleInput"
      />

      <slot name="suffix" />
    </div>

    <p
      v-if="error"
      :id="errorId"
      class="base-input__message base-input__message--error"
      role="alert"
    >
      {{ error }}
    </p>

    <p
      v-else-if="hint"
      :id="hintId"
      class="base-input__message base-input__message--hint"
    >
      {{ hint }}
    </p>
  </div>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
}

.base-input__label {
  color: var(--ink, #18243b);
  font-size: 13px;
  font-weight: 600;
}

.base-input__required {
  color: #dc3545;
  margin-left: 2px;
}

.base-input__wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid var(--border, #e7ebf3);
  border-radius: 9px;
  background: #fff;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.base-input__wrapper:focus-within {
  border-color: var(--blue, #315fe8);
  box-shadow: 0 0 0 3px rgb(49 95 232 / 12%);
}

.base-input__wrapper--error {
  border-color: #dc3545;
}

.base-input__wrapper--error:focus-within {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgb(220 53 69 / 10%);
}

.base-input__wrapper--disabled {
  background: #f2f4f7;
  cursor: not-allowed;
}

.base-input__wrapper--readonly {
  background: #f8f9fb;
}

.base-input__field {
  width: 100%;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--ink, #18243b);
  font-family: inherit;
  line-height: 1.5;
}

.base-input__field::placeholder {
  color: var(--muted, #718096);
  opacity: 0.8;
}

.base-input__field:focus-visible {
  outline: none;
}

.base-input__field:disabled {
  cursor: not-allowed;
}

.base-input__field--sm {
  min-height: 34px;
  padding: 7px 11px;
  font-size: 12px;
}

.base-input__field--md {
  min-height: 42px;
  padding: 10px 13px;
  font-size: 14px;
}

.base-input__field--lg {
  min-height: 48px;
  padding: 12px 15px;
  font-size: 15px;
}

.base-input__message {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
}

.base-input__message--hint {
  color: var(--muted, #718096);
}

.base-input__message--error {
  color: #dc3545;
}

@media (prefers-reduced-motion: reduce) {
  .base-input__wrapper {
    transition: none;
  }
}
</style>
