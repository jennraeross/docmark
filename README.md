# Docmark

---

Docmark is a simple utility to convert markdown to html formatted for print.

To do this, it takes in two arguments:

-i or --input is the markdown file

-s or --style is the css file, written in accordance with the specifications
for the pagedjs polyfill library

docmark relies on both pagedjs for the advanced printsetting and markdown-it for the
initial markdown to html conversion.
