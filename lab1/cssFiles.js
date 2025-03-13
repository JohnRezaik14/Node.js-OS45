import * as fs from "fs";
function getStyle(name) {
  const pageUrl = `.${name}.css`;
  const file = fs.readFileSync(pageUrl);
  return file;
}
export { getStyle };
