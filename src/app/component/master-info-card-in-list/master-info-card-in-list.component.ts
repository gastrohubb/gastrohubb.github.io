import {Component, Input} from '@angular/core';
import {Master} from "../../dto/Master";
import {ConfigService} from "../../service/config.service";

@Component({
    selector: 'app-master-info-card-in-list',
    templateUrl: './master-info-card-in-list.component.html',
    styleUrls: ['./master-info-card-in-list.component.css']
})
export class MasterInfoCardInListComponent {
    @Input()
    master: Master = new Master();

    constructor(private configService: ConfigService) {

    }

    getImgById(uuid: string) {
        return this.configService.filesEndpoint() + "/" + uuid;
    }
}
