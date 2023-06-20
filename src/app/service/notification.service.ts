import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {interval, Subscription, takeUntil} from "rxjs";
import {ConfigService} from "./config.service";
import {SessionUtilService} from "./session-util.service";
import {AlertService} from "./alert.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationService implements OnDestroy {
    private interval$: Subscription = new Subscription();

    constructor(private http: HttpClient,
                private config: ConfigService,
                private session: SessionUtilService,
                private alerts: AlertService) {
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    startCheckingEndpoint() {
        this.interval$ = interval(10000).subscribe(() => {
                this.checkEndpoint();
            });
    }

    checkEndpoint() {
        this.http.get<any>(this.config.apiUrl() +'/notifications/'+  this.session.getUser().userId +'/'+'next-web').subscribe(
            response => {
                this.alerts.addAlert(response.message, response.notificationId)
                console.log(response);
            },
            error => {
                console.error(error);
            }
        );
    }

    private unsubscribe() {
        if (this.interval$) {
            this.interval$.unsubscribe();
        }
    }
}

