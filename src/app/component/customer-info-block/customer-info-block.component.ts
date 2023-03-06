import {Component, Input} from '@angular/core';
import {Master} from "../../dto/Master";
import {GhbUser} from "../../dto/GhbUser";
import {FileUploadService} from "../../service/file-upload.service";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {SessionUtilService} from "../../service/session-util.service";
import {ConfigService} from "../../service/config.service";
import {catchError, Observable} from "rxjs";
import {Customer} from "../../dto/Customer";

@Component({
  selector: 'app-customer-info-block',
  templateUrl: './customer-info-block.component.html',
  styleUrls: ['./customer-info-block.component.css']
})
export class CustomerInfoBlockComponent {
  private readonly ENDPOINT: string;
  @Input()
  customer: Customer = new Customer(null);
  @Input()
  user: GhbUser = new GhbUser();

  @Input()
  defaultImage: any = "./assets/tempimg/user/1.jpg";
  @Input()
  defaultTitle: any = "Maksim Shelkovich";
  @Input()
  subtitle: any = "Description for specialization";
  fileList: any;


  constructor(private fileUploadService: FileUploadService,
              private userClient: GhbServiceClientService,
              private sessionService: SessionUtilService,
              private config: ConfigService) {

    this.ENDPOINT = config.apiUrl() + "/files";
  }

  ngOnInit() {
    let user: GhbUser = this.sessionService.getUser();
    if (user.imgUuid != undefined) {
      this.defaultImage = this.ENDPOINT + "/" + user.imgUuid;
    }
  }

  // At the drag drop area (drop)="onDropFile($event)"
  onDropFile(event: DragEvent) {
    event.preventDefault();
    if (event != null && event.dataTransfer != null) {
      // this.uploadFile(event.dataTransfer.files);
    }
  }

  // At the drag drop area (dragover)="onDragOverFile($event)"
  onDragOverFile(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }

  // At the file input element (change)="selectFile($event)"
  selectFile(event: Event) {
    if (event != null && event.target != null) {
      const target = event.target as HTMLInputElement;
      if (target.files != null && target.files[0] != null) {
        this.previewFile(target.files)
      }
    }
  }

  previewFile(files: FileList) {
    let file = files[0];
    const reader = new FileReader();
    reader.onload = () => this.defaultImage = reader.result;
    reader.readAsDataURL(file);
    this.fileList = files;
  }

  uploadFile(files: FileList) {
    if (files.length == 0) {
      console.log("No file selected!");
      return
    }
    let file: File = files[0];

    this.fileUploadService.uploadFile(this.ENDPOINT, file)
        .pipe(
            catchError(error => {
              console.log("Upload Error:", error);
              this.defaultImage = "./assets/tempimg/user1.jpg";
              return new Observable<never>();
            }))
        .subscribe(uuid => {
          this.defaultImage = this.ENDPOINT + "/" + uuid;
          let user: GhbUser = this.sessionService.getUser();
          user.imgUuid = uuid;
          this.userClient.updateUser(user).subscribe(
              userUpdated => this.sessionService.putUser(userUpdated));
        });
  }

  save() {
    this.uploadFile(this.fileList);
  }
}
