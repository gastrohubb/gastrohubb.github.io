import {Component, Input} from '@angular/core';
import {FileUploadService} from "../../service/file-upload.service";
import {catchError, Observable} from "rxjs";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {SessionUtilService} from "../../service/session-util.service";
import {GhbUser} from "../../dto/GhbUser";
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'app-brief-info-block',
  templateUrl: './brief-info-block.component.html',
  styleUrls: ['./brief-info-block.component.css']
})
export class BriefInfoBlockComponent {
  private readonly ENDPOINT: string;
  @Input()
  imgSrc: any;
  @Input()
  title: any;
  @Input()
  subtitle: any;
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
      this.imgSrc = this.ENDPOINT + "/" + user.imgUuid;
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
        const maxSize = 1024 * 1024 * 5;
        if (target.files[0].size >= maxSize) {
          alert(`File is too big`);
          return;
        }
        const pattern: RegExp = /^image\//;
        if (!pattern.test(target.files[0].type)) {
          alert(`Type not supported (not an image)`);
          return;
        }
        this.previewFile(target.files)
      }
    }
  }

  previewFile(files: FileList) {
    let file = files[0];
    const reader = new FileReader();
    reader.onload = () => this.imgSrc = reader.result;
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
          this.imgSrc = "./assets/tempimg/user1.jpg";
          return new Observable<never>();
        }))
      .subscribe(uuid => {
        this.imgSrc = this.ENDPOINT + "/" + uuid;
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
