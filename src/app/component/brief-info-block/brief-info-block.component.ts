import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-brief-info-block',
  templateUrl: './brief-info-block.component.html',
  styleUrls: ['./brief-info-block.component.css']
})
export class BriefInfoBlockComponent {
  @Input()
  imgSrc: any = "./assets/tempimg/user1.jpg";
  @Input()
  title: any = "Mikas";
  @Input()
  subtitle: any = "the wisest enterpreneur";


}
