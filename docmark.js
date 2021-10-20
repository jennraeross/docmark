#!/usr/bin/node

//* Imports -------------------------------
// FS, accesses system files
const fs = require('fs');

// Commander (Parses command line arguments)
const { program } = require('commander');
program.version('0.0.1');

// Markdown-It (Parses Markdown into HTML)
var md = require('markdown-it')();

// open (opens files in native system)
const open = require('open');

var boilerplateHeaderOpening = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Docmark Previewer</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="description" content="" />
    <script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>`;

var boilerplateHeaderClosing = `
  </head>
  <body>`;

var boilerplateEnd = `
  </body>
  </html>`

//* Main Code -----------------------------

program
  .requiredOption('-i, --input <files>', 'markdown files to convert')
  .option('-s, --style <sheet>', 'stylesheet to use in conversion');

program.parse(process.argv);

const options = program.opts();

if (options.style) {
  boilerplateHeaderClosing = '<link rel="stylesheet" type="text/css" href="' + options.style + '" />' + boilerplateHeaderClosing;
}

fs.readFile(options.input, 'utf-8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var results = boilerplateHeaderOpening + boilerplateHeaderClosing + md.render(data) + boilerplateEnd;
  console.log(results);
  fs.writeFile('output.html', results, function (err) {
    if (err) return console.log(err);
    open('output.html');
  })
});

