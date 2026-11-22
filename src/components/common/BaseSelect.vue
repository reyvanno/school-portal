
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

  placeholder: {
    type: String,
    default: 'Pilih opsi',
  },

  options: {
    type: Array,
    default: () => [],
    validator: (options) =>
      options.every(
        (option) =>
          option &&
          typeof option === 'object' &&
          'label' in option &&
          'value' in option,
      ),
  },

  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
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

  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const generatedId = useId()

const selectId = computed(() => props.id || `base-select-${generatedId}`)
const hintId = computed(() => `${selectId.value}-hint`)
const errorId = computed(() => `${selectId.value}-error`)

const describedBy = computed(() => {
  if (props.error) return errorId.value
  if (props.hint) return hintId.value

  return undefined
})

const safeSize = computed(() =>
  ['sm', 'md', 'lg'].includes(props.size) ? props.size : 'md',
)

function handleChange(event) {
  const selectedValue = event.target.value

  // Pertahankan tipe data asli dari options (string atau number).
  const selectedOption = props.options.find(
    (option) => String(option.value) === selectedValue,
  )

  emit(
    'update:modelValue',
    selectedOption ? selectedOption.value : selectedValue,
  )
}
</script>

<template>
  <div class="base-select">
    <label
      v-if="label"
      :for="selectId"
      class="base-select__label"
    >
      {{ label }}

      <span v-if="required" class="base-select__required">
        *
      </span>
    </label>

    <div
      class="base-select__wrapper"
      :class="{
        'base-select__wrapper--error': error,
        'base-select__wrapper--disabled': disabled,
      }"
    >
      <select
        v-bind="$attrs"
        :id="selectId"
        :value="modelValue ?? ''"
        :disabled="disabled"
        :required="required"
        :aria-invalid="Boolean(error)"
        :aria-describedby="describedBy"
        :class="[
          'base-select__field',
          `base-select__field--${safeSize}`,
          {
            'base-select__field--placeholder': modelValue === '' || modelValue === null,
          },
        ]"
        @change="handleChange"
      >
        <option value="" disabled>
          {{ placeholder }}
        </option>

        <option
          v-for="option in options"
          :key="String(option.value)"
          :value="option.value"
          :disabled="Boolean(option.disabled)"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <p
      v-if="error"
      :id="errorId"
      class="base-select__message base-select__message--error"
      role="alert"
    >
      {{ error }}
    </p>

    <p
      v-else-if="hint"
      :id="hintId"
      class="base-select__message base-select__message--hint"
    >
      {{ hint }}
    </p>
  </div>
</template>

<style scoped>
.base-select {
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
}

.base-select__label {
  color: var(--ink, #18243b);
  font-size: 13px;
  font-weight: 600;
}

.base-select__required {
  color: #dc3545;
  margin-left: 2px;
}

.base-select__wrapper {
  width: 100%;
  border: 1px solid var(--border, #e7ebf3);
  border-radius: 9px;
  background: #fff;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.base-select__wrapper:focus-within {
  border-color: var(--blue, #315fe8);
  box-shadow: 0 0 0 3px rgb(49 95 232 / 12%);
}

.base-select__wrapper--error {
  border-color: #dc3545;
}

.base-select__wrapper--error:focus-within {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgb(220 53 69 / 10%);
}

.base-select__wrapper--disabled {
  background: #f2f4f7;
}

.base-select__field {
  display: block;
  width: 100%;
  min-width: 0;
  border: none;
  outline: none;
  border-radius: inherit;
  background: transparent;
  color: var(--ink, #18243b);
  font-family: inherit;
  cursor: pointer;
}

.base-select__field:focus-visible {
  outline: none;
}

.base-select__field:disabled {
  cursor: not-allowed;
}

.base-select__field--placeholder {
  color: var(--muted, #718096);
}

.base-select__field--sm {
  min-height: 34px;
  padding: 7px 11px;
  font-size: 12px;
}

.base-select__field--md {
  min-height: 42px;
  padding: 10px 13px;
  font-size: 14px;
}

.base-select__field--lg {
  min-height: 48px;
  padding: 12px 15px;
  font-size: 15px;
}

.base-select__message {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
}

.base-select__message--hint {
  color: var(--muted, #718096);
}

.base-select__message--error {
  color: #dc3545;
}

@media (prefers-reduced-motion: reduce) {
  .base-select__wrapper {
    transition: none;
  }
}
</style>
