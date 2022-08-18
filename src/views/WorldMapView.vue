<script lang="ts">
import { defineComponent } from "vue";
import Container from "../components/common/Container.vue";
import Berlin from "../assets/worldmap/berlin.jpg";
import Paris from "../assets/worldmap/paris.jpg";
import Barcelona from "../assets/worldmap/barcelona.jpg";
import Roma from "../assets/worldmap/roma.jpg";
import Athens from "../assets/worldmap/athens.jpg";
import Maroc from "../assets/worldmap/maroc.jpg";

import Marker0 from "../assets/worldmap/markers/marker_0.png";
import Marker1 from "../assets/worldmap/markers/marker_1.png";
import Marker2 from "../assets/worldmap/markers/marker_2.png";
import Marker3 from "../assets/worldmap/markers/marker_3.png";
import Marker4 from "../assets/worldmap/markers/marker_4.png";
import Marker5 from "../assets/worldmap/markers/marker_5.png";


import {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LPolyline,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
    index: number,
    image: string,
}

interface LatLbg {
    lat: number,
    lng: number,
}

interface Data {
    zoom: number,
    markerIcons: string[];
    markers: number[][],
    currentIndex: number,
    locations: Location[],
}

export default defineComponent({
    components: {
        Container,
        LMap,
        LIcon,
        LTileLayer,
        LMarker,
        LPolyline,
    },
    data: () => {
        const data: Data = {
            zoom: 5,
            markerIcons: [Marker0, Marker1, Marker2, Marker3, Marker4, Marker5],
            markers: [
                [47.3775499, 8.4666756],
                [46.9547232, 7.3598507],
                [46.8031888, 7.1238869],
                [46.2050579, 6.126579],
                [46.2167836, 7.2952253],
                [46.2010191, 8.9825106],
            ],
            currentIndex: 1,
            locations: [
                {
                    index: 1,
                    image: Berlin,
                },
                {
                    index: 2,
                    image: Paris,
                },
                {
                    index: 3,
                    image: Barcelona,
                },
                {
                    index: 4,
                    image: Roma,
                },
                {
                    index: 5,
                    image: Athens,
                },
                {
                    index: 6,
                    image: Maroc,
                },
            ],
        };
        return data;
    },
    computed: {
        locationsImages(): string[] {
            return this.locations.map((l: Location) => l.image);
        },
        iconSize(): number[] {
            return [6 * this.zoom, 6 * this.zoom];
        }
    },
    methods: {
        onChangeIndex(index: number) {
            this.currentIndex = index + 1;
        },
        markerUpdated(latLng: LatLbg, index: number) {
            const markers = [...this.markers];
            markers[index] = Object.values(latLng);
            this.markers = markers;
        },
    },
});
</script>

<template>
    <Container>
        <el-card class="world-map-card">
            <template #header>
                <span class="card-header-title">Voyage n°{{ currentIndex }}</span>
            </template>
            <el-carousel arrow="always" :autoplay="false" indicator-position="none" height="300px"
                @change="onChangeIndex">
                <el-carousel-item v-for="location in locations" :key="location.index">
                    <el-image class="carousel-image" :src="location.image" :preview-src-list="locationsImages"
                        :initial-index="location.index - 1" :preview-teleported="true" />
                </el-carousel-item>
            </el-carousel>
        </el-card>
        <el-card class="world-map-card">
            <template #header>
                <span class="card-header-title">Où sont-ils partis en vacances</span>
            </template>
            <p class="card-help">Les repères peuvent être déplacés</p>
            <l-map v-model="zoom" v-model:zoom="zoom" :center="[46.9547232, 7.3598507]" style="height: 500px">
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <l-marker v-for="(marker, index) in markers" draggable :lat-lng="marker"
                    @update:lat-lng="(e) => markerUpdated(e, index)" >
                    <l-icon :iconUrl="markerIcons[index]" :iconSize="iconSize" />
                    </l-marker>
                <l-polyline :latLngs="markers" color="green" />
            </l-map>
        </el-card>
    </Container>
</template>

<style scoped>
.world-map-card {
    margin: 12px;
}

.card-header-title {
    font-weight: bold;
}

.card-help {
    margin-bottom: 10px;
    font-size: 14px;
}

.carousel-image {
    width: 100%;
    margin-top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<style>
.el-carousel__arrow {
    background-color: gray !important;
}

.el-image__inner {
    width: auto !important;
    max-width: 100%;
    max-height: 300px !important;   
}
</style>