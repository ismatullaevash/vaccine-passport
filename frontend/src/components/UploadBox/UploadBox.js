import React, { useCallback, useState, useEffect } from "react";
import {useDropzone} from 'react-dropzone'
import {Image} from 'react-bootstrap';
import UploadIcon from './uploadIcon.svg';
import SubmitButton from "../SubmitButton";
import Copy from "./copy.png";

function UploadBox() {
  const uploadBoxStyling = {
    width: '850px',
    height: '300px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5rem',
    display: 'block',
    background: '#F8F8F8',
    border: '1px dashed #000000',
    boxSizing: 'border-box',
  }

  const imageStyling = {
    width: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    marginTop: '2rem'
  }

  const textStyling = {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: '5rem'
  }

  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const thumbs = files.map(file => (
    <div key={file.name} style={{marginTop: '8rem', fontSize: '32px'}}>
      <img
        src={Copy}
        alt="uploaded"
        style={{width: '20px'}}
      />
      {' '}{file.name}
    </div>
  ));

  // clean up
  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const hoverDrag = () => {
    return (
      isDragActive ?
        <div>
          <Image src={UploadIcon} style={imageStyling} />
          <h2 style={textStyling}>Drop the files here!</h2>
        </ div> :
        <div id="text">
          <Image src={UploadIcon} style={imageStyling} />
          <h2 style={textStyling}>Upload your proof of vaccination</h2>
        </ div> 
    )
  }
console.log(files.length)
  return (
    <>
      <div style={uploadBoxStyling} {...getRootProps()}>
        <input {...getInputProps()} />
        { files.length === 0 ? 
           hoverDrag() :
            <div style={textStyling}>
              {thumbs}
            </div>
        }
      </div>
      
      <SubmitButton uploadedReceipt={files.length > 0 ? true : false} fileName={thumbs[0] ? thumbs[0].name : ''}/>

       <p style={textStyling}>
        <a href="https://covid19.ontariohealth.ca/">get digital proof of vaccination</a>
      </p>
    </>
  )
}

export default UploadBox;
