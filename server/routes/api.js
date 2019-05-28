const express = require('express');
const router = express.Router();
const mime = require('mime-types')
const fs = require('fs');
const FSpath= '../BrowserOS-client/src/assets/FS/'




router.get('/', (req, res)=>{
  res.send('from api')
})


router.post('/data', (req,res)=>{
  console.log(req.body)
  res.json(getContent(req.body))
})


router.post('/data/give', (req,res)=>{
  console.log(req.body)
  fs.readFile(FSpath+req.body, 'utf-8', (err, buf) => {
    if (err) { console.log(err) }
    let value={buf}
    res.json(value)
  })
})

router.post('/data/setTextValue', (req, res) => {
  console.log(req.body)
  fs.writeFile(FSpath+req.body.path, req.body.buf, function(error){
    if(error) throw error;
  });
})


router.post('/data/creatFolder', (req,res) => {
  console.log(req.body)
  fs.mkdir(FSpath+'/PC/DiskC/Desktop/'+req.body, { recursive: true }, (err) => {
    if (err) throw err;
    console.log('creat new folder')
  });
})

router.post('/data/creatTextFile', (req,res) => {
  console.log(req.body)
  fs.appendFile(FSpath+'/PC/DiskC/Desktop/'+req.body+'.txt', 'data to append', function (err) {
    if (err) throw err;
    console.log('creat new text file!');
  });
})

router.get('/data/getConfig', (req, res) => {
  fs.readFile('config.json', 'utf-8', (err, buf) => {
    if (err) { console.log(err) }
    console.log(buf)
    res.json(JSON.parse(buf))
  })
})

router.post('/data/setConfig', (req, res) => {
  let config = JSON.stringify(req.body)
  fs.writeFile('config.json', config, function(error){
    if(error) throw error;
  });
  res.send({StarusOK : '200'})  
})


function getContent(path){
  var value= []
  fs.readdirSync(FSpath+path).forEach(file => {
    if(!mime.lookup(file)){
      value.push(new File(path, 'folder', file))
    }
    else if(mime.lookup(file) == 'text/plain'){
      value.push(new File(path, 'txt', file))
    }
    else if(mime.lookup(file) == 'video/mp4'){
      value.push(new File(path, 'mp4', file))
    }
    else if(mime.lookup(file) == 'audio/mpeg'){
      value.push(new File(path, 'mp3', file))
    }
    else if(mime.lookup(file) == 'image/jpeg'){
      value.push(new File(path, 'jpeg', file))
    }
  })
  return value
}



function File(path, type, name){
  this.url=path+name;
  this.type=type;
  this.name=name;
}


module.exports = router;