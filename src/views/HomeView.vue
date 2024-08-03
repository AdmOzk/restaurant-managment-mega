<template>
<h1>Home</h1>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
  },
})
export default class HomeView extends Vue {}
</script>
