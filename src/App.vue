<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {

  }
})
export default class App extends Vue {

}
</script>

<style>
@import './css/normalize.css';
</style>
