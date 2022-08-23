let legendColors = [
    '#008854',
    '#13BE00', 
    // '#76E000', 
    '#ADE500', 
    '#DFFE00', 
    '#FFF730', 
    '#FBE432', 
    // '#FED500', 
    '#FFA520', 
    '#FF7B16', 
    '#FD0A06', 
    '#C80000'
];

function getLegendColor(d) {
    return d > legendValues[9] ? legendColors[9] :
                d > legendValues[8] ? legendColors[8] :
                    d > legendValues[7] ? legendColors[7] :
                        d > legendValues[6] ? legendColors[6] :
                            d > legendValues[5] ? legendColors[5] :
                                d > legendValues[4] ? legendColors[4] :
                                    d > legendValues[3] ? legendColors[3] :
                                        d > legendValues[2] ? legendColors[2] :
                                            d > legendValues[1] ? legendColors[1] : legendColors[0];
}

function getStateColor(d) {
    return d > 4000 ? '#C80000' :
        d > 3000 ? '#FFA520' :
            d > 2500 ? '#FBE432' :
                d > 2000 ? '#13BE00' : '#008854';
}

function getRegionColor(d) {
    return d > 4000 ? '#C80000' :
        d > 3000 ? '#FFA520' :
            d > 2200 ? '#FBE432' :
                d > 1000 ? '#13BE00' : '#008854';
}



let GetLegendValues = function(data, priceIndex){
    let prices = [];
    minMax = [];
    legendValues = [];
    for (let i = 0; i < data.length; i++) {
        prices.push(data[i][priceIndex]);
    }
    minMax.push(Math.min.apply(Math, prices));
    minMax.push(Math.max.apply(Math, prices));

    let everyIncrement =Math.ceil((minMax[1] - minMax[0])/10);

    let currentValue = minMax[0];
    legendValues.push(currentValue);

    for(i=0;i<10;i++){
        currentValue = Math.ceil(currentValue + everyIncrement);
        legendValues.push(currentValue);
    }
    strMinPrice = minMax[0] + ' R$'
    strMaxPrice = minMax[1] + ' R$'
    // console.log([prices, minMax, everyIncrement, legendValues]);
    legend.update();
}

let updateValueToStatesGeojson = function () {
    $.get(statesUrl, function(data, status){
        data = JSON.parse(data);
        // console.log(data);
        GetLegendValues(data, 5);
        for(i=0;i<states.features.length;i++){
            for (let j = 0; j < data.length; j++) {
                if(data[j][1] == states.features[i].properties.StateID){
                    states.features[i].properties.DateKey = data[j][0];
                    states.features[i].properties.MinPerState = data[j][3];
                    states.features[i].properties.MaxPerState = data[j][4];
                    states.features[i].properties.AveragePerState = data[j][5];
                    continue;
                }                
            }
        }
    
        stateLayer = L.geoJson(states, {
            style: styleState,
            onEachFeature: onEachFeatureState
        }).addTo(map);
        map.fitBounds(stateLayer.getBounds());
        
    
    });
    
}

let updateValueToMesoregion = function(stateId){
    filteredreg = _.filter(regions.features, function (r) {
        return r.properties.StateID == stateId; // -1 means not present
    });
    
    $.get(mesoregironsByStateUrl+stateId, function(data, status){
        data = JSON.parse(data);
        GetLegendValues(data, 6);
        // console.log(data);
        for(i=0;i<filteredreg.length;i++){
            for (let j = 0; j < data.length; j++) {
                if(data[j][3] == filteredreg[i].properties.MesoregionName){
                    filteredreg[i].properties.DateKey = data[j][1];
                    filteredreg[i].properties.MinPrice = data[j][4];
                    filteredreg[i].properties.MaxPrice = data[j][5];
                    filteredreg[i].properties.AveragePrice = data[j][6];
                    continue;
                }                
            }
        }
    
        dis_stateLayer = L.geoJson(states, {
            style: styleDisState,
            onEachFeature: onEachFeatureDisState
        }).addTo(map);

        regionsLayer = L.geoJson(filteredreg, {
            style: styleRegion,
            onEachFeature: onEachFeatureRegion
        }).addTo(map);
        map.fitBounds(regionsLayer.getBounds());


        
    });
}

let updateValueToCity = function(regionId){
    
    filtered_city = _.filter(cities.features, function (r) {
        return r.properties.mesoregion_id == regionId; // -1 means not present
    });

    let stateId = filtered_city[0].properties.state_id;
    
    $.get(citiesByMesoregionUrl+regionId, function(data, status){
        data = JSON.parse(data);
        GetLegendValues(data, 4);
        // console.log(data);
        for(i=0;i<filtered_city.length;i++){
            for (let j = 0; j < data.length; j++) {
                if(data[j][2] == filtered_city[i].properties.name){
                    filtered_city[i].properties.DateKey = data[j][0];
                    filtered_city[i].properties.price_m2 = data[j][4];
                    continue;
                }                
            }
        }

        dis_stateLayer = L.geoJson(states, {
            style: styleDisState,
            onEachFeature: onEachFeatureDisState
        }).addTo(map);

        filteredreg = _.filter(regions.features, function (r) {
            return r.properties.StateID == stateId; // -1 means not present
        });
        dis_regionsLayer = L.geoJson(filteredreg, {
            style: styleDisRegion,
            onEachFeature: onEachFeatureDisRegion
        }).addTo(map);

        citiesLayer = L.geoJson(filtered_city, {
            style: styleCity,
            onEachFeature: onEachFeatureCity
        }).addTo(map);
        map.fitBounds(citiesLayer.getBounds());
        
    });
}

let updateValueToSao = function(cityId){
    
    $.get(saopauloUrl, function(data, status){
        data = JSON.parse(data);
        GetLegendValues(data, 4);
        // console.log(data);
        for(i=0;i<saopaulo.features.length;i++){
            for (let j = 0; j < data.length; j++) {
                if(data[j][1] == saopaulo.features[i].properties.name){
                    saopaulo.features[i].properties.price_m2 = data[j][4];
                    continue;
                }                
            }
        }

        filtered_city = _.filter(cities.features, function (r) {
            return r.properties.mesoregion_id == 3515; // -1 means not present
        });
    
        dis_cityLayer = L.geoJson(filtered_city, {
            style: styleDisCity,
            onEachFeature: onEachFeatureDisCity
        }).addTo(map);

        spLayer = L.geoJson(saopaulo, {
            style: styleSao,
            onEachFeature: onEachFeatureSao
        }).addTo(map);
        map.fitBounds(spLayer.getBounds());
        
    });
}



