function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);

  const marker = L.marker([51.5, -0.09]).addTo(mymap);

  const circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
  }).addTo(mymap);

  const polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
  ]).addTo(mymap);

  marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
  circle.bindPopup('I am a circle.');
  polygon.bindPopup('I am a polygon.');

  const popup = L.popup();

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent(`You clicked the map at ${e.latlng.toString()}`)
      .openOn(mymap);
  }

  mymap.on('click', onMapClick);

  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers

  // API PG County Food Inspection data
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const searchInput = document.querySelector('#input');
  const suggestions = document.querySelector('.suggestions');

  // fetch request
  const request = await fetch(endpoint)
  // empty array for data
  const zipcodes = await request.json();

  // check for matches using input box compared to zipcodes array
  function findMatches(wordToMatch, zipcodes) {
    return zipcodes.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex);
    });
  }

  // display matches found
  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, zipcodes);
    const html = matchArray.map((place) => {
      const regex = new RegExp(this.value, 'gi');
      // const cityName = place.city;
      // const zipCode = place.zip;
      const addressLine1 = place.address_line_1;
      const addressLine2 = place.address_line_2;
      const restaurantName = place.name;
      // const inspectionResults = place.inspection_results;
      // const {category} = place;
      return `
              <div class="box is-small">
                  <li>
                      <div class="name">${restaurantName}</div>
                      <address class="address">${addressLine1}, ${addressLine2}</address>
                  </li>
              </div>
              `;
    }).join('');
    suggestions.innerHTML = html;
  }

  // event listeners
  searchInput.addEventListener('input', displayMatches);
  searchInput.addEventListener('keyup', (evt) => {
    displayMatches(evt);
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;