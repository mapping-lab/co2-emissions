mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fyb2xwb3MiLCJhIjoiQ01qN3dEWSJ9.Vgyz5uVSv3sw9QgPqdPTtA';

const nFormat = new Intl.NumberFormat(undefined, {minimumFractionDigits: 0});

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/carolpos/cm0461l0f00ea01plat5nafeu' // stylesheet location
});

var mapLayers = {
    'group0': ['forests-land-use', 'forests-color-land-use'],
    'group1': ['2022-emission-grid1grau-l-copy-1', '2022-emission-grid1grau-fill-copy-1'],
    'group2': ['2022-emission-grid1grau-l-copy', '2022-emission-grid1grau-fill-copy'],
    'group3': ['2022-emission-grid1grau-l-copy-2', '2022-emission-grid1grau-fill-copy-2'],
    'group4': ['2022-emission-grid1grau-l', '2022-emission-grid1grau-fill']
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
        console.log('mouse over');
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