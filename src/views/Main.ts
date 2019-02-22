import { Component, Vue } from "vue-property-decorator";
import { Configuration } from "@/models/configuration";

@Component
export default class Main extends Vue {
  public file: File | null = null;
  public configurations: Configuration[] = [];

  public uploadFile(event: any) {
    const input = event.target;
    if (!input.files || !input.files[0]) { return; }

    const reader = new FileReader();
    reader.onload = () => this.processInputFile(reader, input.files[0]);
    reader.readAsText(input.files[0]);
  }

  private processInputFile(reader: FileReader, file: File) {
    if (typeof reader.result !== "string" || reader.result.length === 0) {
      this.$message({
        content: `Invalid file uploaded: '${file.name}'`,
        type: "danger",
        duration: 4000
      });
      return;
    }

    try {
      const inputData = JSON.parse(reader.result);

      if (Array.isArray(inputData)) {
        inputData.forEach((config: any) => {
          Object.keys(config).forEach((id: string) => {
            const index = this.configurations.findIndex((c: Configuration) => c.id === id);
            if (index >= 0) {
              this.configurations[index].setAttributes(config[id]);
            } else {
              const c = new Configuration(id);
              c.setAttributes(config[id]);
              this.configurations.push(c);
            }
          });
        });
      } else if (typeof inputData === "object" && !!inputData.id && !!inputData.graph) {
        const index = this.configurations.findIndex((c: Configuration) => c.id === inputData.id);
        if (index >= 0) {
          this.configurations[index].setGraph(inputData.graph);
        } else {
          const c = new Configuration(inputData.id);
          c.setGraph(inputData.graph);
          this.configurations.push(c);
        }
      } else {
        this.$message({
          content: `Data within '${file.name}' is incorrectly formatted`,
          type: "danger",
          duration: 4000
        });
        return;
      }
      this.$message({
        content: `Successfully imported data from '${file.name}'`,
        type: "success",
        duration: 2500
      });
    } catch (err) {
      this.$message({
        content: `Unable to process '${file.name}': ${err}`,
        type: "danger",
        duration: 4000
      });
      return;
    }
  }
}
