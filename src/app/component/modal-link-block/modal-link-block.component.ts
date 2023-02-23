import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-modal-link-block',
  templateUrl: './modal-link-block.component.html',
  styleUrls: ['./modal-link-block.component.css']
})
export class ModalLinkBlockComponent {
  @Input()
  title: any;
  @Input()
  subtitle: any;
  @Input()
  linkedToModalId: any;
}
