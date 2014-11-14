// Draw a MultiLineString

var start = db.myPlaces.find({"_id":"Kosztrzyn"}).limit(1).toArray()[0];

var cursor = db.myPlaces.find({loc: { $geoWithin: { $center: [ [15.51,51.01],1 ]}}});

var table = [];

table.push(start.loc.coordinates);


cursor.forEach(function(item){
  table.push(item.loc.coordinates);
});

var properties = {"name":"MultiLineString", "stroke": "#555555","#24FF56","stroke-width":2}

var result = [{"_id":{}, "properties": {}, "loc": {"type": "MultiLineString", "coordinates":[table]}}];

printjson(result);
