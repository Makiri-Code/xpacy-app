"use client";

import { IoCheckmark, IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

import { useEffect, useState } from "react";

import { BiPlus } from "react-icons/bi";
import { LiaFileVideoSolid, LiaFileImageSolid } from "react-icons/lia";
import { PiFloppyDiskThin } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function DragnDrop({accept, selectedFiles, setSelectedFiles, maxFiles}) {

  const [chosenFile, setChosenFile] = useState(() => selectedFiles[0]);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noKeyboard: true,
    noClick: true,
    maxFiles,
    accept,
    onDrop: (acceptedFiles) => {
      setSelectedFiles((prev) => {
        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        return [...prev, ...newFiles];
      });
      setChosenFile(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )[0]
      );
    },
  });
  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () =>{
  //     selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  //   }
  // }, [selectedFiles]);
  const handleSelectChosen = (file) => {
    setChosenFile(file);
  };
  const handleRemoveFile = (file) => {
    setSelectedFiles((prev) => prev.filter((prevFile) => prevFile.name !== file.name))
  }
  useEffect(() => {
    setChosenFile(selectedFiles[0])
  }, [selectedFiles])
  return (
    <>
      {selectedFiles.length ? (
        <div className="w-full h-full px-6 py-4 flex flex-col gap-4 border border-gray-200 rounded-lg font-mono">
          {chosenFile && (
            <div className="w-full h-[500px] relative">
              {chosenFile?.type?.startsWith("image") && (
                <img
                  className="object-contain w-full h-full rounded-lg"
                  src={chosenFile.preview}
                  alt="upload-img"
                />
              )}
              {chosenFile.type.startsWith("video") && (
                <video
                  src={chosenFile.preview}
                  controls
                  muted
                  className="w-full h-full "
                />
              )}
            </div>
          )}
          {/* files list and add more btn */}
          <div className="p-1 flex items-center gap-2 font-mono">
            <div className="flex items-center gap-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 relative rounded-lg ${
                    chosenFile?.name === file?.name &&
                    "border-2 border-[#E63855]"
                  }`}
                  onClick={() => handleSelectChosen(file)}
                >
                  {file.type.startsWith("image") && (
                    <img
                      src={file.preview}
                      className="w-full h-full object-cover "
                    />
                  )}
                  {file.type.startsWith("video") && (
                    <video src={file.preview} className="h-full w-full" />
                  )}
                  <div className="absolute top-1 left-1 w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 z-20 text-gray-600">
                    {index + 1}
                  </div>
                  {chosenFile?.name === file?.name && (
                    <div className="absolute bottom-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-[#E63855] z-30 text-white">
                      <IoCheckmark />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Add more */}
            {maxFiles > 1 && (<div {...getRootProps}>
              <input {...getInputProps()} />
              <button
                type="button"
                className="w-20 h-20 border-2 font-mono border-dashed border-gray-300 rounded-lg flex flex-col gap-1 items-center justify-center p-0.5 text-sm cursor-pointer text-gray-600"
                onClick={open}
              >
                <span className="text-2xl">
                  <BiPlus />
                </span>
                <span>Add more</span>
              </button>
            </div>)}
          </div>
          {/* File description */}
          {chosenFile && (
            <div className="flex items-center gap-2 font-mono">
              {/* Type of file */}
              <div className="flex gap-1 items-center text-gray-500 text-sm">
                {chosenFile.type.startsWith("video") && (
                  <>
                    <span className="text-[20px]">
                      <LiaFileVideoSolid />
                    </span>
                    <span>{chosenFile.type}</span>
                  </>
                )}
                {chosenFile.type.startsWith("image") && (
                  <>
                    <span className="text-[20px]">
                      <LiaFileImageSolid />
                    </span>
                    <span>{chosenFile.type}</span>
                  </>
                )}
              </div>
              {/* Size of file */}
              <div className="text-gray-200 text-sm">.</div>
              <div className="flex gap-1 items-center text-gray-500 text-sm">
                <span className="text-[20px]">
                  <PiFloppyDiskThin />
                </span>
                <span>{Math.round(chosenFile.size / 1000000)}MB</span>
              </div>
            </div>
          )}
          {/* Remove file  */}
          { chosenFile &&
            <div className="flex items-center gap-1.5 text-[#E03131] cursor-pointer" onClick={() => handleRemoveFile(chosenFile)}>
              <span className="text-[20px]"><RiDeleteBin6Line/></span>
              <span className="text-sm font-medium">Remove</span>
            </div>
          }
        </div>
      ) : (
        <div className="w-full h-full  border border-gray-200 flex items-center justify-center font-mono rounded-2xl">
          <div
            {...getRootProps({
              className:
                "flex flex-col items-center justify-center gap-4  px-6 py-4",
            })}
          >
            <input {...getInputProps()} />
            <span className="text-[40px]">
              <IoCloudUploadOutline />
            </span>
            <div className="space-x-2">
              <button
                className="text-primary font-bold text-lg cursor-pointer"
                type="button"
                onClick={open}
              >
                Click to upload
              </button>
              <span className="text-gray-500 text-sm">or drag and drop</span>
              <p className="text-gray-500 text-sm">
                PNG, JPG, GIF, MP4, MOV up to 100MB
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
 