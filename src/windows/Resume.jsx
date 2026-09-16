import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { Download } from 'lucide-react';
import React, { useState } from 'react'

import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Resume = () => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex flex-col h-full">
      <div id='window-header' style={{ position: 'relative', zIndex: 10 }}>
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a href="files/resume.pdf" download aria-label="Download Resume" className='cursor-pointer'>
          <Download className='icon' />
        </a>
      </div>
      <div
        className="overflow-y-auto max-h-[87vh] resume-scroll"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style>{`
            .resume-scroll::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        <Document
          file="files/resume.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          suspense={false}
        >
          {numPages && Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer
              renderAnnotationLayer
              className="mb-1"
            />
          ))}
        </Document>
      </div>
    </div>
  )
}

const ResumeWindow = WindowWrapper(Resume, 'resume')

export default ResumeWindow;
