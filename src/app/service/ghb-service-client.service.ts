import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GhbUser} from "../dto/GhbUser";
import {catchError, lastValueFrom, Observable} from "rxjs";
import {NewUser} from "../dto/NewUser";
import {Master} from "../dto/Master";
import {SessionUtilService} from "./session-util.service";
import {Customer} from "../dto/Customer";
import {Issue} from "../dto/Issue";
import {FileUploadService} from "./file-upload.service";
import {ConfigService} from "./config.service";
import {MasterApplyIssueEvent} from "../dto/MasterApplyIssueEvent";
import {KeycloakUser} from "../dto/KeycloakUser";
import {MapBounds} from "../dto/map-bounds";

@Injectable({
    providedIn: 'root'
})
export class GhbServiceClientService {
    private readonly uri: string;

    constructor(private http: HttpClient,
                private sessionService: SessionUtilService,
                private fileUploadService: FileUploadService,
                private config: ConfigService) {

        this.uri = config.apiUrl();
    }

    public registerUser(user: NewUser): Observable<GhbUser> {
        return this.http.post<GhbUser>(this.uri + "/register", user);
    }

    public getOrCreateUser(user: KeycloakUser): Observable<GhbUser> {
        return this.http.post<GhbUser>(this.uri + "/getOrCreateUser", user);
    }

    public registerKeycloakUser(user: KeycloakUser): Observable<GhbUser> {
        return this.http.post<GhbUser>(this.uri + "/register", user);
    }

    public async registerNewUser(user: GhbUser): Promise<GhbUser> {
        const observable = this.http.post<GhbUser>(this.uri + "/register", user);
        const newUser = await lastValueFrom(observable);
        return newUser;
    }

    public getUserById(userId: string): Observable<GhbUser> { //todo: add session token
        return this.http.get<GhbUser>(this.uri + "/ghbUsers/" + userId);
    }

    public async findUserByKeycloakId(keycloakId: string): Promise<GhbUser> {
        const observable = this.http.get<GhbUser>(this.uri + "/ghbUsers/search/findByKeycloakId?keycloakId=" + keycloakId);
        const result = await lastValueFrom(observable);
        return result;
    }


    public findUserByEmail(email: string): Observable<GhbUser> {
        return this.http.get<GhbUser>(this.uri + "/ghbUsers/search/findByEmail?email=" + email);
    }

    public findUserByEmailAndPassword(email: string, password: string): Observable<GhbUser> {
        return this.http.get<GhbUser>(this.uri + "/login?email=" + email + "&password=" + password);
    }

    public findMasterByGhbUserId(id: string): Observable<Master> {
        console.log("1");
        return this.http.get<Master>(this.uri + "/masters/search/findByGhbUser_UserId?ghbUserId=" + id);
    }

    public findCustomerByGhbUserId(id: string): Observable<Customer> {
        console.log("2");
        console.log(console.log(this.sessionService.getUser()));
        this.sessionService.getUserKeycloakProfile().then(p => console.log("keycloak user " + p));
        return this.http.get<Customer>(this.uri + "/customers/search/findByGhbUser_UserId?ghbUserId=" + id);
    }
    public async findCustomerByGhbUserIdAwait(id: string): Promise<Customer | null> {
        console.log("3");
        const response = await this.http.get<Customer>(this.uri + "/customers/search/findByGhbUser_UserId?ghbUserId=" + id).toPromise();
        if (response === undefined) {
            return null;
        }
        return response;
    }

    public updateUser(user: GhbUser): Observable<GhbUser> {
        return this.http.patch<GhbUser>(this.uri + "/ghbUsers/" + user.userId, user);
    }

    public getPageOfIssuesForByUserId(page: number, userId: string): Observable<any> {
        return this.http.get<Issue>(this.uri + "/issues/search/findAllByCustomer_GhbUser_UserId?projection=full&userId=" + userId + "&size=20&page=" + page + "&sort=timestamp,desc");
    }

