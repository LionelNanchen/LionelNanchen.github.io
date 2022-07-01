<script lang="ts">
import { defineComponent } from "vue";
import { RefreshLeft } from '@element-plus/icons-vue';

interface Hieroglyph {
    h: string,
    r: string,
}

export default defineComponent({
    components: { RefreshLeft },
    props: {
        onReset: { type: Function, require: true, },
    }
})

</script>

<template>
    <el-button @click="onReset" type="danger" round>
        <span style="margin-right: 6px">Reset</span>
        <el-icon>
            <RefreshLeft />
        </el-icon>
    </el-button>
</template>