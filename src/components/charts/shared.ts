/**
 * Download svg file to computer
 * @param svgEl HTML element containing e-chart to export
 * @param name File name
 */
export const ExportSvg = (svgEl: any, name: string) => {
  if (!svgEl.$el || !svgEl.$el.children[0] || !svgEl.$el.children[0].children[0]) { return; }
  svgEl.$el.children[0].children[0].setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const svgData = svgEl.$el.children[0].children[0].outerHTML;
  const preface = "<?xml version=\"1.0\" standalone=\"no\"?>\r\n";
  const svgBlob = new Blob([preface, svgData], {type: "image/svg+xml;charset=utf-8"});
  const svgUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = name;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
