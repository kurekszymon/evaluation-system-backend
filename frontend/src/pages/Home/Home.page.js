import styles from "./Home.module.css";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import SendIcon from "@mui/icons-material/Send";

import FileUpload from "../../components/FileUpload";
import Loader from "../../components/Loader";

import { useHistory } from "react-router-dom";
import axios from "axios";

import {
  uploadFile,
  processPublication,
  uploadFileHeaders,
} from "../../endpoints";

const sendFileToServer = async (file) => {
  const {
    data: { data, message },
  } = await axios.post(uploadFile, file, uploadFileHeaders);

  console.log(message);
  return data;
};

const processFile = async (file_path) => {
  const {
    data: { data, message },
  } = await axios.post(processPublication, { file_path });

  console.log(message);
  return data;
};

export default function Home() {
  let history = useHistory();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  return (
    <>
      {isProcessing && <Loader />}
      <div
        className="home"
        style={{
          opacity: isProcessing ? "0.2" : "1",
          pointerEvents: isProcessing && "none",
        }}
      >
        <header className={styles.header}>
          <div className={styles.logo} />
          <span className={styles.name}>Evaluation System</span>
        </header>
        <div className={styles.content}>
          <FileUpload setUploadedFile={setUploadedFile} />
        </div>
        {uploadedFile && <span> File was successfully uploaded </span>}
        <Tooltip
          title={!!!uploadedFile ? "You have to upload a file first" : ""}
        >
          <div>
            <Button
              color="info"
              variant="contained"
              endIcon={<SendIcon />}
              disabled={!!!uploadedFile}
              onClick={async () => {
                setIsProcessing(true);
                const { file_name, file_path } = await sendFileToServer(
                  uploadedFile
                );

                const { references } = await processFile(file_path);

                setIsProcessing(false);
                history.push({
                  pathname: `${file_name}/overview`,
                  state: { references, file_name },
                });
              }}
            >
              Process file
            </Button>
          </div>
        </Tooltip>
      </div>
    </>
  );
}
