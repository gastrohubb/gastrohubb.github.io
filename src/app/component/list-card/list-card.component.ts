import {Component, Input} from '@angular/core';
import {Issue} from "../../dto/Issue";

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent {
  @Input()
  issue: Issue = new Issue();
}
