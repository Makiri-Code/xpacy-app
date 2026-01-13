import { useState, useCallback } from "react";
import imageCompression from "browser-image-compression";

export const useCompressImage = (files, setFiles) => {
    const [chosenFile, setChosenFile] = useState(null);

    const compressImage = useCallback(async (acceptedFiles) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
        };

        try {
            const compressedFiles = await Promise.all(
                acceptedFiles.map((file) => imageCompression(file, options))
            );

            // Create previews and prepare new file objects
            const newFilesWithPreviews = compressedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            );

            setFiles((prevFiles) => {
                // Filter out duplicates based on name
                const uniqueNewFiles = newFilesWithPreviews.filter(
                    (newFile) => !prevFiles.some((f) => f.name === newFile.name)
                );
                return [...prevFiles, ...uniqueNewFiles];
            });

            // Set the first file from the current batch as the chosen file
            if (newFilesWithPreviews.length > 0) {
                setChosenFile(newFilesWithPreviews[0]);
            }

        } catch (error) {
            console.error("Image compression error:", error);
        }
    }, []); // Removed 'files' dependency to prevent unnecessary recreations
    return { compressImage, files, setFiles, chosenFile, setChosenFile };
};