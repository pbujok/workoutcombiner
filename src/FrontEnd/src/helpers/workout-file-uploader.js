import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DataConfiguration} from 'helpers/data-configuration';

@inject(DataConfiguration, EventAggregator)
export class WorkoutFileUploader {
    constructor(configuration, eventAggregator) {
        this.configuration = configuration;
        this.eventAggregator = eventAggregator;
    }

    postFileAjax(files, name, person, priority) {
        let data = new FormData(),
            that = this,
            deferred = jQuery.Deferred();

        data.append("model.Name", name);
        data.append("model.Priority", JSON.stringify(priority));

        for(var prop in person){
            data.append("model." + prop, person[prop]);
        }

        for (let x = 0; x < files.length; x++){
            data.append(files[x].name, files[x]);
        }


        $.ajax({
            type: "post",
            url: this.configuration.apiUrl + '/api/Merge',
            contentType: false,
            processData: false,
            data: data,
            success: function(response) {
                var data = new Blob([response.documentElement.outerHTML], {type: 'text/xml'});
                saveAs(data, name + '.tcx');
                deferred.resolve();
            },
            error: function (xhr, status, err) {
                deferred.reject(xhr.responseText);
            }
        });

        return deferred;
    }
}