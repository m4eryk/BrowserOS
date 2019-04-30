import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  private _dataFolderUrl = 'http://localhost:3000/api/data/folder';
  private _dataFileUrl = 'http://localhost:3000/api/data/file';

  constructor(private http: HttpClient) { }

  getData={
    folder : (key) => {
      let  obj = this.http.post<string[]>(this._dataFolderUrl, key);
      if(obj != null) { 
        return obj;
      }
    },
    file : (key) => {
      return this.http.post<string>(this._dataFileUrl, key)
     
    }
    
  }
}
