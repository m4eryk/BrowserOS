const express = require('express');
const router = express.Router();
const serialize = require('serializer.ts/Serializer');

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
    'key' : ['0','1','2','3','5','13','19']
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
  '19' : {
    'name' : 'Картинка',
    'type' : 'jpg',
    'key' : '20'
  }
}

var Data = {
  '0' :{ 
   'ref' : true
  },
  '1' : { 
   'ref' : true
  },
  '2' : { 
   'ref' : true
  },
  '3' : { 
   'ref' : true
  },
  '4' : { 
    'ref' : true
  },
  '5' : { 
   'ref' : true
  },
  '6' : { 
   'ref' : true
  },
  '7' : { 
   'ref' : true
  },
  '8' : { 
   'ref' : true
  },
  '9' : { 
    'ref' : true
  },
  '10' : { 
   'ref' : true
  },
  '11' : { 
   'ref' : true
  },
  '12' : { 
    'ref' : true
  },
  '13' : { 
    'ref' : true
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
  '19' : {
    'ref' : true
  },
  '20' : {
    'src' : '../',
    'type' : 'jpg'
  }
}

var Table = new Map(Object.entries(TS));
var DataArray = new Map(Object.entries(Data));

router.get('/', (req, res)=>{
    res.send('from api')
})

router.get('/data/table', (req,res)=>{
  var objTS = serialize.serialize(TS)

  res.json(objTS)
})

router.get('/data/array', (req,res)=>{
  var objData = serialize.serialize(Data)
  res.json(objData)
})

router.post('/data/set', (req,res)=>{
  Table.get('4').key.push(DataArray.size)
  console.log(Table.get('4').key)
  Table.set(DataArray.size, req.body)
  DataArray.set(DataArray.size, { 'ref' : true })
  console.log(DataArray)
  res.status(200).send('ok');
})




module.exports = router;