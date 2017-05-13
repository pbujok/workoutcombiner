import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { FileInput } from './models/fIleInput';
import { ConfigurationService } from './configuration.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

    constructor(private http: Http, private configuration: ConfigurationService) { }

    sendFile(files, name, person, priority): Promise<Response> {
        let data = new FormData();

        data.append("model.Name", name);
        data.append("model.Priority", JSON.stringify(priority));

        for (var prop in person) {
            data.append("model." + prop, person[prop]);
        }

        for (let x = 0; x < files.length; x++) {
            data.append(files[x].name, files[x]);
        }

        let promise = this.http.post(this.configuration.apiUrl + '/api/Merge', data)
            .toPromise();

        return promise;
    }
}
