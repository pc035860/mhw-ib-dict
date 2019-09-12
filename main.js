/* global Vue */

import Monster from "./components/Monster";
import PhotoSwipe from "./components/PhotoSwipe";
import monsters from "./monsters.json";

Vue.component("monster", Monster);
Vue.component("PhotoSwipe", PhotoSwipe);

new Vue({
  el: "#app",
  data: {
    query: "",
    monsters
  },
  computed: {
    monstersStr() {
      return JSON.stringify(this.monsters, null, 2);
    }
  }
});
