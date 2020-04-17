const styles = require("./google_maps.json");
export let googleMap;

export function initMap() {
  // cannot use parameters in a function that is used as callback --> use attributes
  var mapType = document.getElementById("map").getAttribute("type");
  // map with default position
  var paris = { lat: 48.864716, lng: 2.349014 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: paris,
    styles: styles
  });
  map.markers = [];
  googleMap = map;

  var locationP = new google.maps.LatLng(paris.lat, paris.lng);
  var request = {
    location: locationP,
    radius: '10', 
    type: ['restaurant']
  };

  // geolocation: center map based on user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      googleMap = map;
      var marker = new google.maps.Marker({ position: pos, map: map });
      var location = new google.maps.LatLng(pos.lat, pos.lng);

      request = {
        location: location,
        radius: "1000",
        type: ['restaurant']
      };
    });
  }

  // set lat/lng of NE & SW corners every time the map becomes idle after dragging, panning or zooming
  if (mapType === "list") {
    map.addListener("idle", function() {
      makePlacesRequest(map, request);
    });
  } else if (mapType === "new") {
    map.addListener("click", function(event) {
      removeMarkers(map);
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      onGetLatLng(map, lat, lng);
      var marker = new google.maps.Marker({
        position: { lat, lng },
        map: map
      });
      map.markers.push(marker);
    });
  } else {
    map.addListener("idle", function() {
      onMarkrestaurant(map);
    });
  }
}

function makePlacesRequest(map, request) {
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, onReceivingPlaces);
}

function onReceivingPlaces(results, status) {
  // uses global googleMap variable because 'map' can't be passed as argument
  googleMap.results = [];
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      googleMap.results.push(results[i]);
    }
  }
  mapIdle(googleMap);
}

function mapIdle(map) {
  let viewportBounds = setViewportBounds(map);
  onMapIdle(map, viewportBounds);
}

function onGetLatLng(map, lat, lng) {
  const getLatLngEvent = new CustomEvent("latlng", {
    detail: { map: map, position: { lat: lat, lng: lng } },
    bubbles: true
  });
  const mapEl = document.querySelector("#map");
  mapEl.dispatchEvent(getLatLngEvent);
}

function onMarkrestaurant(map) {
  const markrestaurantEvent = new CustomEvent("markRestaurant", {
    detail: { map: map },
    bubbles: true
  });
  const mapEl = document.querySelector("#map");
  mapEl.dispatchEvent(markrestaurantEvent);
}

function onMapIdle(map, bounds) {
  const mapEl = document.querySelector("#map");
  const mapIdleEvent = new CustomEvent("mapIdle", {
    bubbles: true,
    detail: { bounds: bounds, map: map }
  });
  mapEl.dispatchEvent(mapIdleEvent);
}

function setViewportBounds(map) {
  googleMap = map;
  var bounds = map.getBounds();
  var NE = bounds.getNorthEast();
  var SW = bounds.getSouthWest();
  var SWLatLng = new google.maps.LatLng(SW.lat(), SW.lng());
  var NELatLng = new google.maps.LatLng(NE.lat(), NE.lng());

  // set corner coordinates of the map
  var viewportBounds = new google.maps.LatLngBounds(SWLatLng, NELatLng);
  return viewportBounds;
}

export function addMarkerWithInfoWindow(props) {
  var marker = new google.maps.Marker({
    position: props.coords,
    map: props.map,
    icon: props.icon
  });
  var infoWindow = new google.maps.InfoWindow({
    content: props.content
  });

  marker.addListener("click", function() {
    infoWindow.open(props.map, marker);
  });

  return marker;
}

export function removeMarkers(map) {
  for (let i = 0; i < map.markers.length; i++) {
    map.markers[i].setMap(null);
  }
  map.markers = [];

  return map;
}