    public getPageOfIssues(page: number): Observable<any> {
        return this.http.get<Issue>(this.uri + "/issues/?projection=full&size=20&page=" + page + "&sort=timestamp,desc");
    }

    public getIssuesByCoordinates(mapBounds: MapBounds): Observable<any> {
        return this.http.post<Issue>(this.uri + "/search/issues", mapBounds);
    }

    // public getIssuesByCoordinates(mapBounds: MapBounds): Observable<any> {
    //     return this.http.get<Issue>(this.uri + "/search/issues/"+mapBounds.left+"/"+mapBounds.right+"/"+mapBounds.top+"/"+mapBounds.bottom+"/");
    // }

    public getPageOfMasters(page: number): Observable<any> {
        return this.http.get<Issue>(this.uri + "/masters/?projection=full&size=20&page=" + page);
    }

    public findIssueById(uuid: string): Observable<Issue> {
        return this.http.get<Issue>(this.uri + "/issues/" + uuid);
    }

    public findIssueByIdFull(uuid: string): Observable<Issue> {
        return this.http.get<Issue>(this.uri + "/issues/" + uuid + "?projection=full");
    }

    public updateIssue(issue: Issue) {
        this.http.put<Issue>(this.uri + "/issues/" + issue.issueId, issue).subscribe();
    }

    public saveNewMaster(master: Master) {
        this.http.post<any>(this.uri + "/masters/", master)
            .pipe() //todo: handle exception
            .subscribe(m => {
                let masterToUserEndpoint: string = m._links.ghbUser.href;
                let user: GhbUser = this.sessionService.getUser();
                let userLink = user._links.self.href;
                let headers = new HttpHeaders();
                headers = headers.set('content-type', 'text/uri-list');
                console.log(masterToUserEndpoint);
                this.http.put(masterToUserEndpoint, userLink, {headers})
                    .pipe(
                        catchError(error => {
                            console.log("post assotiated link Error:", error);
                            return new Observable<never>();
                        }))
                    .subscribe();
            })
    }

    public saveNewCustomer(customer: Customer) {
        this.http.post<any>(this.uri + "/customers/", customer)
            .pipe() //todo: handle exception
            .subscribe(c => {
                let costomerToUserEndpoint: string = c._links.ghbUser.href;
                let user: GhbUser = this.sessionService.getUser();
                let userLink = user._links.self.href;
                let headers = new HttpHeaders();
                headers = headers.set('content-type', 'text/uri-list');
                console.log(costomerToUserEndpoint);
                this.http.put(costomerToUserEndpoint, userLink, {headers})
                    .pipe(
                        catchError(error => {
                            console.log("post assotiated link Error:", error);
                            return new Observable<never>();
                        }))
                    .subscribe();
            })
    }

    // todo: preferable way - to have all process in one method and return issueId;
    private saveNewIssue(newIssue: Issue, files: FileList) {
        this.saveIssue(newIssue)
            .pipe(catchError(error => {
                console.log("error saving issue:", error);
                return new Observable<never>();
            }))
            .subscribe(issue => {
                this.associateCustomerToIssue(issue.issueId);
                this.saveIssueImages(files, issue.issueId);
            })
    }

    public saveIssue(newIssue: Issue): Observable<Issue> {
        return this.http.post<Issue>(this.uri + "/issues/", newIssue);
    }

    public saveCustomerIssueWithImages(formData: FormData): Observable<Issue> {
        formData.append('ghbUserId', this.sessionService.getUser().userId);
        return this.http.post<Issue>(this.uri + "/customerCreateIssueWithImages/", formData);
    }

    public getAddressByCoordinate(lat: string, lng: string): Observable<any> {
        return this.http.get<any>(this.uri + "//api/geocode/json/"+lat+"/"+lng+"/");
    }

    public saveCustomerIssue(newIssue: Issue): Observable<Issue> {
        const data = {
            ghbUserId: this.sessionService.getUser().userId,
            issue: newIssue
        };
        return this.http.post<Issue>(this.uri + "/customerCreateIssue/", data);
    }

