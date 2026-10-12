import {BaseApi} from "@/shared/infrastructure/base-api.js";
import {BaseEndpoint} from "@/shared/infrastructure/base-endpoint.js";

const collectionEndpointPath = import.meta.env.VITE_COLLECTIONS_ENDPOINT_PATH;
const historicalObjectsEndpointPath= import.meta.env.VITE_HISTORICALOBJECTS_ENDPOINT_PATH;

export class CollectionApi extends BaseApi {
    #collectionEndpoint;
    #historicalObjectsEndpoint;

    constructor() {
        super();
        this.#collectionEndpoint = new BaseEndpoint(this, collectionEndpointPath);
        this.#historicalObjectsEndpoint = new BaseEndpoint(this, historicalObjectsEndpointPath);
    }

    getCollections(){
        return this.#collectionEndpoint.getAll();
    }
    getCollectionById(id){
        return this.#collectionEndpoint.getById(id);
    }

    createCollection(resource){
        return this.#collectionEndpoint.create(resource);
    }

    deleteCollection(id){
        return this.#collectionEndpoint.delete(id);
    }

    getHistoricalObjects(){
        return this.#historicalObjectsEndpoint.getAll();
    }
    getHistoricalObjectsById(id){
        return this.#historicalObjectsEndpoint.getById(id);
    }

    createHistoricalObjects(resource){
        return this.#historicalObjectsEndpoint.create(resource);
    }

    deleteHistoricalObjects(id){
        return this.#historicalObjectsEndpoint.delete(id);
    }
}