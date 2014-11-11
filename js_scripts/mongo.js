// Zamiana stringu tags na tablicę

db.database2.drop();

var cursor = db.database.find();

var sizeDatabase = db.database.count();

var newObjects = [];

cursor.forEach(function (elem){
  if(elem.Tags.constructor !== Array){
     var splittedTags = [];
     if(elem.Tags.constructor === String){
        splittedTags = elem.Tags.split(" ");
     }
     else{
        splittedTags.push(elem.Tags); 
     }		 
     elem.Tags = splittedTags;

  }
  
  newObjects.push(elem);
  db.database2.insert(newObjects);
  newObjects = [];



});
