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
  private _dataGiveUrl = 'http://localhost:3000/api/data/give';
  private _dataGetConfigUrl = 'http://localhost:3000/api/data/getConfig'; 
  private _dataSetConfigUrl = 'http://localhost:3000/api/data/setConfig';
  private _dataSetTextValueUrl = 'http://localhost:3000/api/data/setTextValue';
  private _dataCreatNewFolder = 'http://localhost:3000/api/data/creatFolder';
  private _dataCreatNewTextFile = 'http://localhost:3000/api/data/creatTextFile';

  constructor(private http: HttpClient) { }

  getData={
    dataTable: (patch) => {
      return this.http.post(this._dataTableUrl, patch)
    },
    textValue : (patch) => {
      return this.http.post(this._dataGiveUrl, patch)
    },
    config : () => {
      return this.http.get(this._dataGetConfigUrl)
    }
  }
  setData={
    set: (obj)=>{
      //return this.http.post<any>(this._dataSetUrl, obj)
    },
    setTextValue: (obj) =>{
     return this.http.post(this._dataSetTextValueUrl, obj)
    },
    setConfig: (config) => {
      return this.http.post(this._dataSetConfigUrl, config)
    }
  }
  creatFile = {
    creatFolder: (name) =>{
      return this.http.post(this._dataCreatNewFolder, name)
    },
    creatTextFile: (name) =>{
      return this.http.post(this._dataCreatNewTextFile, name)
    }
  }
}
