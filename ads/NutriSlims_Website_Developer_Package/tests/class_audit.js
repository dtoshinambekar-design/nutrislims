const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(baseDir, 'prototype', 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(baseDir, 'prototype', 'styles.css'), 'utf8');

const bodyHtml = html.split(/<body[^>]*>/i)[1]?.split(/<\/body>/i)[0] || '';

const tagClassRegex = /<([a-z0-9]+)([^>]*)>/gi;
let totalBodyElements = 0;
let styledBodyElements = 0;
let unstyledBodyElements = [];

let m;
while ((m = tagClassRegex.exec(bodyHtml)) !== null) {
  totalBodyElements++;
  const tag = m[1].toLowerCase();
  const attrs = m[2];
  const classMatch = attrs.match(/class=["']([^"']+)["']/i);
  const classes = classMatch ? classMatch[1].split(/\s+/).filter(Boolean) : [];
  
  // Check if tag is styled in CSS
  const tagStyled = new RegExp(`(^|[^a-zA-Z0-9_-])${tag}([^a-zA-Z0-9_-]|$)`, 'm').test(css);
  // Check if any class is styled
  const anyClassStyled = classes.some(c => {
    const esc = c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    return new RegExp(`\\.${esc}\\b`).test(css);
  });
  
  if (tagStyled || anyClassStyled) {
    styledBodyElements++;
  } else {
    unstyledBodyElements.push({ tag, classes: classes.join(' '), preview: m[0].slice(0, 60) });
  }
}

console.log('Total BODY elements:', totalBodyElements);
console.log('Styled BODY elements (tag or class in CSS):', styledBodyElements);
console.log('Unstyled BODY elements:', unstyledBodyElements.length);
if (unstyledBodyElements.length > 0) {
  console.log('Unstyled body elements:', unstyledBodyElements);
}
