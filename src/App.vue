<template>
  <div
    id="app"
    v-loading="isLoading"
  >
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ProgonCase',
    computed: {
      ...mapGetters(['isLoading']),
    },
  }
</script>
