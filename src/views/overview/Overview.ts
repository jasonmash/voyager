import { Component, Vue } from "vue-property-decorator";

import { Configuration } from "@/models/configuration";
import DataManagement from "@/utils/data-management";
import Importer from "@/utils/importer";

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

    this.$message({
      content: `Importing data...`,
      type: "info"
    });

    setTimeout(async () => {
      for (const file of input.files) {
        const reader = new FileReader();
        reader.onload = () => this.processInputFile(reader, file);
        reader.readAsText(file);
      }

      const fileInput: any = this.$refs.fileinput;
      fileInput.reset();
    }, 500);
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
      const result = Importer.importFile(inputData, this.$store);
      if (result) {
        this.$message({
          content: `Successfully imported data from '${file.name}'`,
          type: "success"
        });
      } else {
        this.$message({
          content: `Data within '${file.name}' is incorrectly formatted`,
          type: "danger",
          duration: 8000
        });
      }
    } catch (err) {
      this.$message({
        content: `Unable to process '${file.name}': ${err}`,
        type: "danger",
        duration: 8000
      });
    }
  }
}
