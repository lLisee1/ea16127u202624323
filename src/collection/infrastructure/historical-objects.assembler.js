import {HistoricalObjects} from "@/collection/domain/model/historical-objects.entity.js";

export class HistoricalObjectsAssembler
{
    static toEntityFromResource(resource) {
        return new HistoricalObjects({...resource});
    }
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['categories'];

        return resources.map(resource => this.toEntityFromResource(resource));
    }
}