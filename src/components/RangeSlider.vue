<template>
  <div class="range-slider">
    <div class="multirange-box"></div>
    <input type="range" class="multirange original" @input="onChange" v-model="value1" :min="min" :max="max" :step="step">
    <input type="range" class="multirange ghost"    @input="onChange" v-model="value2" :min="min" :max="max" :step="step" :style="percentStyle">
    <p class="range-legend">
      <span>{{min}}</span>
      <span class="float-right">{{max}}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    min: Number, // Minimum possible value of range
    max: Number, // Maximum possible value of range
    step: Number, // Smallest increment value for adjustments to range
    minValue: Number, // Minimim selected value of range
    maxValue: Number  // Maximum selected value of range
  }
})
export default class RangeSlider extends Vue {
  // Value of range
  public value1: number = 0;
  public value2: number = 0;

  // Percentage of range selected (used for ui)
  public percent1: number = 0;
  public percent2: number = 100;

  /**
   * When component loads, set range to given values
   */
  public mounted() {
    this.value1 = this.$props.minValue;
    this.value2 = this.$props.maxValue;
  }

  /**
   * Get css styles to ensure correct portion of slider is highlighted
   */
  get percentStyle() {
    this.percent1 = 100 * ((this.value1 - this.$props.min) / (this.$props.max - this.$props.min));
    this.percent2 = 100 * ((this.value2 - this.$props.min) / (this.$props.max - this.$props.min));

    const percentLow = this.percent1 > this.percent2 ? this.percent2 : this.percent1;
    const percentHigh = this.percent1 > this.percent2 ? this.percent1 : this.percent2;

    return `--low:${percentLow + 0.5}%; --high:${percentHigh - 0.5}%;`;
  }

  /**
   * Handle range value change event
   */
  public onChange() {
    const minValue = this.percent1 > this.percent2 ? this.value2 : this.value1;
    const maxValue = this.percent1 > this.percent2 ? this.value1 : this.value2;

    this.$emit("change", { min: minValue, max: maxValue });
  }

}
</script>

<style>
.range-slider {
  width: 250px;
}
.multirange-box {
  position: absolute;
  z-index: 1;
  height: 30px;
  width: 250px;
  background: transparent;
}
input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-ms-track {
  width: 100%;
  cursor: pointer;
  background: transparent; 
  border-color: transparent;
  color: transparent;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  box-shadow: 0px 1px 1px rgba(0,0,0,0.1);
  border: 1px solid #ccc;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  margin-top: 0;
  transition: background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}

input[type=range]::-moz-range-thumb {
  box-shadow: 0px 1px 1px rgba(0,0,0,0.1);
  border: 1px solid #ccc;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

input[type=range]::-ms-thumb {
  box-shadow: 0px 1px 1px rgba(0,0,0,0.1);
  border: 1px solid #ccc;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}
input[type=range]:hover::-webkit-slider-thumb {
  background: #eee;
}
input[type=range]:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
input[type=range]:active::-webkit-slider-thumb {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
  box-shadow: none;
}
input[type=range]:hover::-moz-range-thumb {
  background: #eee;
}
input[type=range]:focus::-moz-range-thumb {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
input[type=range]:active::-moz-range-thumb {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
  box-shadow: none;
}
input[type=range]:hover::-ms-thumb {
  background: #eee;
}
input[type=range]:focus::-ms-thumb {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
input[type=range]:active::-ms-thumb {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
  box-shadow: none;
}

@supports (--css: variables) {
	input[type="range"].multirange {
		padding: 0;
		margin: 0;
		display: inline-block;
    vertical-align: top;
    width: 250px;
	}

	input[type="range"].multirange.original {
		position: absolute;
	}

  input[type="range"].multirange.original::-webkit-slider-thumb {
    position: relative;
    z-index: 4 !important;
  }

  input[type="range"].multirange.original::-moz-range-thumb {
    transform: scale(1); /* FF doesn't apply position it seems */
    z-index: 4 !important;
  }

  input[type="range"].multirange.ghost::-webkit-slider-thumb {
    position: relative;
    z-index: 5 !important;
  }

  input[type="range"].multirange.ghost::-moz-range-thumb {
    transform: scale(1); /* FF doesn't apply position it seems */
    z-index: 5 !important;
  }

  input[type="range"].multirange::-webkit-range-track {
    border-color: transparent; /* needed to switch FF to "styleable" control */
		background: var(--track-background);
  }

  input[type="range"].multirange::-moz-range-track {
    border-color: transparent; /* needed to switch FF to "styleable" control */
		background: var(--track-background);
  }

	input[type="range"].multirange.ghost {
		position: relative;
    background: var(--track-background);
		--track-background: linear-gradient(to right,
				#eee var(--low), var(--range-color) 0,
				var(--range-color) var(--high), #eee 0
			) no-repeat 0 45% / 100% 40%;
		--range-color: #007bff;
	}

  input[type="range"].multirange.ghost::-webkit-slider-runnable-track {
    background: var(--track-background);
  }

  input[type="range"].multirange.ghost::-moz-range-track {
    background: var(--track-background);
  }

}

.range-legend {
  width: 250px;
}
</style>