import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn:'root'})
export class CrudService{
    constructor(private httpClient: HttpClient){
    }
    fetchUser() {
        return this.httpClient.get<any>("http://localhost:3000/class2");
    }
    delete(val) {
        return this.httpClient.request<any>("delete", 
            `http://localhost:3000/delete/${val}`, 
            );
    }
    update(updateData) {
        return this.httpClient.request<any>("put",     
            `http://localhost:3000/update/${updateData.empid}`, 
            { body: updateData });
    }
    addUser(newData) {
        return this.httpClient.request<any>("post", 
        `http://localhost:3000/addrow`, 
            { body: newData });
    }
}