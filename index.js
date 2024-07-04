mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fyb2xwb3MiLCJhIjoiQ01qN3dEWSJ9.Vgyz5uVSv3sw9QgPqdPTtA';

const nFormat = new Intl.NumberFormat(undefined, {minimumFractionDigits: 0});

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/carolpos/clxnbz55s02ko01qm046p65b1' // stylesheet location
});

var mapLayers = {
    'emission-by-country': ['2022-emission'],
    'forests-land-use': ['forests-land-use']
};

const popup = new mapboxgl.Popup({
    closeButton: false
});

map.on('load', () => {
    map.addControl(new mapboxgl.NavigationControl());
    const features = map.querySourceFeatures('composite', {
        'sourceLayer': '2022_emission_by_country_02-100f9c'
    });
    console.log(features);
    
    map.on('mousemove', '2022-emission', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        // console.log('A mousemove event has occurred.', e);
        let feature = e.features[0];
        console.log(feature.properties);

        let description = "<strong>" + feature.properties.Country + "</strong><br>" + nFormat.format(feature.properties['2022 Annua']) + " t"
        popup
            .setLngLat(e.lngLat)
            .setHTML(description)
            .addTo(map);

    });

    map.on('mouseleave', '2022-emission', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
        // map.setFilter('counties-highlighted', ['in', 'COUNTY', '']);
        overlay.style.display = 'none';
    });
    

    let elements = document.querySelectorAll('li.layer-toggle a');
    // Layer controls
    Array.prototype.forEach.call(elements, function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            let element = e.currentTarget;
            let layerId = element.id;
            
            Array.prototype.forEach.call(mapLayers[layerId], function (layer) {
                var visibility = map.getLayoutProperty(layer, 'visibility');
                console.log(visibility);
                if (visibility === 'visible' || visibility == undefined) {
                    element.classList.remove('active');
                    map.setLayoutProperty(layer, 'visibility', 'none');
                } else {
                    element.classList.add('active');
                    map.setLayoutProperty(layer, 'visibility', 'visible');
                }
            });
        });
    });

 

    
});