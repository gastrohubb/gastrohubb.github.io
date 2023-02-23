import {Component, Input} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {Master} from "../../dto/Master";

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.css']
})
export class MasterListComponent {
  @Input()
  masters: Master[] = [];
}
