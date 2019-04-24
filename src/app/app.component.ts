import { Component, OnInit } from '@angular/core';


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

fs:object = {
  'Desktop': [
            {
              'name' : 'MyFolder',
              'type' : 'folder',
              'dir':[
                      {
                        'name' : 'folder1',
                        'type' : 'folder',
                        'dir' : [
                          {
                            'name' : 'Textfile',
                            'type' : 'txt',
                            'change' : false,
                            'value': ''
                          },
                          {
                            'name' : 'Textfile',
                            'type' : 'txt',
                            'change' : false,
                            'value': ''
                          }
                        ]
                      },
                      {
                        'name' : 'folder2',
                        'type' : 'folder',
                        'dir' : [
                          {
                            'name' : 'Textfile',
                            'type' : 'txt',
                            'change' : false,
                            'value': ''
                          }
                        ]
                      },
                      {
                        'name' : 'folder2',
                        'type' : 'folder',
                        'dir' : [
                          {
                            'name' : 'Textfile',
                            'type' : 'txt',
                            'change' : false,
                            'value': ''
                          }
                        ]
                      }
                    ],
            },
            {
              'name' : 'YourFolder',
              'type' : 'folder',
              'dir' : [
                {
                  'name' : 'Textfile',
                  'type' : 'txt',
                  'change' : false,
                  'value': ''
                },
                {
                  'name' : 'BlackHole',
                  'type' : 'mp4',
                  'source' : [
                              {
                                'src' : '../../assets/video/videoplayback.mp4',
                                'type' : 'video/mp4'
                              }
                  ]
                }
              ],
            },
            {
              'name' : 'MyText',
              'type' : 'txt',
              'change' : false,
              'value': ''
            },
            {
              'name' : 'BlackHole',
              'type' : 'mp4',
              'source' : [
                          {
                            'src' : '../../assets/video/videoplayback.mp4',
                            'type' : 'video/mp4'
                          }
              ]
            },
            {
              'name' : 'Music',
              'type' : 'mp3'
            }
        ],
    'PC':{ 
          'name' : 'PC',
          'type' : 'folder',
          'dir':[
            {
              'name' : 'DiskC',
              'type' : 'folder',
              'dir':[
                      {
                        'name' : 'MyFolder',
                        'type' : 'folder',
                        'dir':[
                                {
                          
                                  'name' : 'folder1',
                                  'type' : 'folder',
                                  'dir' : [
                                    {
                                      'name' : 'Textfile',
                                      'type' : 'txt',
                                      'change' : false,
                                      'value': ''
                                    },
                                    {
                                      'name' : 'Textfile',
                                      'type' : 'txt',
                                      'change' : false,
                                      'value': ''
                                    }
                                  ]
                                },
                                {
                                  'name' : 'folder2',
                                  'type' : 'folder',
                                  'dir' : [
                                    {
                                      'name' : 'Textfile',
                                      'type' : 'txt',
                                      'change' : false,
                                      'value': ''
                                    }
                                  ]
                                },
                                {
                          
                                  'name' : 'folder2',
                                  'type' : 'folder',
                                  'dir' : [
                                    {
                                      'name' : 'Textfile',
                                      'type' : 'txt',
                                      'change' : false,
                                      'value': ''
                                    }
                                  ]                                
                                }
                              ]
                      },
                      {
                        'name' : 'YourFolder',
                        'type' : 'folder',
                        'dir' : [
                          {
                            'name' : 'Textfile',
                            'type' : 'txt',
                            'change' : false,
                            'value': ''
                          },
                          {
                            'name' : 'BlackHole',
                            'type' : 'mp4',
                            'source' : [
                                        {
                                          'src' : '../../assets/video/videoplayback.mp4',
                                          'type' : 'video/mp4'
                                        }
                            ]
                          }
                        ]
                      },
                      {
                        'name' : 'MyText',
                        'type' : 'txt',
                        'change' : false,
                        'value': ''
                      },
                      {
                        'name' : 'BlackHole',
                        'type' : 'mp4',
                        'source' : [
                                    {
                                      'src' : '../../assets/video/videoplayback.mp4',
                                      'type' : 'video/mp4'
                                    }
                        ]
                      },
                      {
                        'name': 'Music',
                        'type' : 'mp3'
                      }
                    ]
            }
          ]
      }
}

Map = new Map(Object.entries(this.fs));

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
          dir : obj.dir,
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
      source : obj.source,
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
        value: obj,
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
ngOnInit(){

  this.app.launcher.bild();
}




}
