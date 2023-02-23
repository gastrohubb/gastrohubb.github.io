import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-modal-link-with-icon-block-component',
  templateUrl: './modal-link-with-icon-block-component.component.html',
  styleUrls: ['./modal-link-with-icon-block-component.component.css']
})
export class ModalLinkWithIconBlockComponentComponent {
  @Input()
  title: any;
  @Input()
  subtitle: any;
  @Input()
  linkedToModalId: any;
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
