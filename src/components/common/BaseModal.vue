
<script setup>
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
    default: '',
  },

  closeable: {
    type: Boolean,
    default: true,
  },

  closeOnOverlay: {
    type: Boolean,
    default: true,
  },

  closeOnEscape: {
    type: Boolean,
    default: true,
  },

  width: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue', 'close'])

const dialogRef = ref(null)

const generatedId = useId()
const titleId = `base-modal-title-${generatedId}`

const safeWidth = computed(() =>
  ['sm', 'md', 'lg', 'xl'].includes(props.width)
    ? props.width
    : 'md',
)

let previousActiveElement = null
let previousBodyOverflow = ''

function getFocusableElements() {
  if (!dialogRef.value) return []

  const selector = [
    'a[href]',
    'button:not(:disabled)',
    'input:not(:disabled)',
    'select:not(:disabled)',
    'textarea:not(:disabled)',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',')

  return Array.from(dialogRef.value.querySelectorAll(selector))
    .filter((element) => {
      return (
        !element.hasAttribute('hidden') &&
        element.getAttribute('aria-hidden') !== 'true' &&
        element.getClientRects().length > 0
      )
    })
}

function focusInitialElement() {
  const focusableElements = getFocusableElements()

  if (focusableElements.length > 0) {
    focusableElements[0].focus()
  } else {
    dialogRef.value?.focus()
  }
}

function trapFocus(event) {
  if (event.key !== 'Tab' || !dialogRef.value) return

  const focusableElements = getFocusableElements()

  if (focusableElements.length === 0) {
    event.preventDefault()
    dialogRef.value.focus()
    return
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.shiftKey) {
    if (
      document.activeElement === firstElement ||
      !dialogRef.value.contains(document.activeElement)
    ) {
      event.preventDefault()
      lastElement.focus()
    }
  } else if (
    document.activeElement === lastElement ||
    !dialogRef.value.contains(document.activeElement)
  ) {
    event.preventDefault()
    firstElement.focus()
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    if (props.closeable && props.closeOnEscape) {
      event.preventDefault()
      closeModal()
    }

    return
  }

  trapFocus(event)
}

function closeModal() {
  if (!props.closeable) return

  emit('update:modelValue', false)
  emit('close')
}

function handleOverlayClick(event) {
  if (
    props.closeOnOverlay &&
    event.target === event.currentTarget
  ) {
    closeModal()
  }
}

function lockBodyScroll() {
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}

function unlockBodyScroll() {
  document.body.style.overflow = previousBodyOverflow
}

function restoreFocus() {
  if (
    previousActiveElement instanceof HTMLElement &&
    previousActiveElement.isConnected
  ) {
    previousActiveElement.focus()
  }

  previousActiveElement = null
}

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen) {
      previousActiveElement = document.activeElement
      lockBodyScroll()

      document.addEventListener('keydown', handleKeydown)

      await nextTick()
      focusInitialElement()
    } else {
      document.removeEventListener('keydown', handleKeydown)

      unlockBodyScroll()

      await nextTick()
      restoreFocus()
    }
  },
  { immediate: true, flush: 'post' },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)

  if (props.modelValue) {
    unlockBodyScroll()
    restoreFocus()
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="base-modal__overlay"
        @click="handleOverlayClick"
      >
        <section
          ref="dialogRef"
          v-bind="$attrs"
          class="base-modal"
          :class="`base-modal--${safeWidth}`"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          :aria-label="title ? undefined : 'Dialog'"
          :aria-labelledby="title ? titleId : undefined"
        >
          <header
            v-if="title || $slots.header || closeable"
            class="base-modal__header"
          >
            <div class="base-modal__heading">
              <slot name="header">
                <h2
                  v-if="title"
                  :id="titleId"
                  class="base-modal__title"
                >
                  {{ title }}
                </h2>
              </slot>
            </div>

            <button
              v-if="closeable"
              type="button"
              class="base-modal__close"
              aria-label="Tutup modal"
              @click="closeModal"
            >
              &times;
            </button>
          </header>

          <div class="base-modal__body">
            <slot />
          </div>

          <footer
            v-if="$slots.footer"
            class="base-modal__footer"
          >
            <slot name="footer" />
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.base-modal__overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgb(15 23 42 / 50%);
}

.base-modal {
  width: 100%;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  background: #fff;
  border: 1px solid var(--border, #e7ebf3);
  border-radius: 14px;
  box-shadow: 0 20px 60px rgb(15 23 42 / 20%);
}

.base-modal--sm {
  max-width: 400px;
}

.base-modal--md {
  max-width: 520px;
}

.base-modal--lg {
  max-width: 680px;
}

.base-modal--xl {
  max-width: 900px;
}

.base-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border, #e7ebf3);
}

.base-modal__heading {
  flex: 1;
  min-width: 0;
}

.base-modal__title {
  margin: 0;
  color: var(--ink, #18243b);
  font-size: 17px;
  font-weight: 700;
}

.base-modal__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: var(--muted, #718096);
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

.base-modal__close:hover {
  background: #f2f4f7;
  color: var(--ink, #18243b);
}

.base-modal__body {
  padding: 24px;
}

.base-modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid var(--border, #e7ebf3);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .base-modal,
.modal-leave-active .base-modal {
  transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .base-modal,
.modal-leave-to .base-modal {
  transform: translateY(12px) scale(0.98);
}

@media (max-width: 480px) {
  .base-modal__overlay {
    padding: 12px;
  }

  .base-modal__header {
    padding: 16px;
  }

  .base-modal__body {
    padding: 16px;
  }

  .base-modal__footer {
    padding: 14px 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active,
  .modal-enter-active .base-modal,
  .modal-leave-active .base-modal {
    transition: none;
  }
}
</style>
