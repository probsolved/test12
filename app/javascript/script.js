async function fetchAndStoreCoordinates() {
  const apiKey = "e0f78c0e5bcd4339bf2b2bf3f4d39cf4"; // Replace with your Geoapify API key
  const city = document.getElementById("location").value; // Get the city name from the input field
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    city
  )}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Extract lat and lon from the first result
    const location = data.features[0].geometry.coordinates; // [lon, lat]
    const lon = location[0];
    const lat = location[1];

    // Save to localStorage
    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude", lon);

    console.log(`Saved to localStorage: lat=${lat}, lon=${lon}`);
  } catch (error) {
    console.error("Error fetching Geoapify data:", error);
  }
  // Get Date Value as yyyymmdd
  const dateInput = document.getElementById("myDate");
  dateInput.addEventListener("change", function () {
    console.log(dateInput.value); // Selected date in YYYY-MM-DD format
  });
  const formattedDate = myDate.value.replace(/-/g, "");
  // Construct the URL for the Solunar API
  const baseUrl = "https://api.solunar.org/solunar/";
  const fullUrl = `${baseUrl}${localStorage.getItem(
    "latitude"
  )},${localStorage.getItem("longitude")},${formattedDate},-5`;
  console.log(fullUrl);

  fetch(fullUrl) // Fetch Solunar data using the constructed URL 
  .then((response) => response.json())
    // .then((_data) => document.getElementById("output").textContent = JSON.stringify(_data, null, 2))
    .then((_data) => rawData = JSON.stringify(_data, null, 2))
    .then ((_data) => {obj = JSON.parse(_data)})
    .then((_data) => {document.getElementById("output2").innerHTML = 
      "<table><tr><th>Sun Data</th><th></th><th>Moon Data</th><th></th><th>Best Times</th><th></th><th>Overall Day Rating: " + obj.dayRating + "</th></tr><tr><td><strong>Sunrise:</strong></td><td>" + obj.sunRise + "</td><td><strong>Moonrise:</strong></td><td>" + obj.moonRise + "</td><td><strong>Major Time 1:</strong></td><td>" + obj.major1Start + " - " + obj.major1Stop + "</td></tr>" +
      "<tr><td><strong>Highest Sun:</strong></td><td>" + obj.sunTransit + "</td><td><strong>Highest Moon:</strong></td><td>"+ obj.moonTransit + "</td><td><strong>Major Time 2: </strong></td><td>" + obj.major2Start + " - " + obj.major2Stop + "</td></tr>" +
      "<tr><td><strong>Sunset:</strong></td><td>" + obj.sunSet + "</td><td><strong>Moonset:</strong></td><td>" + obj.moonSet + "</td><td><strong>Minor Time 1:</strong></td><td>" + obj.minor1Start + " - " + obj.minor1Stop + "</td></tr>" +
      "<tr><td></td><td></td><td><strong>Moonphase:</strong></td><td>" + obj.moonPhase + "</td><td><strong>Minor Time 2</strong></td><td>" + obj.minor2Start + " - " + obj.minor2Stop + "</td></tr>" +
      "<tr><td></td><td></td><td><strong>Moon Illumination:</strong></td><td>" + obj.moonIllumination.toFixed(2)*100 + "%</td></tr>" +
      "</table>"


    })

    .then((data) => console.log(data))
    .catch((error) => console.error("Error fetching Solunar data:", error));
  document.getElementById("output2").textContent = "Fetching data...";
}