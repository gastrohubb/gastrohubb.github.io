import {Component, Input} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent {
  @Input()
  issue: Issue = new Issue(null);
  @Input()
  contextPath: string = "";


  constructor(private configService: ConfigService) {
  }

  public hasImages() {
    return this.issue.imageUuidContainer != undefined
        && this.issue.imageUuidContainer != null
        && this.issue.imageUuidContainer.length > 0;
  }

  getImgById(uuid: string) {
    return this.configService.filesEndpoint() + "/" + uuid;
  }
}
