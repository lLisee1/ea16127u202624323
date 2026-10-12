<script setup>
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import useCollectionStore from "@/collection/application/collection.store.js";
import {computed, onMounted, ref} from "vue";
import {Collection} from "../../domain/model/collection.entity.js";

const {t} = useI18n();
const route = useRoute();
const router = useRouter();
const store = useCollectionStore();
const {errors, addCollection, updateCollection} = store;

const form = ref({title: ''});
const isEdit = computed(() => !!route.params.id);

onMounted(() => {
  console.log(route.params.id);
  if (isEdit.value) {
    const collection = getCollectionById(route.params.id);
    console.log(collection);
    if (collection) form.value.title = collection.title; else router.push({name: 'collection-collections'});
  }
});

function getCollectionById(id) {
  return store.getCollectionById(id);
}


const saveCollection = () => {
  const collection = new Collection({
    id: isEdit.value ? route.params.id : null,
    title: form.value.title,
  });
  if (isEdit.value) updateCollection(collection); else addCollection(collection);
  navigateBack();
};

const navigateBack = () => {
  router.push({name: 'collection-collections'});
};
</script>

<template>
  <div class="p-4">
    <h1>{{ isEdit ? t('collection.edit-title') : t('collection.new-title') }}</h1>
    <form @submit.prevent="saveCollection">
      <div class="field mb-3">
        <label for="name">{{ t('collection.title') }}</label>
        <pv-input-text id="title" v-model="form.title" class="w-full" required/>
      </div>
      <pv-button :label="t('collection.save')" icon="pi pi-save" type="submit"/>
      <pv-button :label="t('collection.cancel')" class="ml-2" severity="secondary" @click="navigateBack"/>
    </form>
    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
    </div>
  </div>
</template>

<style scoped>

</style>