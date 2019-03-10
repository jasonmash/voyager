/**
 * Download svg file to computer
 * @param svgEl HTML element containing e-chart to export
 * @param name File name
 */
export const ExportSvg = (svgEl: any, name: string) => {
  if (!svgEl.$el || !svgEl.$el.children[0] || !svgEl.$el.children[0].children[0]) {
    return;
  }

  svgEl.$el.children[0].children[0].setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const svgBlob = new Blob([
    "<?xml version=\"1.0\" standalone=\"no\"?>\r\n",
    svgEl.$el.children[0].children[0].outerHTML
  ], { type: "image/svg+xml;charset=utf-8" });

  downloadUrl(URL.createObjectURL(svgBlob), name);
};

/**
 * Download canvas as png
 * @param element HTML element containing e-chart to export
 * @param name File name
 */
export const ExportCanvas = (element: any, name: string) => {
  if (!element.$el || !element.$el.children[0] || !element.$el.children[0].children[0]) { return; }

  downloadUrl(element.getDataURL({
    backgroundColor: "white"
  }), name);
};

/**
 * Triggers the file save dialog in the browser to save the provided data
 * @param urlData Data to download
 * @param name File name
 */
const downloadUrl = (urlData: string, name: string) => {
  const downloadLink = document.createElement("a");
  downloadLink.href = urlData;
  downloadLink.download = name;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
