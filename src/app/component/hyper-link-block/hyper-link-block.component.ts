import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hyper-link-block',
  templateUrl: './hyper-link-block.component.html',
  styleUrls: ['./hyper-link-block.component.css']
})
export class HyperLinkBlockComponent {
  @Input()
  iconClass: any;
  @Input()
  iconColorClass: any;
  @Input()
  text: any;
  @Input()
  hyperLink: any;

  getColImgStyle() {
    return this.iconClass + " " + this.iconColorClass + " text-white p-2 rounded-circle mr-2";
  }
}
