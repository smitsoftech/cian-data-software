import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import PropTypes from 'prop-types';

const ExportToImage = ({ elementId, fileName = 'export', scale = 2, className = '' }) => {
  const exportAsPNG = async () => {
    try {
      const element = document.getElementById(elementId);
      if (!element) return alert('Element to export not found');

      const canvas = await html2canvas(element, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (blob) saveAs(blob, `${fileName}.png`);
      }, 'image/png');
    } catch (err) {
      console.error('Export PNG error:', err);
      alert('Failed to export as PNG. See console for details.');
    }
  };

  const exportAsPDF = async () => {
    try {
      const element = document.getElementById(elementId);
      if (!element) return alert('Element to export not found');

      const canvas = await html2canvas(element, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

      // Calculate the image dimensions to fit A4
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth;
      const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

      let position = 0;
      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        // If content overflows the page height, add in multiple pages
        let remainingHeight = imgHeight;
        while (remainingHeight > 0) {
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          remainingHeight -= pageHeight;
          if (remainingHeight > 0) pdf.addPage();
          position -= pageHeight;
        }
      }

      pdf.save(`${fileName}.pdf`);
    } catch (err) {
      console.error('Export PDF error:', err);
      alert('Failed to export as PDF. See console for details.');
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <button onClick={exportAsPNG} className="bg-blue-600 text-white px-3 py-1 rounded">Export PNG</button>
      <button onClick={exportAsPDF} className="bg-green-600 text-white px-3 py-1 rounded">Export PDF</button>
    </div>
  );
};

ExportToImage.propTypes = {
  elementId: PropTypes.string.isRequired,
  fileName: PropTypes.string,
  scale: PropTypes.number,
  className: PropTypes.string,
};

export default ExportToImage;
