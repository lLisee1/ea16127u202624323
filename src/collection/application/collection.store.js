import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {CollectionApi} from "../infrastructure/collection-api.js";
import {CollectionAssembler} from "../infrastructure/collection.assembler.js";
import {HistoricalObjectsAssembler} from "../infrastructure/historical-objects.assembler.js";
import {Collection} from "../domain/model/collection.entity.js";
import {HistoricalObjects} from "../domain/model/historical-objects.entity.js";

const collectionApi= new CollectionApi();

const useCollectionStore = defineStore('collection', ()=>{
    const collections = ref([]);
    const historicalObjects = ref([]);
    const errors = ref([]);
    const collectionsLoaded = ref(false);
    const historicalObjectsLoaded = ref(false);


    const collectionsCount = computed(() => {
        return collectionsLoaded ? collections.value.length : 0;
    });

    const historicalObjectsCount = computed(() => {
        return historicalObjectsLoaded ? historicalObjects.value.length : 0;
    });

    function fetchCollections() {
        collectionApi.getCollections().then(response => {
            collections.value = CollectionAssembler.toEntitiesFromResponse(response);
            collectionsLoaded.value = true;
            console.log(collectionsLoaded.value);
            console.log(historicalObjectsLoaded.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function getCollectionById(id) {
        let idNum = parseInt(id);
        return collections.value.find(collection => collection["id"] === idNum);
    }

    function addCollection(collection) {
        collectionApi.createCollection(collection).then(response => {
            const resource = response.data;
            const newCollection = CollectionAssembler.toEntityFromResource(resource);
            collections.value.push(newCollection);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function updateCollection(collection) {
        collectionApi.updateCollection(collection).then(response => {
            const resource = response.data;
            const updateCollection = CollectionAssembler.toEntityFromResource(resource);
            const index = collections.value.findIndex(c => c["id"] === updateCollection.id);
            if (index !== -1) collections.value[index] = updateCollection;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function deleteCollection(collection) {
        collectionApi.deleteCollection(collection).then(response => {
            const index = collections.value.findIndex(c => c["id"] === collection.id);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function fetchHistoricalObjects() {
        collectionApi.getHistoricalObjects().then(response => {
            historicalObjects.value = HistoricalObjectsAssembler.toEntitiesFromResponse(response);
            historicalObjectsLoaded.value = true;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function getHistoricalObjectsById(id) {
        let idNum = parseInt(id);
        return historicalObjects.value.find(collection => historicalObjects["id"] === idNum);
    }

    function addHistoricalObjects(historicalObjects) {
        collectionApi.createHistoricalObjects(historicalObjects).then(response => {
            const resource = response.data;
            const newHistoricalObject = HistoricalObjectsAssembler.toEntityFromResource(resource);
            collections.value.push(newHistoricalObject);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function updateHistoricalObject(historicalObject) {
        collectionApi.updateHistoricalObject(historicalObject).then(response => {
            const resource = response.data;
            const updateHistoricalObject = HistoricalObjectsAssembler.toEntityFromResource(resource);
            const index = historicalObjects.value.findIndex(c => c["id"] === updateHistoricalObject.id);
            if (index !== -1) historicalObjects.value[index] = updateHistoricalObject;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function deleteHistoricalObject(historicalObject) {
        collectionApi.deleteHistoricalObjects(historicalObject).then(response => {
            const index = historicalObjects.value.findIndex(c => c["id"] === historicalObject.id);
        }).catch(error => {
            errors.value.push(error);
        });
    }
});

export default useCollectionStore

