import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { async } from 'q';
import { deserialize } from 'serializer.ts/Serializer';
import {serialize} from "serializer.ts/Serializer";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

audio = new Audio();

playerActiv:boolean=false;

taskCount:number=0;
tasks:object[]=[];
openWind:number[]=[];
Table={};
DataArray={};
DataMap;
TableMap;
shortcut;


constructor(private _Data: DataService){ }



state = {
  Loading : true,
  Work : false,
  Off : false
}

getData={
  getDataTable: async () =>{
    this._Data.getData.dataTable().subscribe(
      res => this.Table=this.getData.returnObj(res, this.Table)
    )
  },
  getDataArray: async () =>{
    this._Data.getData.dataArray().subscribe(
      res => this.DataArray=this.getData.returnObj(res, this.DataArray)
    )
  },
  returnObj: (res, obj)=>{
    var objSerialize=deserialize<Object>(Object,res);
    
    obj={objSerialize};
    return obj.objSerialize
  },
  folder:(key:string[]) =>{
    var obj:object[]=[];
    for ( var i in key){
      var item=this.DataMap.get(key[i]);
      obj.push(this.getData.checkData(item, key[i]))
    }
    return obj;
  },
  file: (key:string) => {
    var item = this.DataMap.get(key)
    return this.getData.checkData(item, key);
  },
  checkData: (item, key)=>{
    if(item.ref){
      return this.TableMap.get(key);
    }
    else{
      return item
    }
  }
}

setData={
  setFolder: (obj) =>{
    this.TableMap.get('4').key.push(this.DataMap.size)
    this.TableMap.set(this.DataMap.size, obj)
    this.DataMap.set(this.DataMap.size, { 'ref' : true })
    this._Data.setData.set(obj).subscribe(
      res => console.log(res)
    )
  },
  setTextFile: (obj) =>{
    this.TableMap.get('4').key.push(this.DataMap.size)
    obj.key=this.DataMap.size
    this.TableMap.set(this.DataMap.size, obj)
    this.DataMap.set(this.DataMap.size, { 'value' : '' })
    this._Data.setData.set(obj).subscribe(
      res => console.log(res)
    )
  }
}


message:object=[
  {
    name: 'Save',
    quest: "Quit without saving",
    destroy : (obj ) =>{
      this.app.message.destroy(obj)
    },
    bild : (obj, param) =>{
      this.app.message.bild(obj, param)
    },
    click: (obj) =>{
      this.app.message.click(obj)
    }
  },
  {
    name: 'Alert',
    quest: "Player is active",
    destroy : (obj ) =>{
      this.app.message.destroy(obj)
    },
    bild : (obj, param) =>{
      this.app.message.bild(obj, param)
    }
  }
]

