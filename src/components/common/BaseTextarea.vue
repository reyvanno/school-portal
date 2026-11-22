
<script setup>
import { computed, useId } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  modelValue: {
    type: String,
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

  placeholder: {
    type: String,
    default: '',
  },

  rows: {
    type: Number,
    default: 4,
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

  maxlength: {
    type: Number,
    default: undefined,
  },

  resize: {
    type: String,
    default: 'vertical',
    validator: (value) =>
      ['none', 'vertical', 'horizontal', 'both'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue'])

const generatedId = useId()

const textareaId = computed(
  () => props.id || `base-textarea-${generatedId}`,
)

const hintId = computed(() => `${textareaId.value}-hint`)
const errorId = computed(() => `${textareaId.value}-error`)

const describedBy = computed(() => {
  if (props.error) return errorId.value
  if (props.hint) return hintId.value

  return undefined
})

const safeRows = computed(() =>
  Number.isInteger(props.rows) && props.rows > 0 ? props.rows : 4,
)

const safeResize = computed(() =>
  ['none', 'vertical', 'horizontal', 'both'].includes(props.resize)
    ? props.resize
    : 'vertical',
)

function handleInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="base-textarea">
    <label
      v-if="label"
      :for="textareaId"
      class="base-textarea__label"
    >
      {{ label }}

      <span v-if="required" class="base-textarea__required">
        *
      </span>
    </label>

    <div
      class="base-textarea__wrapper"
      :class="{
        'base-textarea__wrapper--error': error,
        'base-textarea__wrapper--disabled': disabled,
        'base-textarea__wrapper--readonly': readonly,
      }"
    >
      <textarea
        v-bind="$attrs"
        :id="textareaId"
        :value="modelValue"
        :rows="safeRows"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxlength"
        :aria-invalid="Boolean(error)"
        :aria-describedby="describedBy"
        :class="[
          'base-textarea__field',
          `base-textarea__field--${safeResize}`,
        ]"
        @input="handleInput"
      ></textarea>
    </div>

    <p
      v-if="error"
      :id="errorId"
      class="base-textarea__message base-textarea__message--error"
      role="alert"
    >
      {{ error }}
    </p>

    <p
      v-else-if="hint"
      :id="hintId"
      class="base-textarea__message base-textarea__message--hint"
    >
      {{ hint }}
    </p>
  </div>
</template>

<style scoped>
.base-textarea {
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
}

.base-textarea__label {
  color: var(--ink, #18243b);
  font-size: 13px;
  font-weight: 600;
}

.base-textarea__required {
  color: #dc3545;
  margin-left: 2px;
}

.base-textarea__wrapper {
  width: 100%;
  border: 1px solid var(--border, #e7ebf3);
  border-radius: 9px;
  background: #fff;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.base-textarea__wrapper:focus-within {
  border-color: var(--blue, #315fe8);
  box-shadow: 0 0 0 3px rgb(49 95 232 / 12%);
}

.base-textarea__wrapper--error {
  border-color: #dc3545;
}

.base-textarea__wrapper--error:focus-within {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgb(220 53 69 / 10%);
}

.base-textarea__wrapper--disabled {
  background: #f2f4f7;
}

.base-textarea__wrapper--readonly {
  background: #f8f9fb;
}

.base-textarea__field {
  display: block;
  width: 100%;
  min-width: 0;
  min-height: 90px;
  padding: 11px 13px;
  border: none;
  outline: none;
  border-radius: inherit;
  background: transparent;
  color: var(--ink, #18243b);
  font-family: inherit;
  font-size: 14px;
  line-height: 1.6;
}

.base-textarea__field::placeholder {
  color: var(--muted, #718096);
  opacity: 0.8;
}

.base-textarea__field:focus-visible {
  outline: none;
}

.base-textarea__field:disabled {
  cursor: not-allowed;
}

.base-textarea__field--none {
  resize: none;
}

.base-textarea__field--vertical {
  resize: vertical;
}

.base-textarea__field--horizontal {
  resize: horizontal;
}

.base-textarea__field--both {
  resize: both;
}

.base-textarea__message {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
}

.base-textarea__message--hint {
  color: var(--muted, #718096);
}

.base-textarea__message--error {
  color: #dc3545;
}

@media (prefers-reduced-motion: reduce) {
  .base-textarea__wrapper {
    transition: none;
  }
}
</style>
