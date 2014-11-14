var start = db.myPlaces.find({_id:"Chojnice"}).limit(1).toArray()[0];
var end = db.myPlaces.find({_id:"Kiełpino"}).limit(1).toArray()[0];

var properties = {"name":"LineString","stroke":"#55AA22","stroke-width":5}

var line = {"_id":"String","properties":properties, "loc": {"type": "LineString", "coordinates":[start.loc.coordinates,end.loc.coordinates]}};

var result = [];


result.push(start);
result.push(end);
result.push(line);

printjson(result);
