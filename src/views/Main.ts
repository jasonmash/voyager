import { Component, Vue } from "vue-property-decorator";
import { Configuration } from "@/models/configuration";

@Component
export default class Main extends Vue {
  public file: File | null = null;
  public configurations: Configuration[] = [];

  public uploadFile(event: any) {
    // Reference to the DOM input element
    const input = event.target;
    // Ensure file is selected
    if (!input.files || !input.files[0]) { return; }

    const reader = new FileReader();
    reader.onload = () => this.processInputFile(reader);
    reader.readAsText(input.files[0]);
  }

  private processInputFile(reader: FileReader) {
    if (typeof reader.result !== "string" || reader.result.length === 0) {
      console.error("Not a valid .json file.");
      return;
    }

    try {
      const inputData = JSON.parse(reader.result);

      if (Array.isArray(inputData)) {
        inputData.forEach((config: any) => {
          Object.keys(config).forEach((id: string) => {
            const index = this.configurations.findIndex((c: Configuration) => c.id === id);
            if (index >= 0) {
              this.configurations[index].addAttributeData(config[id]);
            } else {
              const c = new Configuration(id);
              c.addAttributeData(config[id]);
              this.configurations.push(c);
            }
          });
        });
      } else if (typeof inputData === "object" && !!inputData.id && !!inputData.graph) {
        const index = this.configurations.findIndex((c: Configuration) => c.id === inputData.id);
        if (index >= 0) {
          this.configurations[index].addGraphData(inputData.graph);
        } else {
          const c = new Configuration(inputData.id);
          c.addGraphData(inputData.graph);
          this.configurations.push(c);
        }
      } else {
        console.error("Unknown format");
      }

      console.log(this.configurations);
    } catch (err) {
      console.error("Not a valid .json file: " + err);
      return;
    }
  }
}
