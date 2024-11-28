import fs from 'fs';
import path from 'path';

function renameImagesInDirectory() {
    fs.readdir("./", (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        // Filter for image files (you can add more extensions if needed)
        const imageFiles = files.filter(file => 
            /\.(jpg|jpeg|png|gif)$/i.test(file)
        );

        imageFiles.forEach((file, index) => {
            const oldPath = path.join("./", file);
            const newPath = path.join("./", `placeholder${index + 1}${path.extname(file)}`);

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error(`Error renaming ${file}:`, err);
                } else {
                    console.log(`Renamed ${file} to placeholder${index + 1}${path.extname(file)}`);
                }
            });
        });
    });
}

// Run the function
renameImagesInDirectory();