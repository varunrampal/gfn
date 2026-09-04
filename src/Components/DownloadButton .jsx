import React from 'react';

const DownloadButton = () => {
  const handleDownload = () => {
    const fileUrl = '../../files/GFN_Availability_List.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'GFN_Availability_List.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleDownload}>Download File</button>
  );
};

export default DownloadButton;
