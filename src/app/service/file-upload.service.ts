import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  public uploadFile(url: string, file: File): Observable<any> {
    let formData = new FormData();
    formData.append('multipartFile', file);

    const headers = new HttpHeaders();
    return this.http.post<string>(url, formData, { headers, responseType: 'text' as 'json' });
  }
}
