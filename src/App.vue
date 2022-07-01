<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { useRiddlesStore } from "./stores";
import { RiddleId } from "./utils";
import FallingHearts from "./components/common/FallingHearts.vue";

export default defineComponent({
  components: { RouterView, FallingHearts },
  created() {
    // Update stored riddles responses from local storage
    const store = useRiddlesStore();
    Object.values(RiddleId).forEach((id: RiddleId) => store.updateResponse(id, localStorage.getItem(id) ?? ""))
  },
})
</script>

<template>
  <FallingHearts>
    <RouterView />
  </FallingHearts>
</template>