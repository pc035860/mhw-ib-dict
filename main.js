/* global Vue */

import Monster from './components/monster';

import monsters from './monsters.json'

Vue.component('monster', Monster);

new Vue({
  el: '#app',
  data: {
    query: '',
    monsters
  },
  computed: {
    monstersStr() {
      return JSON.stringify(this.monsters, null, 2);
    }
  }
});
