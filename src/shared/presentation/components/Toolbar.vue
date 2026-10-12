<script setup>
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "./language-switcher.vue";

const { t } = useI18n();
</script>

<template>
  <footer class="absolute bottom-0 left-0 w-full border-none bg-primary mt-4 border-round-md shadow-1 p-3">
    <div class="flex flex-column align-items-center justify-content-center gap-2 text-center text-white">
      <p class="m-0 text-sm line-height-3">
        {{ t('toolbar.title') }}
        <i class="pi pi-heart text-pink-300" aria-hidden="true"/>
        {{ t('toolbar.content') }}
      </p>

    </div>
  </footer>
</template>