import { Component, Vue } from "vue-property-decorator";
import { Configuration } from "@/models/configuration";
import DataManagement from "@/utils/data-management";

@Component
export default class OverviewComponent extends Vue {
  public files: File[] | null = null;
  public configurations: Configuration[] = [];

  public exportData() {
    DataManagement.exportAllData(this.$store);
  }

  public reset() {
    const result = confirm("Are you sure you wish to remove all stored data?");
    if (result) { DataManagement.resetAllData(this.$store); }
  }

  public uploadFile(event: any) {
    const input = event.target;
    if (!input.files || input.files.length < 1) { return; }

    for (const file of input.files) {
      const reader = new FileReader();
      reader.onload = () => this.processInputFile(reader, file);
      reader.readAsText(file);
    }

    const fileInput: any = this.$refs.fileinput;
    fileInput.reset();
  }

  private processInputFile(reader: FileReader, file: File) {
    if (typeof reader.result !== "string" || reader.result.length === 0) {
      this.$message({
        content: `Invalid file uploaded: '${file.name}'`,
        type: "danger"
      });
      return;
    }

    try {
      const inputData = JSON.parse(reader.result);
      const updatedConfigurations: Configuration[] = [];

      if (Array.isArray(inputData)) {
        inputData.forEach((config: any) => {
          Object.keys(config).forEach((id: string) => {
            const index = updatedConfigurations.findIndex((c: Configuration) => c.id === id);
            if (index >= 0) {
              updatedConfigurations[index].setAttributes(config[id], this.$store);
            } else {
              const c = new Configuration(id);
              c.setAttributes(config[id], this.$store);
              updatedConfigurations.push(c);
            }
          });
        });
      } else if (typeof inputData === "object" && !!inputData.id && !!inputData.graph) {
        const index = updatedConfigurations.findIndex((c: Configuration) => c.id === inputData.id);
        if (index >= 0) {
          updatedConfigurations[index].setGraph(inputData.graph);
        } else {
          const c = new Configuration(inputData.id);
          c.setGraph(inputData.graph);
          updatedConfigurations.push(c);
        }
      } else {
        this.$message({
          content: `Data within '${file.name}' is incorrectly formatted`,
          type: "danger"
        });
        return;
      }
      this.$store.commit("addConfigurations", updatedConfigurations);
      this.$message({
        content: `Successfully imported data from '${file.name}'`,
        type: "success"
      });
    } catch (err) {
      this.$message({
        content: `Unable to process '${file.name}': ${err}`,
        type: "danger"
      });
      return;
    }
  }
}
