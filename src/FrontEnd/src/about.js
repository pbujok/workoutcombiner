import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {DataConfiguration} from 'helpers/data-configuration';

@inject(DataConfiguration)
export class About {
    constructor(configuraton) {
        this.content = "";
        this.title = "";

        this.http = new HttpClient().configure(config => {
            config.withBaseUrl(configuraton.apiUrl);
        });
    }

    activate() {
        var that = this;
        this.http.fetch('/api/StaticPage/about')
            .then(response => response.json())
            .then(content => {
                that.title= content.title;
                that.content = content.description;
            });
    }

}