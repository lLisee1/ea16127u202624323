<script setup>

import LanguageSwitcher from "./language-switcher.vue";
import {ref} from "vue";
import {useI18n} from "vue-i18n";
const { t } = useI18n();

const drawer = ref(false);
const toggleDrawer = () => {
  drawer.value = !drawer.value;
}
const items = [
  {label: 'option.home', to: '/home'},
  {label: 'option.about', to: '/about'},
  {label: 'option.collection', to: ''}
];
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <header class="absolute top-0 left-0 w-full">
    <pv-toolbar class="bg-primary">
      <template #start>
        <pv-button class="p-button-text" icon="pi pi-bars" @click="toggleDrawer"/>
      </template>
      <template #end>
        <div class="flex-column mr-3">
        </div>
        <language-switcher/>
      </template>
    </pv-toolbar>
    <pv-drawer v-model:visible="drawer"/>
  </header>
  <main class="mt-7">
    <router-view/>
  </main>
  <footer-content/>
</template>