    private associateCustomerToIssue(issueId: string) {
        this.findIssueById(issueId)
            .pipe()
            .subscribe(issue => {
                let issueToCustomerEndpoint: string = issue._links.customer.href;
                let substringUrlFrom = issueToCustomerEndpoint.indexOf("{?projection}");
                issueToCustomerEndpoint = issueToCustomerEndpoint.substring(0, substringUrlFrom);
                let user: GhbUser = this.sessionService.getUser();
                this.findCustomerByGhbUserId(user.userId)
                    .pipe(catchError(error => {
                        console.log("findCustomerByGhbUserId Error:", error);
                        return new Observable<never>();
                    }))
                    .subscribe(customer => {
                        let customerLink = customer._links.self.href;
                        let headers = new HttpHeaders();
                        headers = headers.set('content-type', 'text/uri-list');
                        this.http.put(issueToCustomerEndpoint, customerLink, {headers})
                            .pipe(
                                catchError(error => {
                                    console.log("post assotiated link Error:", error);
                                    return new Observable<never>();
                                }))
                            .subscribe();
                    })
            })
    }

    public saveIssueImages(files: FileList, issueId: string) {
        this.fileUploadService.uploadFile(this.uri + "/files", files[0])
            .pipe(catchError(error => {
                console.log("save issue image error:", error);
                return new Observable<never>();
            }))
            .subscribe(id => {
                this.findIssueById(issueId)
                    .pipe(catchError(error => {
                        console.log("save issue image error:", error);
                        return new Observable<never>();
                    }))
                    .subscribe(issue => {
                        issue.photo = this.uri + "/files/" + id;
                        this.updateIssue(issue);
                    });
            })
    }

    public saveMasterApplyIssueEvent(userId: string, issueId: string): Observable<MasterApplyIssueEvent> {
        const data = {
            ghbUserId: userId,
            issueId: issueId
        };
        return this.http.post<MasterApplyIssueEvent>(this.uri + "/userApplyIssue/", data);
    }

    public getMasterApplyIssueEvent(userId: string, issueId: string): Observable<MasterApplyIssueEvent> {
        const data = {
            ghbUserId: userId,
            issueId: issueId
        };
        return this.http.post<MasterApplyIssueEvent>(this.uri + "/getMasterApplyEventsForIssue/", data);
    }

    public getIssuesMasterAppliedOn(userId: string): Observable<MasterApplyIssueEvent[]> {
        return this.http.get<MasterApplyIssueEvent[]>(this.uri + "/getIssuesMasterAppliedOn/" + userId);
    }

    public getIssuesWhereMasterApproved(userId: string): Observable<MasterApplyIssueEvent[]> {
        return this.http.get<MasterApplyIssueEvent[]>(this.uri + "/getIssuesWhereMasterApproved/" + userId);
    }

    public getAllMastersThatAppliedOnIssue(issueId: string): Observable<MasterApplyIssueEvent[]> {
        return this.http.get<MasterApplyIssueEvent[]>(this.uri + "/getMastersApplicationsOnIssue/" + issueId);
    }

    public getForCustomerAllIssuesWhereMasterApproved(userId: string): Observable<MasterApplyIssueEvent[]> {
        return this.http.get<MasterApplyIssueEvent[]>(this.uri + "/getForCustomerAllIssuesWhereMasterApproved/" + userId);
    }

    public registerNewCustomer(customer: Customer): Observable<Customer> {
        const data = {
            name: customer.name,
            phone: customer.phone,
            ownerName: customer.ownerName,
            ghbUser: this.sessionService.getUser()
        }
        return this.http.post<Customer>(this.uri + "/register/newCustomer", data);
    }

    public registerNewMaster(master: Master): Observable<Master> {
        const data = {
            name: master.name,
            photo: master.photo,
            domain: master.domain,
            experience: master.experience,
            workplace: master.workplace,
            ghbUser: this.sessionService.getUser()
        }
        return this.http.post<Master>(this.uri + "/register/newMaster", data);
    }
}
