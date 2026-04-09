import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';

async function createFacturXPDF() {
  // Charger un document PDF vierge
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 en points
  
  // Ajouter du contenu de test, par exemple, une mention légale
  page.drawText('Facture', {
    x: 50,
    y: 780,
    size: 30,
    color: rgb(0, 0, 0),
  });

  // Embedding le fichier XML factur-x
  const facturXData = fs.readFileSync('factur-x.xml');
  pdfDoc.attach(facturXData, 'factur-x.xml', {
    mime: 'application/xml',
    description: 'Factur-X XML file',
    modDate: new Date(),
  });

  // Enregistrement du fichier PDF en mémoire
  const pdfBytes = await pdfDoc.save();

  // Retourner le buffer du PDF
  return pdfBytes;
}

export { createFacturXPDF };