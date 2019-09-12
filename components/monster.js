export default {
  props: ['no', 'name', 'path'],
  computed: {
    srcA() {
      return this.getSrc('a')
    },
    srcB() {
      return this.getSrc('b');
    }
  },
  methods: {
    getSrc(which) {
      const path = this.path[this.path.length - 1] === '/' ? this.path : `${this.path}/`;
      return `${path}${this.no.toString().padStart(2, '0')}-${which.toUpperCase()}.jpeg`;
    }
  },
  template: `
    <div class="c-monster">
      <h3>{{ name }}</h3>
      <figure>
        <img :src="srcA" :alt="name + 'A'">
        <figcaption>{{ name + ' A' }}</figcaption>
      </figure>
    </div>
  `
}
