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
  private _dataTableUrl = 'http://localhost:3000/api/data/table';
  private _dataArrayUrl = 'http://localhost:3000/api/data/array';

  constructor(private http: HttpClient) { }

  getData={
    dataTable: ()=>{
      return this.http.get(this._dataTableUrl)
    },
    dataArray: ()=>{
      return this.http.get(this._dataArrayUrl)
    }
  }
}
