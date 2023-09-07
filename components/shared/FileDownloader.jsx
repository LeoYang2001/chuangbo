'use client'

const FileDownloader = ({ fileUrl, fileName }) => {
    
    const handleDownload = async () => {
        const conf = confirm("Do you want to download the detail file?")
        if(!conf) return
      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName || 'downloadedFile'; // You can set a default filename here
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    };
  
    return (
      <div>
            <svg style={{
                cursor:'pointer'
            }} className='text-base-semibold text-light-2 bi bi-download' onClick={handleDownload} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"  viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
      </div>
    );
  };
  
  export default FileDownloader;