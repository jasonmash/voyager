import { Component, Vue } from "vue-property-decorator";

@Component
export default class Demo extends Vue {
  public data = [
    { name: "f", max: 20, value: 19 },
    { name: "e", max: 20, value: 9 },
    { name: "d", max: 20, value: 18 },
    { name: "c", max: 20, value: 16 },
    { name: "b", max: 20, value: 16 },
    { name: "a", max: 20, value: 20 }
  ];

  public data3d = {
    tooltip: {},
    backgroundColor: "#fff",
    visualMap: {
      show: false,
      dimension: 2,
      min: -1,
      max: 1,
      inRange: {
        color: [
          "#313695", "#4575b4", "#74add1", "#abd9e9",
          "#e0f3f8", "#ffffbf", "#fee090", "#fdae61",
          "#f46d43", "#d73027", "#a50026"]
      }
    },
    xAxis3D: {
      type: "value"
    },
    yAxis3D: {
      type: "value"
    },
    zAxis3D: {
      type: "value"
    },
    grid3D: {
      viewControl: {
        // projection: 'orthographic'
      }
    },
    series: [{
      type: "surface",
      wireframe: {
        // show: false
      },
      equation: {
        x: {
          step: 0.05
        },
        y: {
          step: 0.05
        },
        z: (x: any, y: any) => {
          if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
            return "-";
          }
          return Math.sin(x * Math.PI) * Math.sin(y * Math.PI);
        }
      }
    }]
  };

  public radarData = {
    tooltip: {},
    radar: {
      indicator: this.data.map(({ name, max }) => {
        return { name, max };
      })
    },
    series: [
      {
        name: "Configuration ID",
        type: "radar",
        data: [{ value: this.data.map(({ value }) => value) }]
      }
    ]
  };

}
