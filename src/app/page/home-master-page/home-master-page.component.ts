import {Component, HostListener, ViewChild} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {Router} from "@angular/router";
import {ConfigService} from "../../service/config.service";
import {ContextService} from "../../service/context.service";
import {GoogleMap, MapInfoWindow} from "@angular/google-maps";
import {MapBounds} from "../../dto/map-bounds";
import {interval} from "rxjs";

@Component({
    selector: 'app-home-master-page',
    templateUrl: './home-master-page.component.html',
    styleUrls: ['./home-master-page.component.css']
})
export class HomeMasterPageComponent {
    txtIssues: string = $localize `Issues`;
    issues: Issue[] = [];
    scrollThreshold: number = 1000;
    currentPage: number = 0;
    totalPages: number = 0;
    config: any;
    currentPagePath: any;
    contextPath: string;
    square: MapBounds = new MapBounds();

    constructor(private ghbClient: GhbServiceClientService,
                private router: Router,
                private configService: ConfigService,
                private context: ContextService) {
        this.contextPath = context.getAppContextPath();
    }

    ngOnInit() {
        this.currentPagePath = this.router.url;
        // this.getPageOfIssuesForInfiniteScrolling();
        interval(500).subscribe(() => {
            if (300 >= this.timer(this.mapPositionLastChange)) {
                this.mapDragEnded = false;
                this.mapRequestForAddressShouldBeSent = true;
            } else {
                this.mapDragEnded = true;
            }
            if(this.mapDragEnded && this.mapRequestForAddressShouldBeSent) {
                this.mapRequestForAddressShouldBeSent = false;
                this.getIssues();
            }
        });
    }


    private getPageOfIssuesForInfiniteScrolling() {
        this.ghbClient.getPageOfIssues(this.currentPage++)
            .pipe()
            .subscribe(page => {
                this.totalPages = page.page.totalPages;
                let embedded = page._embedded;
                let issuesList: Issue[] = embedded.issues as Issue[];
                issuesList.forEach((item) => this.issues.push(item));
            });
    }

// example of endless scroll selection of issues left here
    @HostListener('window:scroll', ['$event'])
    onWindowScroll(event: any) {
        console.log(window.scrollY + this.scrollThreshold)
        if (this.isScrolledToTheBottom() && this.hasNextPage()) {
            this.scrollThreshold = this.scrollThreshold / 10;
            this.ghbClient.getPageOfIssues(this.currentPage++)
                .pipe()
                .subscribe(page => {
                    let embedded = page._embedded;
                    let issuesList: Issue[] = embedded.issues as Issue[];
                    issuesList.forEach((item) => this.issues.push(item));
                    this.scrollThreshold = this.scrollThreshold * 10;
                });
        }
    }

    getIssues() {
        this.ghbClient.getIssuesByCoordinates(this.square)
            .pipe()
            .subscribe(list => {
                this.issues = [];
                let issuesList: Issue[] = list as Issue[];
                issuesList.forEach((item) => this.issues.push(item));
            });
    }

    private isScrolledToTheBottom(): boolean {
        return window.scrollY + this.scrollThreshold > document.body.scrollHeight;
    }

    private hasNextPage(): boolean {
        return this.currentPage < this.totalPages;
    }

    navigate() {
        this.ghbClient.getPageOfIssues(0).pipe()
            .subscribe(() => {
                this.ghbClient.getPageOfIssues(0).pipe().subscribe(() => {
                })
            });
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
            url: this.configService.apiUrl() + "/images/issue-icon.png",
        }
    };


    mapOptions: google.maps.MapOptions = {
        center: {lat: 54.36434462007318, lng: 18.63293695368719},
        zoom: 10
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
            this.square.right = this.mapBounds.Ha.hi;
            this.square.left = this.mapBounds.Ha.lo;
            this.square.top = this.mapBounds.Va.hi;
            this.square.bottom = this.mapBounds.Va.lo;
        }
    }

    onMapInitialized() {
        this.mapRef.zoom = 12;

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

    onMapIdle() {
        this.getUserLocation();
        this.onMapInitialized();
        this.getIssues();
    }

    // todo: this doesn't work: no click event on a marker.
    onMarkerClick(i: Issue) {
        window.open("/master/issues/"+i.issueId, '_blank');
    }
}
