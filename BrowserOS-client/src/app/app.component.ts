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
openWind:number[]=[];


constructor(private _Data: DataService){ }



state = {
  Loading : true,
  Work : false,
  Off : false
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
         // dir :
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
      //source : this.TS.getData.file(obj.key),
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
        //value: this.getData.f(obj.key),
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


desktopArray:object[]=[];

exit = () =>{
  this.app.launcher.destroy();
}

loading(){
  this.state.Loading=true;
  setTimeout(()=>{   
    this.app.launcher.bild();
  },6000)
}


TS:object={};

getData={
  file : (key,obj) =>{
   return this._Data.getData.file(key).subscribe(
      res => { obj={res}
        console.log(obj)
       }
    )
  },
  folder : (key) =>{
    var item=[];
    this._Data.getData.folder(key).subscribe(
      res =>  console.log(res)
    )
    return item;
  },
  data: () =>{
    return this._Data.getData.data().subscribe(
      res => this.TS=this.getData.returnObj(res, this.TS)
    )
  },
  returnObj: (res, obj)=>{
    obj={res};
    return obj.res
  }
}

desktopData(){
  var obj:object={'name': 'name'};
  for(var k of this.TS['4'].key){
  
  this.getData.file(k,obj);
  console.log(obj)
 
  }
  this.desktopArray.push(obj);
}

ngOnInit(){  
  this.loading()
  this.getData.data();
  
  setTimeout(()=>{
    console.log(this.TS)
  },1000);
  setTimeout(()=>{
    this.desktopData();
    console.log(this.desktopArray)
  },2000);
}

}


