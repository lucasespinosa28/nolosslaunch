import { useState, useEffect } from 'react';

// Helper function to convert RGB to Hex
const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};
const useImageColors = (imageUrl: string) => {
  const [colors, setColors] = useState<{ first: string; last: string } | null>(null);

  useEffect(() => {
    const getImageColors = async () => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageUrl;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
        const firstPixel = rgbToHex(imageData[0], imageData[1], imageData[2]);
        const lastPixel = rgbToHex(
          imageData[imageData.length - 4],
          imageData[imageData.length - 3],
          imageData[imageData.length - 2]
        );

        setColors({ first: firstPixel, last: lastPixel });
      };
    };

    getImageColors();
  }, [imageUrl]);

  return colors;
};

export default useImageColors;