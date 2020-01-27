import "./main.scss";
import "./restaurant-component";
import { initMap } from "./google_maps";

window.initMap = initMap;

document.addEventListener("DOMContentLoaded", function() {
  const google_api_key = process.env.GOOGLE_API_KEY;

  const googleScriptTag = document.createElement("script");
  googleScriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${google_api_key}&callback=initMap`;
  document.getElementsByTagName("body")[0].appendChild(googleScriptTag);
});
