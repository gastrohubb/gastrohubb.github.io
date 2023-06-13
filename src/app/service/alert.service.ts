import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    alerts: any[] = [];

    constructor() {

    }

    addAlert(message: string, elementId: string) {
        const alert = {message, elementId};
        this.alerts.push(alert);

        setTimeout(() => {
            this.dismissAlert(alert);
        }, 50000 + 1000 * this.alerts.length);
    }

    dismissAlert(alert: any) {
        const index = this.alerts.indexOf(alert);
        if (index !== -1) {
            this.alerts.splice(index, 1);
        }
    }
}
