export class ImageUuidContainer {
    uuid: string;
    imageUuid: string;
    thumbnailUuid: string;
    _links: any;

    constructor(uuid: string, imageUuid: string, thumbnailUuid: string, links: any) {
        this.uuid = uuid;
        this.imageUuid = imageUuid;
        this.thumbnailUuid = thumbnailUuid;
        this._links = links;
    }
}
