import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {
    public apiUrl: string = "http://localhost:64973";
    constructor() { }

}
