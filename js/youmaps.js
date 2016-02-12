var myYoumapsApi;
var myMapboardKey ="ahtzfnlvdW1hcHMtbG9jYXRpb24tYW5hbHlzaXNyFQsSCE1hcGJvYXJkGICAgPDEpogKDA";
var myMapdataKeyDepartements ="ahtzfnlvdW1hcHMtbG9jYXRpb24tYW5hbHlzaXNyGQsSDE1hcGRhdGFfTGlzdBiAgIDw1MGWCgw";
var myMapdataKeyCommunes ="ahtzfnlvdW1hcHMtbG9jYXRpb24tYW5hbHlzaXNyGQsSDE1hcGRhdGFfTGlzdBiAgIDwv_SbCgw";

function initialize() {
  myYoumapsApi = new YoumapsAPI(266776, true, v1_3_VERSION, callbackYoumaps);
  var mapOptions = {
    center : {
      lat : 48.858,
      lng : 2.347
    },
    zoom : 6,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.RIGHT_TOP
    }
  };
  map = myYoumapsApi.InitMap({
    mapDivId : "map",
    mapOptions : mapOptions,
    useYoumapsInfoWindows : false
    
  });

  //Google  Places
  var input = $("#address-input")[0];
  var autocomplete = new google.maps.places.Autocomplete(input);

  /*autocomplete.bindTo('bounds', map);*/
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    var bounds = new google.maps.LatLngBounds();

    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);

  });

  $('#checkboxdepartements').change(function(){
    if ( $(this).is(':checked') ) {
      myYoumapsApi.displayMapData(myMapdataKeyDepartements,true,callback_departements_function);
    }else{
      myYoumapsApi.deactivateMapdata(myMapdataKeyDepartements);
    }

  });

   $('#checkboxcommunes').change(function(){
    if ( $(this).is(':checked') ) {
      myYoumapsApi.displayMapData(myMapdataKeyCommunes,true,callback_departements_function);
    }else{
      myYoumapsApi.deactivateMapdata(myMapdataKeyCommunes);
    }

  });

}

function callbackYoumaps(){
  console.log("Youmaps is loaded!");
  myYoumapsApi.getMapboard(myMapboardKey);
}

function callback_departements_function(){
  console.log("Departments are displayed!");
}

function callback_communes_function(){
  console.log("Communes are displayed!");
}