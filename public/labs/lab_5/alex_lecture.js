async function dataHandler(mapObjectFromFunction) {
// use your assignment 1 data handling code here
// and target mapObjectFromFunction to attach markers

  const form = document.querySelector('#search-form');
  const search = document.querySelector('#search');
  const targetList = document.querySelector('.target-list');
  const replyMessage = document.querySelector('.reply-message');

  // fetch request
  const request = await fetch(endpoint);
  // empty array for data
  const zipcodes = await request.json();

  form.addEventListener('submit', async (event) => {
    targetList.innerText = '';

    event.preventDefault();
    console.log('submit fired', search.value);

    const filtered = data.filter((record) => record.zip.includes(zipcodes.value) && record.geocoded_column_1);
    const topFive = filtered.slice(0, 5);

    if (topFive.length < 1) {
      replyMessage.classList.add('box');
      replyMessage.innerText = 'No matches found';
    }

    console.table(topFive);

    topFive.forEach((item) => {
      const longLat = item.geocoded_column_1.coordinates;
      console.log('markerLongLat', longLat[0], longLat[1]);
      const marker = L.marker([longLat[1], longLat[0]]).addTo(mapObjectFromFunction);

      const appendItem = document.createElement('li');
      appendItem.classList.add('block');
      appendItem.classList.add('list-item');
      appendItem.innerHTML = `<div class="list-header is-size-5">${item.name}</div><address class="is-size-6">${item.address_line_1}</address>`;
      targetList.append(appendItem);
    });

    const {coordinates} = topFive[0]?.geocoded_column_1;
    console.log('viewSet coords', coordinates);
    mapObjectFromFunction.panTo([coordinates[1], coordinates[0], 0]);

    search.addEventListener('input', (event) => {
      console.log('input', event.target.value);
      if (search.value.length === 0) {
        replyMessage.innerText = '';
        replyMessage.classList.remove('box');
      }
    });
  });
}