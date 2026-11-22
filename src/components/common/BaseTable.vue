
<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  emptyText: {
    type: String,
    default: 'Belum ada data yang tersedia.',
  },
  minWidth: {
    type: String,
    default: '600px',
  },
})

const hasColumns = computed(() => props.columns.length > 0)

function getRowKey(row, index) {
  return row?.[props.rowKey] ?? index
}
</script>

<template>
  <div class="base-table">
    <div class="base-table__wrapper">
      <table
        class="base-table__table"
        :style="{ minWidth }"
      >
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="[
                `base-table__cell--${column.align || 'left'}`,
                column.headerClass,
              ]"
              :style="{ width: column.width }"
              scope="col"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>

        <tbody>
          <!-- Loading -->
          <tr v-if="loading">
            <td
              :colspan="columns.length || 1"
              class="base-table__message"
              role="status"
            >
              <span class="base-table__spinner"></span>
              Memuat data...
            </td>
          </tr>

          <!-- Empty -->
          <tr v-else-if="!rows.length || !hasColumns">
            <td
              :colspan="columns.length || 1"
              class="base-table__message"
            >
              <slot name="empty">
                {{ emptyText }}
              </slot>
            </td>
          </tr>

          <!-- Data -->
          <tr
            v-else
            v-for="(row, rowIndex) in rows"
            :key="getRowKey(row, rowIndex)"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              :class="[
                `base-table__cell--${column.align || 'left'}`,
                column.cellClass,
              ]"
            >
              <slot
                :name="`cell-${column.key}`"
                :row="row"
                :value="row[column.key]"
                :index="rowIndex"
              >
                {{ row[column.key] ?? '-' }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.base-table {
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--border, #e7ebf3);
  border-radius: 12px;
  background: #fff;
}

.base-table__wrapper {
  width: 100%;
  overflow-x: auto;
}

.base-table__table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-family: inherit;
  font-size: 13px;
  text-align: left;
}

.base-table thead {
  background: #f8f9fc;
}

.base-table th {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border, #e7ebf3);
  color: #667085;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.base-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #f0f2f6;
  color: #344054;
  line-height: 1.5;
}

.base-table tbody tr:last-child td {
  border-bottom: none;
}

.base-table tbody tr:hover {
  background: #fafbff;
}

.base-table__cell--left {
  text-align: left;
}

.base-table__cell--center {
  text-align: center;
}

.base-table__cell--right {
  text-align: right;
}

.base-table__message {
  height: 120px;
  text-align: center !important;
  color: #98a2b3 !important;
}

.base-table__spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 2px solid #dce6ff;
  border-top-color: var(--blue, #315fe8);
  border-radius: 50%;
  vertical-align: middle;
  animation: base-table-spin 0.7s linear infinite;
}

@keyframes base-table-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .base-table__spinner {
    animation: none;
  }
}
</style>
