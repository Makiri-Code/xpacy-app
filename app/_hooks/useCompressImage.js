import { useState, useCallback, useEffect } from "react";
import imageCompression from "browser-image-compression";

const SERVER_BASE = "https://app.xpacy.com/src/upload/properties";

const normalizeServerFile = (file) => ({
  id: crypto.randomUUID(),
  name: file,
  type: file.endsWith(".mp4") ? "video/mp4" : "image/jpeg",
  size: 0,
  url: `${SERVER_BASE}/${file}`,
  isRemote: true,
});

const normalizeLocalFile = (file) => ({
  id: crypto.randomUUID(),
  name: file.name,
  type: file.type,
  size: file.size,
  url: URL.createObjectURL(file),
  isRemote: false,
  raw: file,
});

export const useCompressImage = (initialFiles = [], setParentFiles) => {
  const [files, setFiles] = useState([]);
  const [chosenFile, setChosenFile] = useState(null);

  // Normalize server files on mount
  useEffect(() => {
    if (initialFiles?.length) {
      const normalized = initialFiles.map(normalizeServerFile);
      setFiles(normalized);
      setChosenFile(normalized[0]);
    }
  }, [initialFiles]);

  const compressImage = useCallback(async (acceptedFiles) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      const compressed = await Promise.all(
        acceptedFiles.map((file) =>
          file.type.startsWith("image")
            ? imageCompression(file, options)
            : file
        )
      );

      const normalized = compressed.map(normalizeLocalFile);

      setFiles((prev) => {
        const unique = normalized.filter(
          (nf) => !prev.some((pf) => pf.name === nf.name)
        );
        const merged = [...prev, ...unique];

        setParentFiles?.(
          merged
            .filter((f) => !f.isRemote)
            .map((f) => f.raw)
        );

        return merged;
      });

      if (normalized.length) {
        setChosenFile(normalized[0]);
      }
    } catch (err) {
      console.error("Compression error:", err);
    }
  }, []);

  const removeFile = (file) => {
    setFiles((prev) => {
      const next = prev.filter((f) => f.id !== file.id);

    //   setParentFiles?.(
    //     next.filter((f) => !f.isRemote).map((f) => f.raw)
    //   );

      setChosenFile(next[0] || null);
      return next;
    });
  };

  return {
    compressImage,
    files,
    setFiles,
    chosenFile,
    setChosenFile,
    removeFile,
  };
};
