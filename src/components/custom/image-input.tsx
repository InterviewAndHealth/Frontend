import React, { Dispatch, SetStateAction, useState } from "react";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";

const DocumentInput: React.FC<{
  text: string;
  id: string;
  logo: JSX.Element;
  setFile: Dispatch<SetStateAction<File | null>>;
}> = ({ text, logo, id, setFile }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  const renderIcon = () => {
    if (fileName?.endsWith(".pdf")) {
      return <FaFilePdf className="text-red-500 text-4xl" />;
    }
    if (fileName?.endsWith(".doc") || fileName?.endsWith(".docx")) {
      return <FaFileWord className="text-blue-500 text-4xl" />;
    }
    return <MdOutlineUploadFile className="text-main-300 text-5xl" />;
  };

  return (
    <div className="flex flex-col items-center px-1 lg:px-6 border-main-300 border-2 rounded-xl w-60 h-52 md:h-48 lg:h-full">
      <label htmlFor={id} className="mb-2 pt-1 lg:pt-4 cursor-pointer ">
        <div className="flex justify-center text-main-300 text-xs md:text-base px-4 md:px-0">
          {logo}
          <span className="w-3/4 lg:w-full">{text}</span>
        </div>
        <div className="flex flex-col items-center p-4 pt-2">
          <div className="flex items-center flex-col justify-center mb-4 h-36 border-2 border-main-300 border-dashed rounded-xl bg-white ">
            {renderIcon()}
            <span className="text-main-300 text-xs text-center mt-2">
              click to open your files or drag and drop your file
            </span>
          </div>

          <input
            id={id}
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </label>
    </div>
  );
};

export default DocumentInput;
