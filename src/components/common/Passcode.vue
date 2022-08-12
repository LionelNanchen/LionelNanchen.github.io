<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";
import { ElMessage } from 'element-plus';
import Logo from "../../assets/general/logo.png";
import Leaf from "../../assets/general/leaf.png";

interface Data {
    authenticated: boolean,
    passcode: string,
    input: string,
    logo: string,
    leaf: string,
}

export default defineComponent({
    data() {
        const data: Data = {
            authenticated: localStorage.getItem("authenticated") === "true" ?? false,
            passcode: `maldives${moment().startOf('day').diff(moment("05.10.2017", "DD.MM.YYYY").startOf('day'), "day")}`,
            input: "",
            logo: Logo,
            leaf: Leaf,
        };
        return data;
    },
    methods: {
        onClick() {
            this.authenticated = this.input.trim().replaceAll(" ", "").toLowerCase() === this.passcode.trim().replaceAll(" ", "").toLowerCase();
            if (this.authenticated) {
                localStorage.setItem("authenticated", "true");
                ElMessage({
                    message: "Dévérouillé",
                    type: "success",
                });
            } else {
                ElMessage({
                    message: "Mauvais code d'accès",
                    type: "error",
                });
            }
        },
    },
})
</script>

<template>
    <slot v-if="authenticated" />
    <div v-else class="passcode-container">
        <img class="logo" :src="logo" />
        <el-card class="passcode-card">
            <template #header>
                <div class="card-header">
                    <span class="card-header-title">Code d'accès</span>
                </div>
            </template>
            <div>
                <p style="font-size: 18px">Pour entrer merci de donner:</p>
                <p style="font-size: 14px">Le lieu de leur lune de miel.</p>
                <p style="font-size: 14px">Suivi du nombre de jours depuis leur rencontre.</p>
                <el-divider />
                <el-input type="text" placeholder="Code d'accès" v-model="input" />
                <div class="passcode-button">
                    <el-button @click="onClick" type="primary" round>
                        Déverrouiller
                    </el-button>
                </div>
            </div>
        </el-card>
        <img class="leaf" :src="leaf" />
    </div>
</template>

<style scoped>
.passcode-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.logo {
    height: 300px;
}

.passcode-card {
    margin: 12px;
    width: 90%;
}

.passcode-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
}

.leaf {
    width: 100px;
    margin: 40px 0px;
}
</style>