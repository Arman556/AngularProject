import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn:'root'})
export class CrudService{
    constructor(private httpClient: HttpClient){
    }
    fetchUser() {
        return this.httpClient.get<any>("http://localhost:3000/fetchJsonData");
    }

}