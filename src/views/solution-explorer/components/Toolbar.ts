import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";
import axios from "axios";

import DataManagement from "@/utils/data-management";
import Importer from "@/utils/importer";

import { Message } from "@/components/messages/Message";
import { SettingsState } from "@/stores/settings";

/**
 * Toolbar component, provides user options to configure solution explorer
 * @export
 * @class Toolbar
 * @extends {Vue}
 */
@Component
export default class Toolbar extends Vue {

  // List of files selected by import dialog box
  public files: File[] | null = null;

  // Number of files in import list
  private fileCount: number = 0;

  // Number of processed files so far
  private processedFiles: number = 0;

  // List of files that failed during importing
  private failedFiles: string[] = [];

  // Number of successful files
  private successful = 0;

  private settings: SettingsState = new SettingsState();

  public mounted() {
    this.settings.configurationURL = this.$store.getters.settings.configurationURL;
    this.settings.visualisationURL = this.$store.getters.settings.visualisationURL;
  }

  /**
   * Function to export all system data to .json file
   * @memberof Toolbar
   */
  public exportData() {
    DataManagement.exportAllData(this.$store);
  }

  /**
   * Function to remove all system data
   * @memberof Toolbar
   */
  public resetData() {
    const result = confirm("Are you sure you wish to remove all stored data? \n\n" +
      "This will remove all configurations, attributes and reports.");
    if (result) {
      DataManagement.resetAllData(this.$store);
      this.$emit("refreshData");
    }
  }

  /**
   * Triggers import process, opens file dialog
   * @memberof Toolbar
   */
  public importData() {
    const input: any = this.$refs.fileinput;
    input.$el.click();
  }

  /**
   * Event handler for when a user uploads one or more files
   * @param {*} event
   * @returns
   * @memberof Toolbar
   */
  public uploadFile(event: any) {
    const input = event.target;
    if (!input.files || input.files.length < 1) { return; }

    // Reset variables
    this.processedFiles = 0;
    this.successful = 0;
    this.failedFiles = [];
    this.fileCount = input.files.length;

    // Update UI
    this.$message({
      content: `Importing data...`,
      type: "info"
    });

    // Process each file one by one
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

  /**
   * Handle result of a single file import
   * @param {Message} result Result of file import
   * @param {*} file File imported
   * @memberof Toolbar
   */
  public importResult(result: Message, file: any) {
    this.processedFiles++;
    if (result.type === "success") {
      this.successful++;
    } else {
      this.failedFiles.push(file.name);
      this.$message(result);
    }

    // Check if we've finished importing all files
    if (this.processedFiles === this.fileCount) {
      // If no failures, show green message box
      if (this.failedFiles.length === 0) {
        this.$message({
          content: `Successfully imported data from ${this.successful} file(s)`,
          type: "success"
        });
      } else if (this.successful > 0) {
        // Otherwise indicate failure by yellow message box
        this.$message({
          content: `Failed to import from '${this.failedFiles.join(", ")}' ` +
            `successfully imported ${this.successful} remaining file(s)`,
          type: "warning"
        });
      }
    }
  }

  public async api() {
    if (!this.settings) { return; }

    this.$store.commit("updateSettings", this.settings);

    if (this.settings.configurationURL) {
      DataManagement.resetAllData(this.$store);
      this.$emit("refreshData");

      try {
        const configurations = await axios.get(this.settings.configurationURL);
        if (configurations.status === 200) {
          Importer.importFile(configurations.data, this.$store);
          this.$emit("refreshData");
        }
      } catch (e) {
        this.$message({
          content: `Unable to load configurations from provided URL`,
          type: "danger"
        });
      }
    }
  }
}
