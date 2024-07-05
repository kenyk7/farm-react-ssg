const path = require("node:path");
const fsp = require("node:fs/promises");

function resolve(p) {
  return path.resolve(__dirname, p);
}

const emitPage = (page, html) => {
  const filename = path.join("build", `${page}.html`);
  fsp.writeFile(filename, html);
};

const pages = ["index", "about", "dashboard"];

async function main() {
  // load client html
  const template = await fsp.readFile(
    resolve("build/index_client.html"),
    "utf8"
  );
  const serverEntry = resolve("dist/index.js");
  const render = require(serverEntry);

  for (const page of pages) {
    // render the application to markup
    const markup = render(`/${page}`);
    const html = template.replace("{app-html-to-replace}", markup);
    // emit the static generated page, for example writing it to disk
    emitPage(page, html);
  }
}

main().then(() => console.log("Done"));
