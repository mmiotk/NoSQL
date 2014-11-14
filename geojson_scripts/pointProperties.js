// Wypisanie punktow z uzyciem properties w wielokacie.

var query = db.myPlaces.find( { loc: {$geoWithin: {$geometry: {type:"Polygon",coordinates: [
[ [18.36,54.34], [18.12,54.34], [18.17,54.26], [18.36,54.34]  ]] } } } });

var table = [];

query.forEach(function(item){

if(item._id === "Kiełpino"){
  var tempProperties =  {"name":item._id,"marker-color": "#00FF00","popupContent": "To jest punkt w wielokącie"} ;
}
else{
  var tempProperties = {"name":item._id,"marker-color":"#33FF00","popupContent": "To jest punkt wielokąta"} ;
}

var temp = {"properties": tempProperties,"_id":item._id, "loc": {"type":item.loc.type, "coordinates":item.loc.coordinates}};
table.push(temp);

});

printjson(table);
