import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopBar from "./TopBar";
import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";


import AudioFile from "../src/assets/sound.wav"
import Select from "./component/select";
import ToggleBtn from "./component/ToggleBtn";
const TranslatorApp = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [mainFile, setMainFile] = useState(null);
  const [sendMessage, setSendMessage] = useState(false);
  const [transcriptionComponentHasMount, setTranscriptionComponentHasMount] = useState(false);
const [wishperResponse, setWhisperResponse] = useState(); 
const [inputMessage, setInputMessage] = useState(); 
const [translationTargetLang, setTranslationTargetLang] = useState("en");
const [translationSourceLang, setTranslationSourcetLang] = useState("en");
const [translatedOutput, setTranslatedOutput] = useState(); 
const [autoTranslate, setAutoTranslate] = useState(false); 

  const mediaRecorder = useRef(null);
  let recordedChunks = useRef([]);
  


  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
          console.log(recordedChunks)
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: 'audio/wav' });
        const newFile = new File([blob], "myaudioFile.wav");
        const url = URL.createObjectURL(blob);
        setMainFile(newFile);
        setAudioURL(url);
      };

      mediaRecorder.current.start();
      setRecording(true);
    } catch (error) {

    }
  }

  function stopRecording() {
    if (mediaRecorder.current && recording) {
      mediaRecorder.current.stop();
      setRecording(false);

    recordedChunks.current=[];
    }
  }


//   transcbribe function
async function TranscribeAudio(){
    const formData = new FormData();
    const model = "whisper-1";
    // const language = "yo";
    const file = AudioFile;
    formData.append("model", model);
    formData.append("file", mainFile);
    // formData.append("language", language);
    const  config  = {
        headers: {
          "Content-Type": `multipart/form-data`,
          "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
        },

      };
      const  response  =  await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, config)
      .then((res)=>{
        console.log(res.data.text);
        setInputMessage(res.data.text)

      });
      
}

async function TranslateTextInput (){
  const encodedParams = new URLSearchParams();
  encodedParams.set('q', inputMessage);
  encodedParams.set('target', translationTargetLang);
  encodedParams.set('source', translationSourceLang);
  
  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': `${import.meta.env.VITE_RAPID_API_KEY}`,
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    data: encodedParams,
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data.data.translations[0].translatedText);
    setTranslatedOutput(response.data.data.translations[0].translatedText);
  } catch (error) {
    console.error(error);
  }
}

useEffect(()=>{
    if(transcriptionComponentHasMount){
      TranscribeAudio();
      // setInputMessage(event.target.value);
    }
    setTranscriptionComponentHasMount(true);
},[mainFile])

useEffect(()=>{
  if(transcriptionComponentHasMount){
    if(inputMessage){
      if(inputMessage.length > 0){
        TranslateTextInput();
        console.log(true)
      }
    }

  }
},[sendMessage])
//handle textarea change
const handleTextAreaChange = (event) =>{
  setInputMessage(event.target.value);
  console.log(event.target.value);
}
useEffect(()=>{
  (autoTranslate && TranslateTextInput)
},[inputMessage])

function WhenSourceLanguageSelected(value){
  setTranslationSourcetLang(value);
// console.log(`source ${translationSourceLang}`)
}
function WhenTargetLanguageSelected(value){
  setTranslationTargetLang(value);
// console.log(`target ${translationTargetLang}`)
}
useEffect(() => {
  console.log(`Source language updated: ${translationSourceLang}`);
}, [translationSourceLang]);

useEffect(() => {
  console.log(`Target language updated: ${translationTargetLang}`);
}, [translationTargetLang]);

console.log(autoTranslate);
function handleAutoTranslate(){

  setAutoTranslate(!autoTranslate);
}
  return (
    <>
      <div className="w-full h-screen">
        <TopBar />
        <div className="p-6 flex flex-col lg:flex-row gap-3">
          <div className="w-full lg:w-1/2 shadow-md p-5">
            <h1 className="text-center m-2 text-violet-600 font-bold">Input message</h1>
            <Select WhenSelected={ (data)=>{WhenSourceLanguageSelected(data)} } value={translationSourceLang} />
            <textarea onChange={(event)=>{
              handleTextAreaChange(event)
              
            }}
            value={inputMessage}
            className="w-full border-violet-500 border-solid border-[2px] p-4 rounded-xl" placeholder="Enter Message" name="" id="" cols="30" rows="8" />
            <div className="flex justify-center">
              <audio controls={true} src={audioURL}>
                {/* <source src={audioURL} type="audio/wav" /> */}
                Your browser does not support the audio element.
              </audio>
              {recording ? (
                <button onClick={stopRecording} className="w-12 h-12 rounded-full bg-red-500 mx-2">
                  <FontAwesomeIcon icon={faStop} color="white" />
                </button>
              ) : (
                <button onClick={startRecording} className="w-12 h-12 rounded-full bg-violet-500 mx-2">
                  <FontAwesomeIcon icon={faMicrophone} color="white" />
                </button>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2 shadow-md p-5">
            <h1 className="text-center m-2 text-violet-600 font-bold">Output message</h1>
            
            <Select WhenSelected={ (data)=>{WhenTargetLanguageSelected(data)} } value={translationTargetLang} />
            {/* Add translation output here */}
            <p>{translatedOutput}</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          {/* Add translation logic and handler */}
          <input type="file" name="main-file" id="" onChange={ async (event)=>{
           await setMainFile(event.target.files[0])
            console.log(mainFile)
          }} />
          <button className="bg-violet-500 text-white p-3 rounded-lg" onClick={() => {setSendMessage(!sendMessage)}}>
            Translate
          </button>
          
          <ToggleBtn handleExtClick={()=>handleAutoTranslate()} status={autoTranslate} />
        </div>
      </div>
    </>
  );
};

export default TranslatorApp;
