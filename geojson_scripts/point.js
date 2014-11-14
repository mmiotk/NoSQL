
var findPlace = db.myPlaces.find({"_id":"Kiełpino"}).limit(1).toArray()[0];

var points = db.myPlaces.find( {loc: { $near : { $geometry: { type: "Point",  coordinates: findPlace.loc.coordinates }, $maxDistance: 7000  } } } );

var results = [];

points.forEach(function(item){

  if(item._id === "Kiełpino"){
    var properties = {"name":"Neighbour","marker-size":"large","marker-symbol":"police","marker-color":"#000000"} ;
    var temp = {"_id":item._id,"loc":item.loc,"properties":properties};
    results.push(temp);
  }
  else{
    results.push(item);
  }
});

printjson(results);
