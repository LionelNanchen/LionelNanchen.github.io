<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { useRiddlesStore } from "./stores";
import { RiddleId } from "./utils";
import FallingHearts from "./components/common/FallingHearts.vue";
import Passcode from "./components/common/Passcode.vue";

export default defineComponent({
  components: { RouterView, FallingHearts, Passcode },
  created() {
    // Update stored riddles responses from local storage
    const store = useRiddlesStore();
    Object.values(RiddleId).forEach((id: RiddleId) => store.updateResponse(id, localStorage.getItem(id) ?? ""))
  },
})
</script>

<template>
  <FallingHearts>
    <Passcode>
      <RouterView />
    </Passcode>
  </FallingHearts>
</template>