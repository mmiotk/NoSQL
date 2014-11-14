//Draw Polygon with Points in circle on Kartuzy.

var points = db.myPlaces.find( {loc: {$within: {$centerSphere: [[18.12,54.34],0.01]} } } );

var start;

var tempCoordinates = [];

var table = [];

var indeks = 0;

points.forEach(function(item){

if(indeks === 0){
   start = item;
}

if(item._id !== "Kartuzy"){
  table[indeks] = item.loc.coordinates;
  indeks = indeks +1;
}


});

table.push(start.loc.coordinates);

var properties = {"name":"Polygon","stroke":"#CC0000","stroke-width":2}

var polygon = [{"_id":"String", "properties": properties, "loc": {"type": "Polygon", "coordinates":[table]}}];

printjson(polygon);
