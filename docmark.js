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

// liveserver, to preview content in browser
var liveServer = require("live-server");

// Beginning of default boilerplate for generated html file
var boilerplateHeaderOpening = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Docmark Previewer</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="description" content="" />
    <script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>`;

// closing part of header boilerplate (to allow the stylesheet to be inserted later)    
var boilerplateHeaderClosing = `
  </head>
  <body>`;

// Boilerplate for the end of the html file
var boilerplateEnd = `
  </body>
  </html>`

//* Main Code -----------------------------

// Use commander to create commandline arguments
program
  .requiredOption('-i, --input <files>', 'markdown files to convert')
  .option('-s, --style <sheet>', 'stylesheet to use in conversion');
program.parse(process.argv);

// Variable containing options chosen by user
const options = program.opts();

// Add stylesheet, if provided
if (options.style) {
  boilerplateHeaderClosing = '<link rel="stylesheet" type="text/css" href="' + options.style + '" />' + boilerplateHeaderClosing;
}

// Create HTML file and open in browser
fs.readFile(options.input, 'utf-8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  
  // Combine boilerplate with generated html
  var results = boilerplateHeaderOpening + boilerplateHeaderClosing + md.render(data) + boilerplateEnd;
  
  // Write to file called output.html
  fs.writeFile('output.html', results, function (err) {
    if (err) return console.log(err);

    // TODO: Open file in browser
    var params = {open: true, file: 'output.html'};
    liveServer.start(params);
    //open('output.html');
  })
});

