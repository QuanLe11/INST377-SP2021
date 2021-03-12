function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([38.991329368, -76.923162974], 12);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicWxlMTEiLCJhIjoiY2ttMjYxeWVkNGxiMzJ3cG1mdzh0aHZ2NiJ9.8h8ZiZzj7VUBkXQaMeOdQw'
  }).addTo(mymap);

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
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'; // change to '/api'
  const search = document.querySelector('#input');
  const formElem = document.querySelector('#formElem');
  const suggestions = document.querySelector('.suggestions');
  const replyMessage = document.querySelector('.reply-message');

  // fetch request
  const request = await fetch(endpoint);
  // empty array for data
  const data = await request.json();

  // display matches found
  function displayMatches(event, zipcodes) {
    // check for matches using input box compared to zipcodes array
    function findMatches(wordToMatch) {
      return zipcodes.filter((place) => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.zip.match(regex);
      });
    }

    const matchArray = findMatches(event.target.value, zipcodes);

    zipcodes.forEach((item) => {
      const longLat = item.geocoded_column_1.coordinates;
      console.log('markerLongLat', longLat[0], longLat[1]);
      const marker = L.marker([longLat[1], longLat[0]]).addTo(mapObjectFromFunction);

      const html = matchArray.map((place) => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city;
        const zipCode = place.zip;
        const addressLine1 = place.address_line_1;
        const addressLine2 = place.address_line_2;
        const restaurantName = place.name;
        return `
              <div class="box is-small">
                  <li>
                      <div class="name">${restaurantName}</div>
                      <address class="address">${addressLine1}, ${addressLine2}</address>
                      <address class="address">${cityName}, ${zipCode}</address>
                  </li>
              </div>
              `;
      }).join('');
      suggestions.innerHTML = html;
    });
  }

  // event listeners
  formElem.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // eslint-disable-next-line max-len
    const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
    const topFive = filtered.slice(0, 5);

    if (topFive.length < 1) {
      replyMessage.classList.add('box');
      replyMessage.innerText = 'No matches found';
    }

    displayMatches(evt, topFive);
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;