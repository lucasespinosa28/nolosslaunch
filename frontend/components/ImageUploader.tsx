import React from 'react';
import { UploadButton } from '@/utils/uploadthing';

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  onUploadError: (error: Error) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onUploadError }) => {
  return (
    <fieldset>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res && res.length > 0) {
            console.log("Files: ", res);
            onImageUpload(res[0].url);
          }
        }}
        onUploadError={(error: Error) => {
          onUploadError(error);
        }}
      />
      <p className="text-gray-400 text-xs mt-1">Upload an image to represent your token (optional).</p>
    </fieldset>
  );
};

export default ImageUploader;