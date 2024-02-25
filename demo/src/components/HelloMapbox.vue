<template>
    <div class="hello">
        <div id="map" class="map"></div>
    </div>
</template>
  
<script>

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
            style: 'mapbox://styles/mapbox/streets-v12',
            projection: 'mercator', // Display the map as a globe, since satellite-v9 defaults to Mercator
            zoom: 10,
            maxZoom: 10,
            minZoom: 9,
            center: [40, 15],
            bearing: 180,
            pitch: 90
        });

        map.on('click', (e) => {
            console.log(e);
        });

        this.map = map
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