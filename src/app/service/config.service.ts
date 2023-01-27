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
        return "http://54.93.221.63:8080";
    }
}

