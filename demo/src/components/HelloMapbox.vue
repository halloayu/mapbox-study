<template>
    <div class="hello">
        <div id="map" class="map"></div>
    </div>
</template>

<script>
// import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { SVG_Arrow, SVG_Car, building, wall, room, lineMore, roomSearch } from '../util/common'

export default {
    name: 'HelloMapbox',
    data() {
        return {
            map: null,
            steps: 0,
            counter: 0
        }
    },

    mounted() {
        this.$mapboxgl.accessToken = 'pk.eyJ1IjoiYXl1MjM4OSIsImEiOiJjbGU2dTJtc2IwOHplM3JtcnljODZqNWszIn0.iszjybKhsIp0AYyfu8sQmg'
        const map = new this.$mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/ayu2389/cllg9ei1o00ip01pw391qe0i9',
            projection: 'mercator', // Display the map as a globe, since satellite-v9 defaults to Mercator
            zoom: 18,
            maxZoom: 19,
            minZoom: 1,
            center: [104.683110530306649, 28.821443190692982],
            bearing: 180,
            pitch: 0
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

        this.map.on('load', () => {
            this.init()
            this.initBuilding()
            this.initRoute()
            this.initClick()
        })
    },


    methods: {
        init() {
            const arrowIcon = new Image(10, 10)
            arrowIcon.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(SVG_Arrow))) //给图片对象写入base64编码的svg流
            arrowIcon.onload = () => {
                this.map.addImage('arrowIcon', arrowIcon)
            }
            const carIcon = new Image(20, 40)
            carIcon.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(SVG_Car))) //给图片对象写入base64编码的svg流
            carIcon.onload = () => {
                this.map.addImage('carIcon', carIcon)
            }
        },

        initBuilding() {
            // 建筑
            this.map.addSource('buildingSource', {
                type: 'geojson',
                data: building
            })
            this.map.addLayer({
                'id': 'buildingLayer',
                'type': 'fill-extrusion',
                'source': 'buildingSource',
                'paint': {
                    'fill-extrusion-color': '#aaaaaa',
                    'fill-extrusion-height': ['get', 'height'],
                    'fill-extrusion-opacity': ['interpolate', ['exponential', 0.5], ['zoom'], 18, 1, 18.1, 0],  // 建筑放大到一定程度隐藏
                },
            })

            // 墙体
            this.map.addSource('wallSource', {
                type: 'geojson',
                data: wall
            })
            this.map.addLayer({
                'id': 'wallLayer',
                'type': 'fill-extrusion',
                'source': 'wallSource',
                'paint': {
                    'fill-extrusion-color': '#ffffff',
                    'fill-extrusion-height': 2,
                    'fill-extrusion-opacity': 1,  // 建筑放大到一定程度隐藏
                },
            })

            // 房间
            this.map.addSource('roomSource', {
                type: 'geojson',
                data: room
            })
            this.map.addLayer({
                'id': 'roomLayer',
                'type': 'fill-extrusion',
                'source': 'roomSource',
                'paint': {
                    'fill-extrusion-color': ['get', 'background'],
                    'fill-extrusion-height': ['get', 'height'],
                    'fill-extrusion-opacity': 1,  // 建筑放大到一定程度隐藏
                }
            })

            // 房间label
            this.map.addLayer({
                'id': 'roomLabel',
                'type': 'symbol',
                'source': "roomSource",
                'layout': {
                    'symbol-placement': "point",
                    'text-field': ['get', 'name'],
                    'text-anchor': 'top',
                    'text-radial-offset': 0,
                    'text-justify': 'auto',
                    'icon-image': ['get', 'icon'],
                    'icon-size': 1,
                    'icon-offset': [0, -60],
                    'icon-rotation-alignment': 'viewport',
                    'icon-allow-overlap': false,
                    'icon-ignore-placement': false,
                    'icon-anchor': 'center',
                    'text-size': ['get', 'textSize'],
                },
                "paint": {
                    "text-color": ['get', 'textColor'],
                    'text-halo-color': '#FFFFFF',
                    'text-halo-width': 2,
                    'text-opacity': ['interpolate', ['exponential', 0.5], ['zoom'], 18, 0, 19, 1],
                    'icon-opacity': ['interpolate', ['exponential', 0.5], ['zoom'], 18, 0, 19, 1],
                }
            })

        },

        initRoute() {
            const point = {
                'type': 'FeatureCollection',
                'features': [{
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [
                            104.68070521337489,
                            28.821763271107827
                        ]
                    }
                }]
            }
            const geojson = {
                'type': 'FeatureCollection',
                'features': [
                    {
                        "geometry": {
                            "coordinates": [
                                [
                                    104.68070521337489,
                                    28.821763271107827
                                ],
                                [
                                    104.68251002531275,
                                    28.820279087189235
                                ],
                                [
                                    104.68382875754492,
                                    28.821495063150238
                                ],
                                [
                                    104.68198292373376,
                                    28.823004875622075
                                ],
                                [
                                    104.68075614319605,
                                    28.82182382735529
                                ]
                            ],
                            "type": "LineString"
                        },
                        "type": "Feature",
                        "properties": {}
                    }
                ]
            }

            let newCoord = []
            for (let i = 0; i < geojson.features[0].geometry.coordinates.length - 1; i++) {
                var from = this.$turf.point(geojson.features[0].geometry.coordinates[i])
                var to = this.$turf.point(geojson.features[0].geometry.coordinates[i + 1])
                let lDistance = this.$turf.distance(from, to)
                let rings = lineMore(from, to, lDistance, 0.0004)
                newCoord = newCoord.concat(rings)
            }

            this.steps = newCoord.length

            this.map.addSource('line', {
                type: 'geojson',
                data: geojson
            })

            this.map.addLayer({
                type: 'line',
                source: 'line',
                id: 'line-background',
                paint: {
                    'line-color': 'blue',
                    'line-width': 8,
                    'line-opacity': 0.4
                }
            })
            this.map.addLayer({
                'id': 'arrowLayer',
                'type': 'symbol',
                'source': 'line',
                'layout': {
                    'symbol-placement': 'line',
                    'symbol-spacing': 40, // 图标间隔
                    'icon-image': 'arrowIcon', //箭头图标
                }
            })

            this.map.addSource('point', {
                'type': 'geojson',
                'data': point
            })
            this.map.addLayer({
                'id': 'point',
                'source': 'point',
                'type': 'symbol',
                'layout': {
                    'icon-image': 'carIcon',
                    'icon-size': 1,
                    'icon-rotate': ['get', 'bearing'],
                    'icon-rotation-alignment': 'map',
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true
                }
            })

            const animate = () => {
                const start = newCoord[this.counter]
                const end = newCoord[this.counter + 1]
                point.features[0].geometry.coordinates = start

                point.features[0].properties.bearing = this.$turf.bearing(
                    this.$turf.point(start),
                    this.$turf.point(end)
                )

                this.map.getSource('point').setData(point)
                if (this.counter < this.steps - 2) {
                    requestAnimationFrame(animate)
                }

                this.counter = this.counter + 1
            }

            animate()
        },

        initClick() {
            this.map.on('click', (e) => {
                console.log(e)

                console.log(roomSearch(e.lngLat.lng, e.lngLat.lat))

                const feature = roomSearch(e.lngLat.lng, e.lngLat.lat)
                if (feature) {
                    this.$alert(feature.properties.name, '房间名称', {
                        confirmButtonText: '确定',
                        callback: action => {
                            console.log(action)
                        }
                    });
                }
            })
        }
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