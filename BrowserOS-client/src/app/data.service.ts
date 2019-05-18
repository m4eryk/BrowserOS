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
  private _dataTableUrl = 'http://localhost:3000/api/data';
  private _dataGiveUrl = 'http://localhost:3000/api/data/give'
  private _dataSetTextValueUrl = 'http://localhost:3000/api/data/setTextValue'

  constructor(private http: HttpClient) { }

  getData={
    dataTable: (patch) => {
      return this.http.post(this._dataTableUrl, patch)
    },
    textValue : (patch) => {
      return this.http.post(this._dataGiveUrl, patch)
    }
  }
  setData={
    set: (obj)=>{
      //return this.http.post<any>(this._dataSetUrl, obj)
    },
    setTextValue: (obj) =>{
     return this.http.post(this._dataSetTextValueUrl, obj)
    }
  }
}
