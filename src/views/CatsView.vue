<script lang="ts">
import { defineComponent } from "vue";
import Container from "../components/common/Container.vue";
import { ForkSpoon } from '@element-plus/icons-vue';
import * as _ from "lodash";
import Kali from "../assets/cats/kali/kali.jpeg";
import Kyubi from "../assets/cats/kyubi/kyubi.jpeg";

interface Cat {
    name: string,
    image: string,
    drink: string,
    food: string,
    inputName?: string,
    options?: string[],
}

interface Data {
    cats: Cat[],
    images: string[],
    drinks: string[],
    foods: string[],
    remainingHearts: number,
}

export default defineComponent({
    components: { Container },
    data: () => {
        const data: Data = {
            cats: [
                {
                    name: "kali",
                    image: Kali,
                    drink: "🍷",
                    food: "🍎",
                },
                {
                    name: "kyubi",
                    image: Kyubi,
                    drink: "🥃",
                    food: "🍉",
                }
            ],
            images: [],
            drinks: ["🍷", "🥃", "🍺", "🥛", "☕️", "🫖", "🧃", "💧"],
            foods: ["🍎", "🍉", "🍇", "🍌", "🍓", "🧀", "🐠", "🐁"],
            remainingHearts: 3,
        };
        return data;
    },
    computed: {
        hearts() {
            return _.range(this.remainingHearts).map(() => "❤️").join("");
        },
        groups() {
            return [
                {
                    label: "Boissons",
                    options: this.drinks,
                },
                {
                    label: "Nourritures",
                    options: this.foods,
                }
            ];
        },
    },
    methods: {
        checkCatsName() {
            return true;
            return this.cats.reduce((acc, cat) => acc && cat.inputName?.toLocaleLowerCase() === cat.name.toLocaleLowerCase(), true)
        },
        checkFoodAndDrink() {
            const result = this.cats.reduce((acc, cat) => acc && !!cat.options && cat.options.includes(cat.drink) && cat.options.includes(cat.food), true)
            console.log("Result - ", result);
        }
    },
});
</script>

<template>
    <Container>
        <el-card class="cats-card">
            <template #header>
                <div class="card-header">
                    <span class="card-header-title">Nourris correctement les chats</span>
                    <span class="card-header-title">{{ hearts }}</span>
                </div>
            </template>
            <div class="cats-card-body">
                <div class="cats">
                    <div v-for="cat in cats" class="cat">
                        <img :src="cat.image" />
                        <el-input maxlength="10" type="text" v-model="cat.inputName" placeholder="Mon nom ?"
                            style="margin-top: 12px" />
                        <el-select v-if="checkCatsName()" v-model="cat.options" placeholder="Nourris moi !" size="large"
                            multiple :multiple-limit="2" style="margin: 12px 0px 12px 0px">
                            <el-option-group v-for="group in groups" :key="group.label" :label="group.label">
                                <el-option v-for="option in group.options" :key="option" :label="option"
                                    :value="option" />
                            </el-option-group>
                        </el-select>
                    </div>
                </div>
                <el-button class="button" @click="checkFoodAndDrink()" type="primary" size="large" round>
                    <el-icon>
                        <ForkSpoon />
                    </el-icon>
                    <span style="margin-right: 6px">À table</span>
                </el-button>
            </div>
        </el-card>
        <el-card class="cats-card">
            <template #header>
                <span class="card-header-title">Que souaitent-ils?</span>
            </template>
            <el-carousel arrow="always" :autoplay="false" indicator-position="none" height="300px">
                <el-carousel-item v-for="image in images" :key="image">
                    <el-image class="carousel-image" :src="image" :preview-src-list="images" :initial-index="0"
                        :preview-teleported="true" />
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </Container>
</template>

<style scoped>
.cats-card {
    margin: 12px;
}


.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header-title {
    font-weight: bold;
}

.cats-card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cats {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cat {
    width: 45%;
}

.cat img {
    width: 100%;
    border-radius: 12px;
}

.button {
    margin-top: 12px;
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
.el-select-dropdown__item {
    font-size: 24px !important;
}

.el-carousel__arrow {
    background-color: gray !important;
}

.el-image__inner {
    width: auto !important;
    max-width: 100%;
    max-height: 300px !important;
}
</style>