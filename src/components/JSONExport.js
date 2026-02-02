import React, { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';

const JSONExport = ({ data, filename = 'form-schema.json', showPreview = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        onClick={handleDownload}
        className="btn-secondary"
        title="Download JSON"
      >
        <Download className="w-4 h-4 mr-2" />
        Export
      </button>
      
      {showPreview && (
        <button
          onClick={handleCopy}
          className={`btn-ghost ${copied ? 'text-green-600' : ''}`}
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      )}
    </>
  );
};

export default JSONExport;

