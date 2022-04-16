import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  flex: 1,
  width: '50vw',
  margin: '5vw auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

export default function FileUpload({ setUploadedFile }) {
  const onDrop = ([uploadedFile]) => {
    if (uploadedFile) {
      const file = new FormData();

      file.append('file', uploadedFile, uploadedFile.name);

      setUploadedFile(file);
    }
    return;
  };

  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: '.pdf', maxFiles: 1, onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <span key={file.path}>
      File {file.name} was not uploaded. Please provide valid PDF file
    </span>
  ));

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(2 files are the maximum number of files you can drop here)</em>
        <em>(Only *.pdf files will be accepted)</em>
      </div>
      <aside>
        {fileRejectionItems.length > 0 && <div>{fileRejectionItems}</div>}
      </aside>
    </div>
  );
}
