export class HistoricalObjects {
    constructor({id=null,name="", coinId=null, collectionTypeId= "",
                    yearProduction=null, coinCollectionId=null, summary="",
                    legends= "", prince= "", registeredAt=""}={}) {
        this.id = id;
        this.name = name;
        this.coinCollectionId = coinCollectionId;
        this.yearProduction = yearProduction;
        this.collectionTypeId = collectionTypeId;
        this.legends = legends;
        this.prince = prince;
        this.registeredAt = registeredAt;
    }
}