
<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  separator: {
    type: String,
    default: '/',
  },
})
</script>

<template>
  <nav aria-label="Breadcrumb" class="base-breadcrumb">
    <ol class="base-breadcrumb__list">
      <li
        v-for="(item, index) in items"
        :key="item.label"
        class="base-breadcrumb__item"
      >
        <span
          v-if="index > 0"
          class="base-breadcrumb__separator"
          aria-hidden="true"
        >
          {{ separator }}
        </span>

        <RouterLink
          v-if="item.to && index !== items.length - 1"
          :to="item.to"
          class="base-breadcrumb__link"
        >
          {{ item.label }}
        </RouterLink>

        <span
          v-else
          class="base-breadcrumb__current"
          aria-current="page"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.base-breadcrumb {
  width: 100%;
  overflow-x: auto;
}

.base-breadcrumb__list {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: max-content;
  margin: 0;
  padding: 0;
  list-style: none;
}

.base-breadcrumb__item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #98a2b3;
  font-size: 12px;
}

.base-breadcrumb__link {
  color: #667085;
  text-decoration: none;
  transition: color 0.15s;
}

.base-breadcrumb__link:hover {
  color: #315fe8;
}

.base-breadcrumb__link:focus-visible {
  outline: 2px solid #a9c0ff;
  outline-offset: 3px;
  border-radius: 3px;
}

.base-breadcrumb__current {
  color: #18243b;
  font-weight: 600;
}

.base-breadcrumb__separator {
  color: #c0c5ce;
  user-select: none;
}
</style>
