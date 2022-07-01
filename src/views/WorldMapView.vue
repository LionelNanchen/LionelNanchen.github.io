<script lang="ts">
import { defineComponent } from "vue";
import Container from "../components/common/Container.vue";
import Europe from "../assets/worldmap/europe_map.jpg";
import Berlin from "../assets/worldmap/berlin.jpg";
import Paris from "../assets/worldmap/paris.jpg";
import Madrid from "../assets/worldmap/madrid.jpg";
import Roma from "../assets/worldmap/roma.jpg";
import Athens from "../assets/worldmap/athens.jpg";
import Rabat from "../assets/worldmap/rabat.jpg";

interface Location {
    index: number,
    image: string,
}

interface Data {
    europe: string,
    locations: Location[],
    currentIndex: number,
}

export default defineComponent({
    components: { Container },
    data: () => {
        const data: Data = {
            europe: Europe,
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
                    image: Madrid,
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
                    image: Rabat,
                },
            ],
        };
        return data;
    },
    computed: {
        locationsImages(): string[] {
            return this.locations.map((l: Location) => l.image);
        },
        europeImages(): string[] {
            return [this.europe];
        },
    },
    methods: {
        onChangeIndex(index: number) {
            this.currentIndex = index + 1;
        }
    }
});
</script>

<template>
    <Container>
        <el-card class="world-map-card">
            <template #header>
                <span class="card-header-title">Où sont-ils partis en vacances</span>
            </template>
            <el-image style="width: 100%" :src="europe" :preview-src-list="europeImages" :initial-index="1" />
        </el-card>
        <el-card class="world-map-card">
            <template #header>
                <span class="card-header-title">Voyage n°{{ currentIndex }}</span>
            </template>
            <el-carousel arrow="always" :autoplay="false" indicator-position="none"
                @change="onChangeIndex">
                <el-carousel-item v-for="location in locations" :key="location.index">
                    <el-image class="carousel-image" :src="location.image" :preview-src-list="locationsImages"
                        :initial-index="location.index - 1" :preview-teleported="true" />
                </el-carousel-item>
            </el-carousel>
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

.carousel-image {
    width: 100%;
    margin-top: 12px;
}
</style>

<style>
.el-carousel__arrow {
    background-color: gray !important;
}
</style>