// Draw original map

var all = db.myPlaces.find();

var result = [];

all.forEach(function(item){
  result.push(item);
});

printjson(result);
