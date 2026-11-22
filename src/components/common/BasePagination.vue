
<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  perPage: {
    type: Number,
    default: 10,
  },
  siblingCount: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['update:modelValue', 'page-change'])

const totalPages = computed(() =>
  Math.ceil(Math.max(0, props.totalItems) / Math.max(1, props.perPage)),
)

const currentPage = computed(() =>
  Math.min(Math.max(1, props.modelValue), Math.max(1, totalPages.value)),
)

const startItem = computed(() =>
  props.totalItems === 0
    ? 0
    : (currentPage.value - 1) * props.perPage + 1,
)

const endItem = computed(() =>
  Math.min(currentPage.value * props.perPage, props.totalItems),
)

const pages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const siblings = Math.max(0, props.siblingCount)

  if (total <= 7 + siblings * 2) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const left = Math.max(2, current - siblings)
  const right = Math.min(total - 1, current + siblings)

  const result = [1]

  if (left > 2) {
    result.push('...')
  }

  for (let page = left; page <= right; page++) {
    result.push(page)
  }

  if (right < total - 1) {
    result.push('...')
  }

  result.push(total)

  return result
})

function goToPage(page) {
  if (
    typeof page !== 'number' ||
    page < 1 ||
    page > totalPages.value ||
    page === currentPage.value
  ) {
    return
  }

  emit('update:modelValue', page)
  emit('page-change', page)
}
</script>

<template>
  <nav
    v-if="totalPages > 0"
    class="base-pagination"
    aria-label="Navigasi halaman"
  >
    <p class="base-pagination__info">
      Menampilkan
      <strong>{{ startItem }}–{{ endItem }}</strong>
      dari
      <strong>{{ totalItems }}</strong>
      data
    </p>

    <div class="base-pagination__controls">
      <button
        type="button"
        class="base-pagination__button base-pagination__arrow"
        :disabled="currentPage === 1"
        aria-label="Halaman sebelumnya"
        @click="goToPage(currentPage - 1)"
      >
        ‹
      </button>

      <template v-for="(page, index) in pages" :key="`${page}-${index}`">
        <span
          v-if="page === '...'"
          class="base-pagination__ellipsis"
          aria-hidden="true"
        >
          …
        </span>

        <button
          v-else
          type="button"
          class="base-pagination__button"
          :class="{
            'base-pagination__button--active': page === currentPage,
          }"
          :aria-label="`Halaman ${page}`"
          :aria-current="page === currentPage ? 'page' : undefined"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </template>

      <button
        type="button"
        class="base-pagination__button base-pagination__arrow"
        :disabled="currentPage === totalPages"
        aria-label="Halaman berikutnya"
        @click="goToPage(currentPage + 1)"
      >
        ›
      </button>
    </div>
  </nav>
</template>

<style scoped>
.base-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 16px 0;
  font-family: inherit;
}

.base-pagination__info {
  margin: 0;
  color: #667085;
  font-size: 12px;
}

.base-pagination__info strong {
  color: #344054;
  font-weight: 600;
}

.base-pagination__controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.base-pagination__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid transparent;
  border-radius: 7px;
  background: transparent;
  color: #475467;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.base-pagination__button:hover:not(:disabled) {
  background: #f2f4f7;
}

.base-pagination__button--active {
  border-color: #dce6ff;
  background: #edf2ff;
  color: #315fe8;
  font-weight: 700;
}

.base-pagination__button:disabled {
  color: #c0c5ce;
  cursor: not-allowed;
}

.base-pagination__arrow {
  border-color: #e7ebf3;
  background: #fff;
  font-size: 20px;
  line-height: 1;
}

.base-pagination__ellipsis {
  padding: 0 4px;
  color: #98a2b3;
  font-size: 13px;
}

.base-pagination__button:focus-visible {
  outline: 3px solid #a9c0ff;
  outline-offset: 2px;
}

@media (max-width: 520px) {
  .base-pagination {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .base-pagination__controls {
    flex-wrap: wrap;
  }
}
</style>
