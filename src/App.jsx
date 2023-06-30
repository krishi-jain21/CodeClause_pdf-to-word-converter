import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { pdf_to_doc } from './api'
import Loader from './components/loader'

function App() {
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState('')
  const handleFileChanges=(e) =>{
    const file = e.target.files[0];
    setFilename(file.name);
  }

  const handleConvert=async() =>{
    setLoading(true);
    const file = document.getElementById("myfile").files[0];
    const response = await pdf_to_doc(file);
    let base64 =response.file;
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename.replace(".pdf", "_converted.docx");
    link.click();
    setLoading(false);
  }




  return (
    <>
     {
      loading && <Loader/>
     }
           <div>
        <h1>
          Pdf to Word Converter
        </h1>
        <h3>Welcome to pdf to word converter.</h3>
        
        <ul>Steps
          <li>Upload the pdf</li>
          <li>Click on convert button</li>
          <li>Download the word document</li>

          
        </ul>

        <input type="file" id="myfile" name="myfile" accept='.pdf' onChange={handleFileChanges}></input>
        <button onClick={handleConvert}>Convert to word</button>
      </div>
    
    </>
  )
}

export default App
