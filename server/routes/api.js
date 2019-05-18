const express = require('express');
const router = express.Router();
const serialize = require('serializer.ts/Serializer');
const mime = require('mime-types')
const fs = require('fs');
const FSpath= '../BrowserOS-client/src/assets/FS/'


router.get('/', (req, res)=>{
  res.send('from api')
})


router.post('/data', (req,res)=>{
  console.log(req.body)
  var objTS = serialize.serialize(getContent(req.body))
  res.json(objTS)
})


router.post('/data/give', (req,res)=>{
  console.log(req.body)
  fs.readFile(FSpath+req.body, 'utf-8', (err, buf) => {
    if (err) { console.log(err) }
    let value={buf}
    var objTS = serialize.serialize(value)
    res.json(objTS)
  })
})

router.post('/data/setTextValue', (req, res) => {
  console.log(req.body)
  fs.writeFile(FSpath+req.body.path, req.body.buf, function(error){
    if(error) throw error;
  });
  res.send({status : 'OK'})
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