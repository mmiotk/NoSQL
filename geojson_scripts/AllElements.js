// Połączenie wszystkiego: Stworzenie Polygon,LineString oraz punktów.

var start = db.myPlaces.find({_id:"Lubań"}).limit(1).toArray()[0];
var end = db.myPlaces.find({_id:"Lubomierz"}).limit(1).toArray()[0];

var points = db.myPlaces.find( {loc: {$nearSphere: {$geometry: {type: "Point", coordinates: start.loc.coordinates },$maxDistance:50000}}} );

// Create a polygon

var tablePolygon = [];
var pointsTable = [];
var markers = ["post","monument","rocket","bus"];
var result = [];

var ind = 0;

points.forEach(function(item){
  var propertiesPoint = {"name":item._id, "marker-symbol":markers[ind]};
  var newPoint = {"_id":item._id,"loc":item.loc,"properties":propertiesPoint};
  result.push(newPoint);
  tablePolygon.push(item.loc.coordinates);
  ind = ind +1;
});

var properties = {"name":"Polygon","fill":"#99FF99","fill-opacity":1}

var polygon = {"_id":"String", "properties": properties, "loc": {"type": "Polygon", "coordinates":[tablePolygon]}};

var lineProperties = {"name":"Line","stroke":"#000000","stroke-width":5};

var line = {"_id":"String","properties":lineProperties, "loc": {"type": "LineString", "coordinates":[start.loc.coordinates,end.loc.coordinates]}};


result.push(polygon);
result.push(line);
printjson(result);
