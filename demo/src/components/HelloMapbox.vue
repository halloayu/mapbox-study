<template>
    <div class="hello">
        <div id="map" class="map"></div>
    </div>
</template>

<script>
// import MapboxLanguage from '@mapbox/mapbox-gl-language'

export default {
    name: 'HelloMapbox',
    data() {
        return {
            map: null
        }
    },

    mounted() {
        this.$mapboxgl.accessToken = 'pk.eyJ1IjoiYXl1MjM4OSIsImEiOiJjbGU2dTJtc2IwOHplM3JtcnljODZqNWszIn0.iszjybKhsIp0AYyfu8sQmg'
        const map = new this.$mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/ayu2389/cllg9ei1o00ip01pw391qe0i9',
            projection: 'mercator', // Display the map as a globe, since satellite-v9 defaults to Mercator
            zoom: 10,
            maxZoom: 19,
            minZoom: 1,
            center: [40, 15],
            bearing: 180,
            pitch: 90
        });

        map.on('click', (e) => {
            console.log(e);
        });

        this.map = map
        this.map.addControl(new this.$mapboxgl.NavigationControl())
        this.map.addControl(new this.$mapboxgl.GeolocateControl())
        // this.map.on('load', () => {
        //     this.map.setLayoutProperty('country-label', 'text-field', [
        //         'get',
        //         `name_zh-Hans`
        //     ])
        // })

        // this.map.addControl(new MapboxLanguage({defaultLanguage: "zh-Hans"}))

        console.log(map)
    },

    methods: {
    }

}
</script>

<style scoped>
.hello {
    height: 100%;
    width: 100%;
}

.map {
    height: 100%;
    width: 100%;
}
</style>