function whenLoaded() {
    const root = document.body;

    //title
    const title = document.createElement('h1');
    title.textContent = 'My Weather Portal';
    root.appendChild(title)

    //container 1
    const container1 = document.createElement('div');
    container1.setAttribute('id', 'container1');
    root.appendChild(container1);
    //weather portal block
    const weatherPortal = document.createElement('header');
    weatherPortal.setAttribute('id', 'headerBlock');
    weatherPortal.setAttribute('class', 'blockLevel');
    var portalTitle = document.createElement('h2');
    portalTitle.setAttribute('class', 'h2Elements')
    portalTitle.textContent = 'Hong Kong';
    weatherPortal.appendChild(portalTitle);
    container1.appendChild(weatherPortal);
    //my location data
    const myData = document.createElement('div');
    myData.setAttribute('id', 'myData');
    myData.setAttribute('class', 'blockLevel');
    myData.style.backgroundColor = '#AA8FA6';
    var myDataTitle = document.createElement('h2');
    myDataTitle.setAttribute('class', 'h2Elements');
    myDataTitle.textContent = 'My Location';
    myData.appendChild(myDataTitle);
    container1.appendChild(myData);

    //container 2
    const container2 = document.createElement('div');
    container2.setAttribute('id', 'container2');
    root.appendChild(container2);
    //district temperature data
    const temperatures = document.createElement('div');
    temperatures.setAttribute('id', 'tempBlock');
    temperatures.setAttribute('class', 'blockLevel');
    temperatures.style.backgroundColor = '#CCB7C4';
    var tempTitle = document.createElement('h2');
    tempTitle.setAttribute('class', 'h2Elements');
    tempTitle.textContent = 'Temperatures';
    temperatures.appendChild(tempTitle);
    container2.appendChild(temperatures);
    //district rainfall data
    const rainfall = document.createElement('div');
    rainfall.setAttribute('id', 'rainBlock');
    rainfall.setAttribute('class', 'blockLevel');
    rainfall.style.backgroundColor = '#E4CCC6';
    var rainTitle = document.createElement('h2');
    rainTitle.setAttribute('class', 'h2Elements');
    rainTitle.textContent = 'Rainfall';
    rainfall.appendChild(rainTitle);
    container2.appendChild(rainfall);
    //district air quality data
    const airQuality = document.createElement('div');
    airQuality.setAttribute('id', 'airQBlock');
    airQuality.setAttribute('class', 'blockLevel');
    airQuality.style.backgroundColor = '#FCE6BE';
    var airTitle = document.createElement('h2');
    airTitle.setAttribute('class', 'h2Elements');
    airTitle.textContent = 'Air Quality';
    airQuality.appendChild(airTitle);
    container2.appendChild(airQuality);

    //nine day weather forecast
    const nineDayForecast = document.createElement('div');
    nineDayForecast.setAttribute('id', 'ninedays');
    nineDayForecast.setAttribute('class', 'blockLevel');
    nineDayForecast.style.backgroundColor = '#C1CFD9';
    var forecastTitle = document.createElement('h2');
    forecastTitle.setAttribute('class', 'h2Elements');
    forecastTitle.textContent = '9 Day Weather Forecast';
    nineDayForecast.appendChild(forecastTitle);
    root.appendChild(nineDayForecast);

    

    //fetch data after making sure that all HTML elements have been appended
    var headerOutput = "";
    var tempOutput = "";
    var rainOutput = "";
    fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en') 
    .then (headerResponse => {
        if (headerResponse.status == 200) {
            headerResponse.json().then (generalWeather => {
                //HEADER BLOCK START
                weatherIconValue = generalWeather.icon[0];
                hkoTemp = generalWeather.temperature.data[1].value; //HKO temperature
                hkoHumidity =  generalWeather.humidity.data[0].value;
                hkoRainfall = generalWeather.rainfall.data[13].max  //Yau Tsim Mong
                hkoUV =  generalWeather.uvindex;
                warningMessage = generalWeather.warningMessage;
                //warningMessage = ["This is a test", "This is also a test", "This is a very long message to test if the width of the button does not go over 60% of my header block"];
                lastUpdate = generalWeather.updateTime.substr(11,5);       
                //text and image for weather
                weatherIconSrc = "https://www.hko.gov.hk/images/HKOWxIconOutline/pic" + weatherIconValue + ".png";
                headerOutput += '<div id = "headerContainer1"><span class = "headerElements" id = "weatherIcon">'
                                + '<img src= " ' + weatherIconSrc +'"></span>';
                //temperature at HKO
                headerOutput += '<span class = "headerElements" id = "hkoTemp">' + hkoTemp + '<sup>°C</sup></span>';
                //humidity and image at HKO
                headerOutput += "<div class = contentContainer> <span class = 'leftContent' id = 'hkoHumid'>" + hkoHumidity + "</span>";
                headerOutput += '<span class="rightContent">';
                headerOutput += '<span class="topContent">'; 
                headerOutput += '<span><img src = "images/drop-64.png"></span>';
                headerOutput += '</span>'; 
                headerOutput += '<span class="bottomContent">'; 
                headerOutput += '<span>%</span></span></div>';
                //rainfall and image at HKO
                headerOutput += "<div class = contentContainer> <span class = 'leftContent' id = 'hkoRain'>" + hkoRainfall +
                                "</span>";
                headerOutput += '<span class="rightContent">';
                headerOutput += '<span class="topContent">'; 
                headerOutput += '<span><img src = "images/rain-48.png"></span>';
                headerOutput += '</span>'; 
                headerOutput += '<span class="bottomContent">'; 
                headerOutput += '<span>mm</span></span></span></div></div>';

                if(hkoUV != "") {
                    hkoUV = hkoUV.data[0].value;
                    headerOutput += '<div class="blockHeaderElements" id = "headerContainer2">' 
                    + '<span class= "headerElements" id = "hkoUV">' + hkoUV + '</span><sup><img src = "images/UVindex-48.png"></sup></div>';
                }
                //background of header block depending on weather and time of day             
                if(hkoUV != "") {
                    //during daytime
                    if(hkoRainfall == 0) {
                        //no rain
                        headerBlock.style.backgroundImage = 'url("images/blue-sky.jpg")';
                    }
                    else {
                        //raining
                        headerBlock.style.backgroundImage = 'url("images/water-drops-glass-day.jpg")';
                    }       
                }
                else {
                    //during nighttime 
                    headerBlock.style.color = 'white';
                    if(hkoRainfall == 0) {
                        //no rain
                        headerBlock.style.backgroundImage = 'url("images/night-sky.jpg")';    
                    }
                    else {
                        //raining
                        headerBlock.style.backgroundImage = 'url("images/water-drops-glass-night.jpg")';
                    }
                }
                //warning message if present
                var warningMessageLen = warningMessage.length;
                if (warningMessageLen != 0) {
                    //create hidden div to contain the warnings
                    headerOutput += '<div id="warnings" style="display: none;"> <span id="warningHeading">Warning</span> <ul> ';
                    for ( var i = 0; i < warningMessageLen; i++) {
                        headerOutput += '<li>' +  warningMessage[i] + '</li>';
                    }
                    headerOutput += '</ul> </div>';
                    //add the warning button
                    headerOutput += '<button id="warningButton">WARNING!</button>';
                }              
                //last update time message
                headerOutput += '<span class = "headerElements" id = "hkoUpdate">Last Update: ' + lastUpdate + " " + '</span>';

                headerBlock.innerHTML += headerOutput;

                var warningButton = document.getElementById('warningButton');
                if (warningButton) { 
                    //keep track of button's state
                    var isShown = false; 
                
                    warningButton.addEventListener("click", function() {
                        if (isShown) {
                            //ff a warning is currently being shown, reset the button text to "WARNING!"
                            this.innerHTML = "WARNING!";
                            isShown = false;
                        } else {
                            //otherwise, display the next warning message
                            this.innerHTML += '</br>' + warningMessage.join('</br>');
                            isShown = true;
                        }
                    })
                }
                //HEADER BLOCK END
                //TEMPERATURES BLOCK START
                var tempContainer = document.createElement('div');
                tempContainer.setAttribute('id', 'tempContainer');

                var tempDropdown = document.createElement('select');
                tempDropdown.setAttribute('class', 'dropdown');
                tempContainer.innerHTML += "<div class = 'flavorText'>Select a location:</div>";
                var firstTempOption = document.createElement('option');
                firstTempOption.text = "";
                tempDropdown.appendChild(firstTempOption);
                var sortedTempData = generalWeather.temperature.data.sort((a, b) => a.place.localeCompare(b.place));

                for (let i = 0; i < sortedTempData.length; i++) {
                    var option = document.createElement('option');
                    option.value = sortedTempData[i].place;
                    option.text = sortedTempData[i].place;
                    tempDropdown.appendChild(option);
                }
                tempContainer.appendChild(tempDropdown);
                tempBlock.appendChild(tempContainer);

                tempContainer.addEventListener('click', function(event) {
                    event.stopPropagation();
                });

                document.getElementById('tempBlock').addEventListener('click', function(event) {
                    if (window.innerWidth <= 500) {
                        this.classList.toggle('active');
                    }
                });

                var tempDropdownOutput = document.createElement('div');
                tempDropdownOutput.setAttribute('id', 'tempDropdownOutput');
                tempContainer.appendChild(tempDropdownOutput);

                tempDropdown.addEventListener('change', function() {

                    var selectedTempPlace = this.value;
                    var selectedTempStation = generalWeather.temperature.data.find(item => item.place === selectedTempPlace);
                    if (selectedTempStation) {

                        tempOutput +='<div id = "stationTemp">'+ selectedTempStation.value + '<sup>°C</sup></div>';
                    }
                    tempDropdownOutput.innerHTML = tempOutput;
                    tempOutput = "";
                })
                //TEMPERATURES BLOCK END
                //RAINFAILL BLOCK START
                var rainContainer = document.createElement('div');
                rainContainer.setAttribute('id', 'rainContainer');

                var rainDropdown = document.createElement('select');
                rainDropdown.setAttribute('class', 'dropdown');
                rainContainer.innerHTML += "<div class = 'flavorText'>Select the district:</div>";
                var firstRainOption = document.createElement('option');
                firstRainOption.text = "";
                rainDropdown.appendChild(firstRainOption);
                var sortedRainData = generalWeather.rainfall.data.sort((a, b) => a.place.localeCompare(b.place));

                for (let i = 0; i < sortedRainData.length; i++) {
                    var option = document.createElement('option');
                    option.value = sortedRainData[i].place;
                    option.text = sortedRainData[i].place;
                    rainDropdown.appendChild(option);
                }
                rainContainer.appendChild(rainDropdown);
                rainBlock.appendChild(rainContainer);

                rainContainer.addEventListener('click', function(event) {
                    event.stopPropagation();
                });

                document.getElementById('rainBlock').addEventListener('click', function(event) {
                    if (window.innerWidth <= 500) {
                        this.classList.toggle('active');
                    }
                });

                var rainDropdownOutput = document.createElement('div');
                rainDropdownOutput.setAttribute('id', 'rainDropdownOutput');
                rainContainer.appendChild(rainDropdownOutput);

                rainDropdown.addEventListener('change', function() {

                    var selectedRainPlace = this.value;
                    var selectedRainStation = generalWeather.rainfall.data.find(item => item.place === selectedRainPlace);
                    if (selectedRainStation) {

                        rainOutput +='<div id = "stationRain">'+ selectedRainStation.max + '<sub>mm</sub></div>';
                    }
                    rainDropdownOutput.innerHTML = rainOutput;
                    rainOutput = "";
                })
                //RANFALL BLOCK END
            })
        }
    })

    //finding my location first
    var currentLatitude = "";
    var currentLongitude = "";
    
    navigator.geolocation.getCurrentPosition(success);
    
    function success(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };  
            
        currentLatitude = position.coords.latitude;
        currentLongitude = position.coords.longitude;

        //testing to see if coords are the same
        //console.log(currentLatitude, currentLongitude);
        //console.log(pos.lat, pos.lng);

        //my location weather data        
        myOutput = "";
        fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + currentLatitude + '&lon=' + currentLongitude + '&zoom=18&addressdetails=1')
        .then (myLocation => {
            if (myLocation.status == 200) {
                myLocation.json().then ( myLocationData => {
                    //MY LOCATION START
                    var suburb;
                    var district;
                    //suburb 
                    if (myLocationData.address.suburb != undefined) {
                        suburb = myLocationData.address.suburb;
                    } else if (myLocationData.address.borough != undefined) {
                        suburb = myLocationData.address.borough;
                    } else if (myLocationData.address.town != undefined) {
                        suburb = myLocationData.address.town;
                    } else {
                        suburb = "Unknown";
                    }
                    //district
                    if (myLocationData.address.city_district != undefined) {
                        district = myLocationData.address.city_district;
                    } else if (myLocationData.address.county != undefined) {
                        district = myLocationData.address.county;
                    } else if (myLocationData.address.city != undefined) {
                        district = myLocationData.address.city;
                    } else if (myLocationData.address.municipality != undefined) {
                        district = myLocationData.address.municipality;
                    } else {
                        district = "Unknown";
                    }

                    myOutput += '<span id = "myAddress">' + suburb + ", " + district + '</span>';
                    //MY LOCATION END, NEAREST WEATHER/AQHI STATION START
                    Promise.all([
                        fetch('https://ogciopsi.blob.core.windows.net/dataset/weather-station/weather-station-info.json'),
                        fetch('data/aqhi-station-info.json')
                    ])
                    .then(([stationResponse, aqhiResponse]) => {
                        if (stationResponse.status == 200 && aqhiResponse.status == 200) {
                            stationResponse.json().then(weatherStations => {
                                aqhiResponse.json().then(aqhiStations => {
                                    let nearestStation = weatherStations[0];
                                    let minDistance = weatherDistance(nearestStation, currentLatitude, currentLongitude);
                    
                                    let nearestAQHIStation = aqhiStations[0];
                                    let minAQHIDistance = aqhiDistance(nearestAQHIStation, currentLatitude, currentLongitude);
                    
                                    for (let station of weatherStations) {
                                        const distance = weatherDistance(station, currentLatitude, currentLongitude);
                                        if (distance < minDistance) {
                                            minDistance = distance;
                                            nearestStation = station;
                                        }
                                    }
                    
                                    for (let station of aqhiStations) {
                                        const distance = aqhiDistance(station, currentLatitude, currentLongitude);
                                        if (distance < minAQHIDistance) {
                                            minAQHIDistance = distance;
                                            nearestAQHIStation = station;
                                        }
                                    }

                                    //console.log(nearestStation);
                                    //console.log(nearestAQHIStation);
                                    //NEAREST WEATHER/AQHI STATION END, GET DATA START
                                    Promise.all([
                                        fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en`),
                                        fetch(`https://dashboard.data.gov.hk/api/aqhi-individual?format=json`)
                                    ])
                                    .then(([nearestResponse, aqhiResponse]) => {
                                        if (nearestResponse.status == 200 && aqhiResponse.status == 200) {
                                            nearestResponse.json().then(stationData => {
                                                aqhiResponse.json().then(aqhiData => {
                                                    for (i = 0; i < 25; i++) {
                                                        //console.log(stationData.temperature.data[i].place);
                                                        //console.log(nearestStation.station_name_en);
                                                        if (stationData.temperature.data[i].place.toLowerCase() == nearestStation.station_name_en.toLowerCase()) {
                                                            //console.log("Match Station = " + stationData.temperature.data[i].place);
                                                            myOutput += '<div id = myContainer><span id = "myTemp">' + stationData.temperature.data[i].value + 
                                                                        '<sup>°C</sup></span>';
                                                            break;
                                                        }
                                                    }
            
                                                    for (i = 0; i < 17; i++ ) {
                                                        //console.log(stationData.rainfall.data[i].place);
                                                        //console.log(district)
                                                        //can compare with district because no two rainfall stations have the same first word
                                                        if (stationData.rainfall.data[i].place.split(" ")[0] == district.split(" ")[0]) {
                                                            //console.log("Match");
                                                            myOutput += '<div class = contentContainer> <span class = "leftContent" id = "myRain">' + stationData.rainfall.data[i].max +
                                                            '</span>';
                                                            myOutput += '<span class="rightContent">';
                                                            myOutput += '<span class="topContent">'; 
                                                            myOutput += '<span><img src = "images/rain-48.png"></span>';
                                                            myOutput += '</span>'; // Close .top
                                                            myOutput += '<span class="bottomContent">'; 
                                                            myOutput += '<span>mm</span></span></span></div>';
                                                        }
                                                    }

                                                    for (i = 0; i < 17; i++) {
                                                        //console.log(aqhiData[i].station);
                                                        if (aqhiData[i].station == nearestAQHIStation.station) {
                                                            //console.log("Match AQHI");
                                                            var aqhiImage;
                                                            if (aqhiData[i].health_risk.split(" ")[0] != "Very ") {
                                                                aqhiImage = "images/aqhi-" + aqhiData[i].health_risk.toLowerCase();
                                                            } else {
                                                                aqhiImage = "images/aqhi-very_high";
                                                            }
                                                            myOutput += '<div class = contentContainer> <span class = "leftContent" id = "myAQHI">' +
                                                            '<img src = "' + aqhiImage + '.png"></span>';
                                                            myOutput += '<span class="rightContent">';
                                                            myOutput += '<span class="topContent">'; 
                                                            myOutput += '<span id "aqhiVal">' + aqhiData[i].aqhi + '</span>';
                                                            myOutput += '</span>'; 
                                                            myOutput += '<span class="bottomContent">';
                                                            myOutput += '<span id = "healthRisk">' + aqhiData[i].health_risk + '</span></span></span></div></div>';
                                                        }
                                                    }
                                                    myData.innerHTML += myOutput;
                                                });
                                            });
                                        }
                                    //GET DATA END
                                    });
                                });
                            });
                        }
                    })
                })
            }
        })
    }

    //district air quality block 
    aqhiOutput = "";
    fetch('https://dashboard.data.gov.hk/api/aqhi-individual?format=json')
    .then (aqhiResponse => {
        if (aqhiResponse.status == 200) {
            aqhiResponse.json().then ( aqhiData => {

                aqhiData.sort((a, b) => a.station.localeCompare(b.station));

                var airQContainer = document.createElement('div');
                airQContainer.setAttribute('id', 'airQContainer');

                var aqhiDropdown = document.createElement('select');
                aqhiDropdown.setAttribute('class', 'dropdown');
                var firstOption = document.createElement('option');
                firstOption.text = "";
                aqhiDropdown.appendChild(firstOption);
                airQContainer.innerHTML += "<div class = 'flavorText'>Select the AQ Station:</div>";
                for (let i = 0; i < aqhiData.length; i++) {
                    var option = document.createElement('option');
                    option.value = aqhiData[i].station;
                    option.text = aqhiData[i].station;
                    aqhiDropdown.appendChild(option);
                }
                airQContainer.appendChild(aqhiDropdown);
                airQBlock.appendChild(airQContainer);
                //stops entire block from closing when shown
                airQContainer.addEventListener('click', function(event) {
                    event.stopPropagation();
                });
                //sets to visible 
                document.getElementById('airQBlock').addEventListener('click', function(event) {
                    if (window.innerWidth <= 500) {
                        this.classList.toggle('active');
                    }
                });

                var aqhiDropdownOutput = document.createElement('div');
                aqhiDropdownOutput.setAttribute('id', 'aqhiDropdownOutput');
                airQContainer.appendChild(aqhiDropdownOutput);

                aqhiDropdown.addEventListener('change', function() {
                    var selectedStation = this.value;
                    var selectedData = aqhiData.find(item => item.station === selectedStation);
                    if (selectedData) {

                        aqhiOutput +='<div id = "aqhiLevel">Level: '+ selectedData.aqhi + '</div>';
                        aqhiOutput += '<div id = "aqhiRisk">Risk : ' +  selectedData.health_risk  + '</div>';
                    }
                    aqhiDropdownOutput.innerHTML = aqhiOutput;
                    aqhiOutput = "";
                })
            })
        }
    })
    //9 day weather forecast
    fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en')
    .then (nineDay => { 
        if(nineDay.status == 200) {
            nineDay.json().then ( nineDayData => {
                var outputForecast = "";
                outputForecast += '<table> <tr> ';              
                for (i = 0; i < nineDayData.weatherForecast.length; i++) {
                    //day of the week and date, int value so it removes the 0
                    outputForecast += '<td>' + nineDayData.weatherForecast[i].week.substr(0,3)  + " ";
                    var day = parseInt(nineDayData.weatherForecast[i].forecastDate.substr(4,2), 10);
                    var month = parseInt(nineDayData.weatherForecast[i].forecastDate.substr(6,2), 10);
                    outputForecast += day + "/" + month + "<br>";              
                    //weather icons
                    outputForecast += '<img id = "forecastIcon" src = "https://www.hko.gov.hk/images/HKOWxIconOutline/pic' 
                                        + nineDayData.weatherForecast[i].ForecastIcon +  '.png" > <br>';
                    //probability of significant rain icons, ensure that there is no space in return values                   
                    var psr = nineDayData.weatherForecast[i].PSR.replace(/ /g, '');
                    outputForecast += '<img id = "psrIcon" src = "https://www.hko.gov.hk/common/images/PSR' + psr +  '_50_light.png"> <br>';
                    //write temp range
                    outputForecast += nineDayData.weatherForecast[i].forecastMintemp.value + "-" 
                                      + nineDayData.weatherForecast[i].forecastMaxtemp.value + '&#x2103; <br>';
                    //write humidity range
                    outputForecast += nineDayData.weatherForecast[i].forecastMinrh.value + "-" 
                                      + nineDayData.weatherForecast[i].forecastMaxrh.value + '&#37; <br>';
                    outputForecast += '</td>'
                }              
                outputForecast += '</tr> </table>'
                nineDayForecast.innerHTML += outputForecast;
            })
        }
    })
}

window.onload = whenLoaded;
//convert to radian for coordinate calculation
function toRadians(num) {
    return num * (Math.PI / 180);
}
//for temperature and rainfall
function weatherDistance(station, currentLatitude, currentLongitude) {
    const R = 6371;
    const currLatinRad = toRadians(currentLatitude);
    const currLoninRad = toRadians(currentLongitude);
    const nearestLat = toRadians(station.latitude);
    const nearestLon = toRadians(station.longitude);

    const x = (nearestLon - currLoninRad) * Math.cos((currLatinRad + nearestLat) / 2);
    const y = nearestLat - currLatinRad;
    const d = Math.sqrt(x * x + y * y) * R

    return d;
}
//for air quality health index
function aqhiDistance(station, currentLatitude, currentLongitude) {
    const R = 6371;
    const currLatinRad = toRadians(currentLatitude);
    const currLoninRad = toRadians(currentLongitude);
    const nearestLat = toRadians(station.lat);
    const nearestLon = toRadians(station.lng);

    const x = (nearestLon - currLoninRad) * Math.cos((currLatinRad + nearestLat) / 2);
    const y = nearestLat - currLatinRad;
    const d = Math.sqrt(x * x + y * y) * R

    return d;
}