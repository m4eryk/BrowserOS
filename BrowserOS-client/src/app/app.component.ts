import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
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
shortcut;

constructor(private _Data: DataService){ }



state = {
  Loading : true,
  Work : false,
  Off : false
}

getData = {
  getDataTable: (path) =>{
    return new Promise( (resolve, reject) =>{
      this._Data.getData.dataTable(path).subscribe(
        res => {  
          resolve(res)
        }
      )
    })
  },
  getTextValue: (path) =>{
    return new Promise( (resolve, reject) =>{
      this._Data.getData.textValue(path).subscribe(
        res => {
          resolve(res)
        }
      );
    })
  },
  getConfig : () => {
    return new Promise( (resolve, reject) => {
      this._Data.getData.config().subscribe(
        res => {
          resolve(res)
        }
      )
    })
  }
}

setData = {
  setTextValue: (obj) =>{
    this._Data.setData.setTextValue(obj).subscribe()
  },
  setConfig : (config) => {
   return new Promise( (resolve,reject) => {
    this._Data.setData.setConfig(config).subscribe(
      res => {
        resolve(res)
      })
    }) 
  }
}

creatData = {
  folder : (name) =>{
    this._Data.creatFile.creatFolder(name).subscribe()
  },
  textFile : (name) =>{
    this._Data.creatFile.creatTextFile(name).subscribe()
  }
}


message:object=[
  {
    name: 'Save',
    quest: "Quit without saving",
    destroy : (obj ) =>{
      this.app.messages.destroy(obj)
    },
    bild : (obj, param) =>{
      this.app.messages.bild(obj, param)
    },
    click: (obj) =>{
      this.app.messages.click(obj)
    }
  },
  {
    name: 'Alert',
    quest: "Player is active",
    destroy : (obj ) =>{
      this.app.messages.destroy(obj)
    },
    bild : (obj, param) =>{
      this.app.messages.bild(obj, param)
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
    bild : async (obj) => {
      var task = {
          url: obj.url,
          image:'../../assets/img/folder.png',
          name: obj.name,
          minimize: true,
          id: 0,
          type: obj.type,
          destroy: this.app.explorer.destroy,
          colappase: this.app.explorer.colappase,
          dir : null
      }
      task.dir = await this.getData.getDataTable(obj.url+'/')
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
      image: '/assets/img/player.png',
      name: obj.name,
      minimize: true,
      id: 0,
      type: obj.type,
      destroy: this.app.player.destroy,
      colappase: this.app.player.colappase,
      source : '../../../assets/FS/' + obj.url,
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
  messages:{
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
    bild : async (obj) => {
      var task ={
        image: '../../assets/img/text.png',
        name: obj.name,
        minimize: true,
        id: 0,
        type: obj.type,
        destroy: this.app.textreader.destroy,
        colappase: this.app.textreader.colappase,
        value: null,
        close: false,
        url : obj.url
      }
      task.value = await this.getData.getTextValue(obj.url)
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
        this.app.messages.bild(this.message[0], obj);
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
  this.shortcut = await this.getData.getDataTable('PC/DiskC/Desktop/');
  this.app.launcher.bild();
}

ngOnInit(){
  this.loading()
}

}


