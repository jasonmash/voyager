import { Attribute } from "./attribute";

export class Configuration {
  public id: string = "";
  public graph: GraphComponent[] = [];

  public connections: string[] = [];
  public components: string[] = [];

  public attributes: Attribute[] = [];

  constructor(id: string) {
    this.id = id;
  }

  public setGraph(graphData: any) {
    this.graph = graphData;
    this.graph.forEach((component: GraphComponent) => {
      Object.keys(component).forEach((key: string) => {
        if (!this.components.includes(key)) {
          this.components.push(key);
        }
      });
    });
  }

  public setAttributes(attributeList: object[], store: any) {
    const output: Attribute[] = [];

    attributeList.forEach((attribute: any) => {
      Object.keys(attribute).forEach((key: string) => {
        const newAttribute: Attribute = {
          key,
          value: parseFloat(attribute[key])
        };
        store.dispatch("processAttribute", newAttribute);
        output.push(newAttribute);
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
