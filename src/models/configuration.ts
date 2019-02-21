export class Configuration {
  public id: string = "";
  public graph: GraphComponent[] = [];

  public connections: string[] = [];
  public components: string[] = [];

  public attributes: AttributeSet = {};

  constructor(id: string) {
    this.id = id;
  }

  public addGraphData(graphData: any) {
    this.graph = graphData;
    this.graph.forEach((component: GraphComponent) => {
      Object.keys(component).forEach((key: string) => {
        if (!this.components.includes(key)) {
          this.components.push(key);
        }
      });
    });
  }

  public addAttributeData(valueList: object[]) {
    const output: AttributeSet = {};

    valueList.forEach((inputInfo: any) => {
      Object.keys(inputInfo).forEach((key: string) => {
        output[key] = parseFloat(inputInfo[key]);
      });
    });

    this.attributes = output;
  }
}

export interface GraphComponent {
  [key: string]: GraphConnector[];
}

export interface GraphConnector {
  [key: string]: string;
}

export interface AttributeSet {
  [key: string]: number;
}
