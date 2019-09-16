import MonsterThumbPlaceholder from "./MonsterThumbPlaceholder";

const WIDTH = 1230;
const HEIGHT = 800;

export default {
  props: ["no", "name", "path", "thumb-path"],
  components: {
    "thumb-placeholder": MonsterThumbPlaceholder
  },
  data() {
    return {
      isLoadImage: false,
      observer: null
    };
  },
  computed: {
    srcA() {
      return this.getSrc("a");
    },
    srcB() {
      return this.getSrc("b");
    },
    srcAThumb() {
      return this.getSrc("a", true);
    },
    srcBThumb() {
      return this.getSrc("b", true);
    },
    slides() {
      return [this.getSlide("a"), this.getSlide("b")];
    }
  },
  methods: {
    getSlide(which) {
      const alpha = which.toUpperCase();
      return {
        src: this[`src${alpha}`],
        msrc: this[`src${alpha}Thumb`],
        alt: `${this.name}-${alpha}`,
        w: WIDTH,
        h: HEIGHT,
        thumbSelector: `#${this.getImgId(which)}`
      };
    },
    getSrc(which, isThumb = false) {
      const basePath = isThumb ? this.thumbPath : this.path;
      const path =
        basePath[basePath.length - 1] === "/" ? basePath : `${basePath}/`;
      const paddedNo = this.no.toString().padStart(2, "0");
      return `${path}${paddedNo}-${which.toUpperCase()}.jpg`;
    },
    getImgId(which) {
      return `monster-img-${this.no}-${which}`;
    },
    handleImageClick(evt) {
      const index = Number(evt.currentTarget.dataset.index);
      this.$refs.photoSwipe.open(index);
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) {
        return;
      }
      this.isLoadImage = true;
    });
    this.observer.observe(this.$el);
  },
  beforeDestroy() {
    this.observer.disconnect();
    this.observer = null;
  },
  template: `
    <div class="c-monster" :id="'monster-' + no">
      <h2 class="text-center mb-3">{{ name }}</h2>
      <div class="row">
        <div class="col-12 col-md-6 mb-2 mb-md-0">
          <div class="position-relative">
            <thumb-placeholder></thumb-placeholder>
            <figure v-if="isLoadImage" class="c-monster__figure">
              <img class="img-fluid" :src="srcAThumb" :alt="name + 'A'" data-index="0" @click="handleImageClick" :id="getImgId('a')">
              <figcaption>{{ name + ' A' }}</figcaption>
            </figure>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="position-relative">
            <thumb-placeholder></thumb-placeholder>
            <figure v-if="isLoadImage" class="c-monster__figure">
              <img class="img-fluid" :src="srcBThumb" :alt="name + 'B'" data-index="1" @click="handleImageClick" :id="getImgId('b')">
              <figcaption>{{ name + ' B' }}</figcaption>
            </figure>
          </div>
        </div>
      </div>
      <photo-swipe :slides="slides" ref="photoSwipe"></photo-swipe>
    </div>
  `
};
