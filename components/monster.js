const WIDTH = 1230;
const HEIGHT = 800;

export default {
  props: ['no', 'name', 'path'],
  computed: {
    srcA() {
      return this.getSrc('a')
    },
    srcB() {
      return this.getSrc('b');
    },
    slides() {
      return [this.getSlide('a'), this.getSlide('b')];
    }
  },
  methods: {
    getSlide(which) {
      const alpha = which.toUpperCase();
      return {
        src: this[`src${alpha}`],
        alt: `${this.name}-${alpha}`,
        w: WIDTH,
        h: HEIGHT,
        thumbSelector: `#${this.getImgId(which)}`
      };
    },
    getSrc(which) {
      const path = this.path[this.path.length - 1] === '/' ? this.path : `${this.path}/`;
      return `${path}${this.no.toString().padStart(2, '0')}-${which.toUpperCase()}.jpeg`;
    },
    getImgId(which) {
      return `monster-img-${this.no}-${which}`;
    },
    handleImageClick(evt) {
      const index = Number(evt.currentTarget.dataset.index);
      this.$refs.photoSwipe.open(index);
    }
  },
  template: `
    <div class="c-monster">
      <h3>{{ name }}</h3>
      <figure>
        <img :src="srcA" :alt="name + 'A'" data-index="0" @click="handleImageClick" :id="getImgId('a')">
        <figcaption>{{ name + ' A' }}</figcaption>
      </figure>
      <figure>
        <img :src="srcB" :alt="name + 'B'" data-index="1" @click="handleImageClick" :id="getImgId('b')">
        <figcaption>{{ name + ' B' }}</figcaption>
      </figure>
      <photo-swipe :slides="slides" ref="photoSwipe"></photo-swipe>
    </div>
  `
}
