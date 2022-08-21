
var styleAoi = {
    weight: 1,
    color: "#FF10F0",
    opacity: 1,
    fillColor: "#F7CCAC",
    fillOpacity: 0
}

function styleState(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 1,
        fillColor: getLegendColor(feature.properties.AveragePerState) //  "#d3d3d3"
    };
}
function styleDisState(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 1,
        fillColor: "#d3d3d3"
    };
}
function styleDisRegion(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 1,
        fillColor: "#939393"
    };
}

function styleRegion(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 1,
        fillColor: getLegendColor(feature.properties.AveragePrice)
    };
}

function styleCity(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 1,
        fillColor: getLegendColor(feature.properties.price_m2)
    };
}

function styleSao(feature) {
    return {
        weight: .5,
        opacity: 1,
        color: 'white',
        fillOpacity: 1,
        fillColor: getLegendColor(feature.properties.price_m2)
    };
}

let GoogleIcon = function (html) {
    return L.divIcon({
        html: html,
        iconSize: [16, 16],
        className: 'my-google-icon'
    });
}

let pngIconStyle = L.Icon.extend({
    options: {
       iconSize: [16, 25]
    }
});

let pngIcon = function (url) {
    return new pngIconStyle({
        iconUrl: url
    })
}