import React, { useState } from 'react';
// Import your Supabase client
import supabase from './SuperbaseUploader';

const SupabaseUpload = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // Track upload progress

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return alert('Please select a file to upload.');
    }

    setUploadStatus('uploading'); // Update upload status

    try {
      const { data, error } = await supabase
        .storage
        .from('inventory_bucket')
        .upload(selectedFile.name, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      console.log('File uploaded successfully:', data);
      setUploadStatus('success');
      setSelectedFile(null); // Clear selected file after successful upload

      onFileUpload(selectedFile); // Notify parent component of the uploaded file
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('error');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploadStatus === 'uploading'}>
        {uploadStatus === 'idle' ? 'Upload File' : (
          uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Failed'
        )}
      </button>
      {uploadStatus === 'success' && <p>File uploaded successfully!</p>}
    </div>
  );
};

export default SupabaseUpload;