app = {
  launcher : {
    bild : () => {
      var task = {
          audio: this.audio,
          tasksList: this.tasks,
          id: 0,
          destroy: this.app.launcher.destroy,
      }
      task.id=this.taskCount;
      this.tasks.push(task);
      this.taskCount++;
      this.state.Work=true;
      this.state.Loading=false;
      this.state.Off=false;
    },
    destroy : () => {
      let n= this.tasks.length;
      while(n--) {
          this.tasks.splice(n, 1);
      }
      this.state.Work=false;
      this.state.Loading=false;
      this.state.Off=true;
    }
  },
  explorer :{  
    bild : (obj) => {
      var task = {
          image:'../../assets/img/folder.png',
          name: obj.name,
          minimize: true,
          id: 0,
          type: obj.type,
          destroy: this.app.explorer.destroy,
          colappase: this.app.explorer.colappase,
          dir : this.getData.folder(obj.key)
      }
      task.id=this.taskCount;
      this.tasks.push(task);
    this.taskCount++;
    },
    destroy : (obj) => {
      let n= this.tasks.length;
      while(n--) {
        if( this.tasks[n] && this.tasks[n].hasOwnProperty('id') && this.tasks[n]['id'] === obj.id ){
          this.tasks.splice(n, 1);
        }
      }
    },
    colappase : (param) =>{
      param.minimize=!param.minimize;
    }
  },
  setting :{
      bild : (obj) => {
        var task = {
            image: '../../assets/img/wranch.png',
            name: obj.name,
            minimize: true,
            id: 0,
            destroy: this.app.setting.destroy,
            colappase: this.app.setting.colappase,
            setting: obj.setting,
            desktopObj: obj.desktopObj
        }
        task.id=this.taskCount;
        this.tasks.push(task);
        this.taskCount++;
        
      },
      destroy : (obj) => {
        let n= this.tasks.length;
        while(n--) {
          if( this.tasks[n] && this.tasks[n].hasOwnProperty('id') && this.tasks[n]['id'] === obj.id ){
            this.tasks.splice(n, 1);
          }
        }
      },
      colappase : (param) =>{
        param.minimize=!param.minimize;
      }
  },
  player:{ 
    bild: (obj) => {
    var task ={
      image: '../../assets/img/player.png',
      name: obj.name,
      minimize: true,
      id: 0,
      type: obj.type,
      destroy: this.app.player.destroy,
      colappase: this.app.player.colappase,
      source : this.getData.file(obj.key),
      player: true,
      audio: this.audio
    }
    task.id=this.taskCount;
    this.tasks.push(task);
    this.taskCount++;
    },
    destroy : (obj) => {
      let n= this.tasks.length;
      while(n--) {
        if( this.tasks[n] && this.tasks[n].hasOwnProperty('id') && this.tasks[n]['id'] === obj.id ){
          this.tasks.splice(n, 1);
        }
      }
      this.audio.src=''
    },
    colappase : (param) =>{
      param.minimize=!param.minimize;
    }   
  },
  message:{
    bild: (obj, param) => {
      var task ={
        name: obj.name,
        id: 0,
        message: true,
        quest: obj.quest,
        destroy: obj.destroy,
        click: obj.click,
        obj: param
    }
    task.id=this.taskCount;
    this.tasks.push(task);
    this.taskCount++;
    },
    destroy : (obj) => {
      let n= this.tasks.length;
      while(n--) {
        if( this.tasks[n] && this.tasks[n].hasOwnProperty('id') && this.tasks[n]['id'] === obj.id ){
          this.tasks.splice(n, 1);
        }
      }
      obj.obj.close = false;
      obj.obj.value.change= true;
    },
    click : (obj) =>{
      let n= this.tasks.length;
      while(n--) {
        if( this.tasks[n] && this.tasks[n].hasOwnProperty('id') && this.tasks[n]['id'] === obj.id ){
          this.tasks.splice(n, 1);
        }
      }
      obj.obj.close = true;
      obj.obj.value.change= false;
    }
  },
  textreader :{
    bild : (obj) => {
      var task ={
        image: '../../assets/img/text.png',
        name: obj.name,
        minimize: true,
        id: 0,
        type: obj.type,
        destroy: this.app.textreader.destroy,
        colappase: this.app.textreader.colappase,
        value: this.getData.file(obj.key),
        close: false
      }
      task.id=this.taskCount;
      this.tasks.push(task);
      this.taskCount++;
    },
    destroy : (obj) => {
      if(!obj.value.change){
        let n= this.tasks.length;
        while(n--) {
          if( this.tasks[n] && this.tasks[n].hasOwnProperty('id') && this.tasks[n]['id'] === obj.id ){
            this.tasks.splice(n, 1);
          }
        }
      }else{
        this.app.message.bild(this.message[0], obj);
      }
    },
    colappase : (param) =>{
      param.minimize=!param.minimize;
    }
  }
}



exit = () =>{
  this.app.launcher.destroy();
}

async loading(){
  this.state.Loading=true;
  await this.getData.getDataTable();
  await this.getData.getDataArray();
  this.app.launcher.bild();
}

ngOnInit(){  
  this.loading()
  setTimeout(()=>{
    this.DataMap = new Map(Object.entries(this.DataArray))
    this.TableMap = new Map(Object.entries(this.Table))
    this.shortcut=this.getData.folder(this.getData.file('4').key)
    console.log(this.shortcut);
  },2000)
}

}


