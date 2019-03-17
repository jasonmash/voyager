import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";

import DataManagement from "@/utils/data-management";
import Importer from "@/utils/importer";

import { Message } from "@/components/messages/Message";

@Component
export default class Toolbar extends Vue {

  public files: File[] | null = null;

  private fileCount: number = 0;
  private processedFiles: number = 0;
  private failedFiles: string[] = [];
  private successful = 0;

  public exportData() {
    DataManagement.exportAllData(this.$store);
  }

  public resetData() {
    const result = confirm("Are you sure you wish to remove all stored data? \n\n" +
      "This will remove all configurations, attributes, and reports.");
    if (result) {
      DataManagement.resetAllData(this.$store);
      this.$emit("refreshData");
    }
  }

  public importData() {
    const input: any = this.$refs.fileinput;
    input.$el.click();
  }

  public uploadFile(event: any) {
    const input = event.target;
    if (!input.files || input.files.length < 1) { return; }

    this.processedFiles = 0;
    this.successful = 0;
    this.failedFiles = [];

    this.$message({
      content: `Importing data...`,
      type: "info"
    });

    this.fileCount = input.files.length;
    const refreshData = () => this.$emit("refreshData");
    setTimeout(async () => {
      for (const file of input.files) {
        const reader = new FileReader();
        reader.onload = () => {
          const result: Message = Importer.processInputFile(reader, file, this.$store);
          this.importResult(result, file);
        };
        reader.readAsText(file);
      }

      const fileInput: any = this.$refs.fileinput;
      fileInput.reset();

      setTimeout(() => refreshData(), 100);
    }, 200);
  }

  public importResult(result: Message, file: any) {
    this.processedFiles++;
    if (result.type === "success") {
      this.successful++;
    } else {
      this.failedFiles.push(file.name);
      this.$message(result);
    }

    if (this.processedFiles === this.fileCount) {


      if (this.failedFiles.length === 0) {
        this.$message({
          content: `Successfully imported data from ${this.successful} file(s)`,
          type: "success"
        });
      } else if (this.successful > 0) {
        this.$message({
          content: `Failed to import from '${this.failedFiles.join(", ")}' ` +
            `successfully imported ${this.successful} remaining file(s)`,
          type: "warning"
        });
      }
    }
  }
}
