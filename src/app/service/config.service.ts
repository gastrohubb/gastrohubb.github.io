import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(private http: HttpClient) {
    }

    public config(): Observable<string> {
        return this.http.get<string>("./assets/config/config.json");
    }

    public apiUrl(): string {
        // return "https://gastro.tutrit.com/";
        return "http://localhost:8080";
    }

    public filesEndpoint(): string {
        return this.apiUrl() + "/files"
    }
}

