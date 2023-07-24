import {Component, Input, ViewChild} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {catchError, interval, Observable, Subscription, Timestamp} from "rxjs";
import {Router} from "@angular/router";
import {ContextService} from "../../service/context.service";
import {SessionUtilService} from "../../service/session-util.service";
import {GoogleMap, MapInfoWindow} from "@angular/google-maps";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../service/config.service";

@Component({
    selector: 'app-issue-form',
    templateUrl: './issue-form.component.html',
    styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent {
    issue: Issue = new Issue(null);
    fileList: File[] = [];
    imgSrcList: string[] = [];
    errorMessage: any;
    @Input()
    previousPage: any;


    constructor(private ghbClient: GhbServiceClientService,
                private router: Router,
                private context: ContextService,
                private session: SessionUtilService,
                private config: ConfigService) {

    }

    ngOnInit() {
        let path: string = this.context.getAppContextPath();
        this.previousPage = path + "/home";
        console.log("is customer info filled? " + this.session.checkIfCustomerFillInfo())
        this.session.checkIfCustomerFillInfo().then(test => {
            if (!test) {
                let path: string = this.context.getAppContextPath();
                this.router.navigate([path + '/profile'])
            }
        });


        // todo: navigation to previous page stops working, fix it. for now navigating to home.
        // this.router.events
        //     .pipe(filter((e: any) => e instanceof RoutesRecognized),
        //         pairwise()
        //     ).subscribe((e: any) => {
        //     this.previousPage = e[0].urlAfterRedirects;
        //     console.log(e[0].urlAfterRedirects);
        // });
        interval(500).subscribe(() => {
            if (300 >= this.timer(this.mapPositionLastChange)) {
                this.mapDragEnded = false;
                this.mapRequestForAddressShouldBeSent = true;
            } else {
                this.mapDragEnded = true;
            }
            if(this.mapDragEnded && this.mapRequestForAddressShouldBeSent) {
                this.mapRequestForAddressShouldBeSent = false;
                this.getAddressByCoordinates();
            }
        });

        this.getUserLocation();

        this.getAddressByUserLocation();
    }

    save() {
        if (!this.fileList
            || !this.issue.description) {
            this.errorMessage = $localize`All fields are required`;
            return;
        }
        const issueFormData = this.prepareFormData(this.issue);
        this.ghbClient.saveCustomerIssueWithImages(issueFormData)
            .pipe(catchError(error => {
                return new Observable<never>();
            }))
            .subscribe(issue => {
                this.issue = new Issue(null);
                this.imgSrcList = [];
                this.fileList = [];
                this.errorMessage = null;
                let path: string = this.context.getAppContextPath();
                this.router.navigate([path + '/issues', issue.issueId]);
            });
    }

    prepareFormData(issue: Issue): FormData {
        issue.address = this.address;
        issue.lat = this.mapCenterLat;
        issue.lng = this.mapCenterLng;
        const formData = new FormData();
        formData.append(
            'issue',
            new Blob([JSON.stringify(issue)], {type: 'application/json'})
        );

        for (const element of this.fileList) {
            formData.append('images', element);
        }
        return formData;
    }

    back() {
        console.log(this.previousPage)
        this.router.navigate([this.previousPage]);
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
        if (event && event.target) {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                const selectedFiles = Array.from(target.files);
                const validationError = this.validateFiles(selectedFiles);
                if (!validationError) {
                    this.fileList.push(...selectedFiles);
                    this.previewFile(this.fileList);
                } else {
                    this.errorMessage = validationError;
                }
            }
        }
    }

    validateFiles(files: File[]): string | null {
        const maxSizePerFile = 1024 * 1024 * 5;
        const maxSizeTotal = 1024 * 1024 * 6;
        const pattern: RegExp = /^image\//;
        let totalSize = this.fileList.reduce((sum, file) => sum + file.size, 0);

        for (const file of files) {
            if (file.size > maxSizePerFile) {
                console.log(`File "${file.name}" is too big. Maximum file size is 5MB`)
                return `File "${file.name}" is too big. Maximum file size is 5MB`;
            }

            if (!pattern.test(file.type)) {
                console.log(`File "${file.name}" is not an image`)
                return `File "${file.name}" is not an image`;
            }
            totalSize += file.size;
        }

        if (totalSize > maxSizeTotal) {
            console.log("The total size of selected files exceeds the maximum limit of 50MB")
            return "The total size of selected files exceeds the maximum limit of 50MB";
        }

        return null;
    }

    previewFile(files: File[]) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = () => {
                this.imgSrcList[i] = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    // map
    @ViewChild(GoogleMap) mapRef!: GoogleMap;
    @ViewChild(GoogleMap) infoWindow!: MapInfoWindow;
    mapPositionLastChange: Date = new Date();
    mapDragEnded: boolean = false;
    mapRequestForAddressShouldBeSent = false;
    markerOptions: google.maps.MarkerOptions = {
        draggable: true,
        icon: {
            url: this.config.apiUrl() + "/images/issue-icon.png",
        }
    };


    mapOptions: google.maps.MapOptions = {
        center: {lat: 54.36434462007318, lng: 18.63293695368719},
        zoom: 18
    }

    topLeftMarker = {lat: 54.365282248788155, lng: 18.636155604505067}
    topRightMarker = {lat: 54.36340696995359, lng: 18.629718302869325}
    bottomLeftMarker = {lat: 54.36340696995359, lng: 18.636155604505067}
    bottomRightMarker = {lat: 54.365282248788155, lng: 18.629718302869325}

    centerMarker = {lat: 52.2255582, lng: 21.0421164}
    mapCenter: any;
    mapCenterLat: any;
    mapCenterLng: any;
    address: any;

    ngAfterViewInit(): void {
        this.onMapCenterChanged();
    }


    getMarkers() {
        let marker1 = {position: {lat: 54.36434462007318, lng: 18.63393695368719}};
        let marker2 = {position: {lat: 54.36434462007318, lng: 18.63493695368719}};
        let marker3 = {position: {lat: 54.36434462007318, lng: 18.63593695368719}};
        return [marker1, marker2, marker3];
    }

    onMapCenterChanged() {
        this.mapPositionLastChange = new Date();

        this.mapCenterLng = this.mapRef.getCenter()?.lng();
        this.mapCenterLat = this.mapRef.getCenter()?.lat();
        if (this.mapCenterLng !== undefined && this.mapCenterLat !== undefined) {
            this.centerMarker = {lat: this.mapCenterLat, lng: this.mapCenterLng};
        }

        this.mapBounds = this.mapRef.getBounds();
        if (this.mapBounds) {
            this.topLeft = this.mapBounds.getNorthEast();
            this.topRight = this.mapBounds.getSouthWest();
            this.bottomLeft = this.mapBounds.getSouthWest();
            this.bottomRight = this.mapBounds.getNorthEast();
        }
    }

    onDragEnd() {
        alert("Drag ended");
    }

    mapBounds: any;
    topLeft: google.maps.LatLngLiteral | undefined;
    topRight: google.maps.LatLngLiteral | undefined;
    bottomLeft: google.maps.LatLngLiteral | undefined;
    bottomRight: google.maps.LatLngLiteral | undefined;

    getAddressByCoordinates(): void {
        this.ghbClient.getAddressByCoordinate(this.mapCenterLat, this.mapCenterLng).subscribe(response => {
            this.address = response.results[0].formatted_address;
        });
    }

    // todo: make address being requested based on user location.
    getAddressByUserLocation(): void {
        this.ghbClient.getAddressByCoordinate(54.36434462007318.toString(), 18.63393695368719.toString()).subscribe(response => {
            this.address = response.results[0].formatted_address;
        });
    }

    getUserLocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // User location obtained successfully
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.mapOptions.center = userLocation;
                    console.log('User location:', userLocation);
                },
                (error) => {
                    // Error occurred while retrieving user location
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            // Geolocation is not supported by the browser
            console.error('Geolocation is not supported.');
        }
    }

    timer(endDate: Date): number {
        const now = new Date();
        const diff: number =  now.getTime() - endDate.getTime();
        return diff;
    }
}
