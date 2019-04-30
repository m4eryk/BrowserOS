const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.get('/', (req, res)=>{
    res.send('from api')
})

router.post('/data/folder', (req, res) =>{
    let key=req.body
    if(typeof(key)=='string'){
        let obj=TS.getData.folder(key);
        res.json(obj)
    }
    else{
        res.status('404');
    }
})

router.post('/data/file', (req,res) =>{
    let key=req.body
    if(typeof(key)=='string'){
        let obj=TS.getData.file(key);
        res.send(obj)
    }
    else{
        res.status('404');
    }
})

var TS = {
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
      'key' : '15'
    },
    '3' : {
      'name' : 'textFile',
      'type' : 'txt',
      'key' : '18'
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
      'key' : '17'
    },
    '12' : {
      'name' : 'textFile',
      'type' : 'txt',
      'key' : '16'
    },
    '13' : {
      'name' : 'Краимбрери',
      'type' : 'mp3',
      'key' : '14'
    },
    getData :{ 
      folder:(key) =>{
        var obj = [];
        for ( var i of key){
          var item = DataArray.get(key[i]);
          obj.push(TS.getData.checkData(item, key[i]))
          
        }
        return obj;
      },
      file: (key) => {
        var item = DataArray.get(key)
        return TS.getData.checkData(item, key);
      },
      checkData: (item, key)=>{
        if(typeof(item) == 'function' && item != null){
          return item(key);
        }
        else if(item != null){
          return item;
        }
      }
    }
}

var Data = {
'0' : (key) =>{
    return Data.getTableElm(key);
},
'1' : (key) =>{
    return Data.getTableElm(key);
},
'2' : (key) =>{
    return Data.getTableElm(key);
},
'3' : (key) =>{
    return Data.getTableElm(key);
},
'4' : (key) =>{
    return Data.getTableElm(key);
},
'5' : (key) =>{
    return Data.getTableElm(key);
},
'6' : (key) =>{
    return Data.getTableElm(key);
},
'7' : (key) =>{
    return Data.getTableElm(key);
},
'8' : (key) =>{
    return Data.getTableElm(key);
},
'9' : (key) =>{
    return Data.getTableElm(key);
},
'10' : (key) =>{
    return Data.getTableElm(key);
},
'11' : (key) =>{
    return Data.getTableElm(key);
},
'12' : (key) =>{
    return Data.getTableElm(key);
},
'13' : (key) =>{
    return Data.getTableElm(key);
},
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
getTableElm: (key)=>{
    return Table.get(key);
}
}


var Table = new Map(Object.entries(TS));
var DataArray = new Map(Object.entries(Data));
module.exports = router;