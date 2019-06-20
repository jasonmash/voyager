import echarts from "echarts";

import { Attribute } from "@/models/attribute";
import { ConfigurationStructure, Configuration } from "@/models/configuration";

import "./charts.css";

/**
 * Get e-charts content for tooltip with structural chart
 * @param $store Reference to Vuex store
 * @param config Configuration object to show
 */
export const GetTooltipContent = ($store: any, config: Configuration) => {
    // Return content of tooltip as HTML
    // Get attribute html content
    let attrHtml = "";
    $store.getters.attributes.forEach((a: Attribute) => {
      attrHtml = `${attrHtml}<b>${a.friendlyName}</b>:<br>${config.attributes[a.key]}<br>`;
    });
    // Get structure chart html content
    if (config.structure && config.structure.components.length > 0) {
      setTimeout(() => {
        // Load echart after delay to ensure it loads after its container has rendered
        const structureChart = echarts.init(document.getElementById("tooltip-canvas"));
        structureChart.setOption(getStructureChartData(config.structure));
      }, 10);
      return `<h5 class="mb-1">${config.id}</h5>` +
        `<div id="tooltip-canvas" style="float: right; width: 150px; height:150px"></div>${attrHtml}`;
    }
    return `<h5 class="mb-1">${config.id}</h5>${attrHtml}`;
};

/**
 * Returns echarts object for structure chart
 */
const getStructureChartData = (structure: ConfigurationStructure) => {

  const data = structure.components.map((c) => {
    return { name: c, x: 300, y: 300 };
  });

  const links = structure.connections.map((c) => {
    return { target: c.from, source: c.to, label: { formatter: c.label, show: false, fontSize: 10 } };
  });

  return {
    tooltip: {},
    series: [
      {
        type: "graph",
        layout: "force",
        symbolSize: 20,
        symbol: "circle",
        animation: false,
        focusNodeAdjacency: true,
        draggable: true,
        roam: true,
        label: {
          normal: {
            show: true,
            textStyle: {
              fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',sans-serif"
            }
          }
        },
        force: {
          initLayout: "force",
          edgeLength: 0.25,
          gravity: 0.9,
          repulsion: 0.3,
          layoutAnimation: false
        },
        edgeSymbol: ["arrow"],
        edgeSymbolSize: 9,
        data,
        links,
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 2,
            curveness: 0.2
          }
        }
      }
    ]
  };
};
