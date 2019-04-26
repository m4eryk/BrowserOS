import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Key } from 'protractor';


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

desktopIsActivete:boolean;



TS = {
  '0':{
    'name':'MyFolder',
    'type': 'folder',
    'key' : ['8']
  },
  '1':{
    'name':'YourFolder',
    'type':'folder',
    'key' :['2']
  },
  '2':{
    'name' : 'BlackHole',
    'type' : 'mp4',
    'key' : ['15']
  },
  '3' : {
    'name' : 'textFile',
    'type' : 'txt',
    'key' : ['18']
  },
  '4' : {
    'name' : 'Desktop',
    'type' : 'folder',
    'key' : ['0','1','2','3','5','13']
  },
  '5' : {
    'name' : 'PC',
    'type' : 'folder',
    'key' : ['6','7']
  },
  '6' : {
    'name' : 'DickC',
    'type' : 'folder',
    'key' : ['4']
  },
  '7' : {
    'name' : 'DickD',
    'type' : 'folder',
    'key' : ['2']
  },
  '8' : {
    'name' : 'folder1',
    'type' : 'folder',
    'key' : ['10','9']
  },
  '9' : {
    'name' : 'folder2',
    'type' : 'folder',
    'key' : ['11']
  },
  '10' : {
    'name' : 'folder3',
    'type' : 'folder',
    'key' : ['12']
  },
  '11' : {
    'name' : 'textFile',
    'type' : 'txt',
    'key' : ['17']
  },
  '12' : {
    'name' : 'textFile',
    'type' : 'txt',
    'key' : ['16']
  },
  '13' : {
    'name' : 'Краимбрери',
    'type' : 'mp3',
    'key' : ['14']
  },
  getData : (key:string[]) =>{
    var obj:object[]=[];
    for ( var i=0; i < key.length ; i++){
      obj.push(this.DataArray.get(key[i]));
    }
    return obj;
  }
}

Data = {
  '0' : this.TS[0],
  '1' : this.TS[1],
  '2' : this.TS[2],
  '3' : this.TS[3],
  '4' : this.TS[4],
  '5' : this.TS[5],
  '6' : this.TS[6],
  '7' : this.TS[7],
  '8' : this.TS[8],
  '9' : this.TS[9],
  '10' : this.TS[10],
  '11' : this.TS[11],
  '12' : this.TS[12],
  '13' : this.TS[13],
  '14': {
    'src' :"../assets/music/Мари Краимбрери – Ты полюби меня пьяную.mp3",
    'title' : "Ты полюби меня пьяную",
    'artist' : "Мари Краимбрери",
    'img' : '../assets/img/song/pyanay.jpg',
    'id': 0
  },
  '15' : {
    'src' : '../assets/video/videoplayback.mp4',
    'type' : 'video/mp4'
  },
  '16' : {
    'value' : ''
  },
  '17' : {
    'value' : ''
  },
  '18' : {
    'value' : ''
  },
 /* getTableElm: (key:string)=>{
      return this.Table.get(key);
    }
  }*/
}


Table = new Map(Object.entries(this.TS));
DataArray = new Map(Object.entries(this.Data));


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
      this.desktopIsActivete=true;
    },
    destroy : () => {
      let n= this.tasks.length;
      while(n--) {
          this.tasks.splice(n, 1);
      }
      this.desktopIsActivete=false;
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
          dir : this.TS.getData(obj.key),
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
      source : this.TS.getData(obj.key),
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
        value: this.TS.getData(obj.key),
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
  },
   
}

exit = () =>{
  this.app.launcher.destroy();
}

ngOnInit(){  
  var abj=this.DataArray.get('18')
 console.log(abj);
 this.app.launcher.bild();

}




}
