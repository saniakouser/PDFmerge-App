const PDFMerger = require('pdf-merger-js');

const pdfmerge = async (p1, p2) => {
  const merger = new PDFMerger();

  await merger.add(p1);
  await merger.add(p2);
  
  await merger.save('public/merged.pdf'); 
};

module.exports = pdfmerge;
