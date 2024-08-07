import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopBar from "./TopBar";
import { faMicrophone, faPause, faPlay, faStop, faVolumeHigh, faVolumeTimes, faSpinner, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { AssemblyAI } from 'assemblyai';
import axios from "axios";


import AudioFile from "../src/assets/sound.wav"
import Select from "./component/select";
import ToggleBtn from "./component/ToggleBtn";
import { faSpeakap } from "@fortawesome/free-brands-svg-icons";
import RoundedBtn from "./component/roundedBtn";


const TranslatorApp = () => {
const [recording, setRecording] = useState(false);
const [audioURL, setAudioURL] = useState("");
const [mainFile, setMainFile] = useState(null);
const [sendMessage, setSendMessage] = useState(false);
const [transcriptionComponentHasMount, setTranscriptionComponentHasMount] = useState(false);
const [wishperResponse, setWhisperResponse] = useState(); 
const [loading, setLoading] = useState(false); 
const [transcribing, setTranscribing] = useState(false); 
const [inputMessage, setInputMessage] = useState(); 
const [translationTargetLang, setTranslationTargetLang] = useState("en");
const [translationSourceLang, setTranslationSourcetLang] = useState("en");
const [translatedOutput, setTranslatedOutput] = useState(); 
const [autoTranslate, setAutoTranslate] = useState(false); 
const [outputSpeechStatus, setOutputSpeechStatus] = useState("stopped"); 
const [availableVoices, setAvailableVoices] = useState([]);
const [accentVoice, setAccentVoice] = useState(() =>( localStorage.getItem('accent') || 0));

  const mediaRecorder = useRef(null);
  let recordedChunks = useRef([]);
  const translationOutputElement = useRef();
  


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

        const reader = new FileReader();
        reader.onload = function() {
          const arrayBuffer = this.result;
          // You can now process the binary data, send it to a server, etc.
          console.log(arrayBuffer);
        };
        reader.readAsArrayBuffer(blob);
        
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

async function TranscribeViaAssemblyAI (){
  
  const baseUrl = 'https://api.assemblyai.com/v2'

  const headers = {
    authorization: '6bf160df80894c029d0f545a2323d3c0'
  }
  const uploadResponse = await axios.post(`${baseUrl}/upload`, mainFile, {
    headers
  });
 const uploadUrl = uploadResponse.data.upload_url
 // const uploadUrl = "https://github.com/AssemblyAI-Community/audio-examples/raw/main/20230607_me_canadian_wildfires.mp3"
 
 
 const data = {
    audio_url: uploadUrl // You can also use a URL to an audio or video file on the web
  }
  
  const client = new AssemblyAI({
    apiKey: '6bf160df80894c029d0f545a2323d3c0',
  });
  const transcript = await client.transcripts.transcribe(data);
  if(transcript){
    setTranscribing(false);
  } 
  setInputMessage(transcript.text);
  console.log(transcript.text);

  
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
    if (response) {
      setLoading(false);
    }
    console.log(response.data.data.translations[0].translatedText);
    setTranslatedOutput(response.data.data.translations[0].translatedText);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
}

useEffect(()=>{
    if(transcriptionComponentHasMount){
      // TranscribeAudio();
      TranscribeViaAssemblyAI();
      setTranscribing(true);
      // setInputMessage(event.target.value);
    }
    setTranscriptionComponentHasMount(true);
   // console.log("here is the audio link: ", audioURL.replace("blob:", "").trim())
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
  // (autoTranslate && TranslateTextInput)
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
  // console.log(`Source language updated: ${translationSourceLang}`);
}, [translationSourceLang]);

useEffect(() => {
  // console.log(`Target language updated: ${translationTargetLang}`);
}, [translationTargetLang]);

// console.log(autoTranslate);
function handleAutoTranslate(){

  setAutoTranslate(!autoTranslate);
}

const startSpeech = () =>{
  
  if (!('speechSynthesis' in window)) {
    console.log("not supported");
    // Browser does not support Speech Synthesis
  
  } else {
    const utterance = new SpeechSynthesisUtterance(translationOutputElement.current.value);
    utterance.voice = window.speechSynthesis.getVoices()[accentVoice];
    speechSynthesis.speak(utterance);
    utterance.onstart = function(event) {
      setOutputSpeechStatus("started");
    };
    
    utterance.onend = function(event) {
      setOutputSpeechStatus("stopped");
    };
    
    utterance.onerror = function(event) {
      setOutputSpeechStatus("stopped");
    };
    
    utterance.onpause = function(event) {
      
    };
    
    utterance.onresume = function(event) {
     
    };
    // console.log(utterance);
  }
}
const pauseSpeech = () =>{
    // console.log(outputSpeechStatus);
    speechSynthesis.pause();
    setOutputSpeechStatus("paused");
}
const resumeSpeech = () =>{
    // console.log(outputSpeechStatus);
    speechSynthesis.resume();
    setOutputSpeechStatus("resumed");
}
const stopSpeech = () =>{
    // console.log(outputSpeechStatus);
    speechSynthesis.cancel();
    setOutputSpeechStatus("stopped");
}

useEffect(()=>{
  const getVoices = () => {
  // console.log(window.speechSynthesis.getVoices()[0])
  };
getVoices();
},[])

const chooseVoice = (event) => {
  localStorage.setItem('accent', (event.target.value));
  setAccentVoice(event.target.value);
  // console.log(event.target.value);
}
// useEffect(()=>{
// console.log(localStorage.getItem("accent"))
// },[accentVoice])

 const uploadFile = (event) =>{
    setMainFile(event.target.files[0]);
    
   
}
  return (
    <>
      <div className="w-full h-screen dark:bg-slate-900">
        <TopBar />
        <div className="p-6 flex flex-col lg:flex-row gap-3">
          <div className="w-full lg:w-1/2 dark:bg-slate-800 rounded-2xl  shadow-md p-5">
            <h1 className="text-center text-2xl m-2 text-violet-600 font-bold">Input message</h1>
            <Select WhenSelected={ (data)=>{WhenSourceLanguageSelected(data)} } value={translationSourceLang} />
            <div className="relative">
              {
                transcribing && (
                  <div className="w-full h-full bg-[#111111ca] absolute flex justify-center items-center flex-col gap-10">
                    <FontAwesomeIcon icon={faSpinner} className="text-[30px] rotate-90 animate-spin ease-in-out" />
                    <h1 className="font-bold text-2xl">Transcription in Progress</h1>
                  </div>
                )
              }
              <textarea onChange={(event)=>{
                handleTextAreaChange(event)
                
              }}
              value={inputMessage}
              className="w-full border-violet-500 border-solid border-[4px] p-4 rounded-xl" placeholder="Enter Message" name="" id="" cols="30" rows="8" />
            </div>
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
          <div className="w-full lg:w-1/2 dark:bg-slate-800 rounded-2xl shadow-md p-5">
            <h1 className="text-center text-2xl m-2 text-violet-600 font-bold">Output message</h1>
            
            <div className="flex  flex-col lg:flex-row justify-between">
              <Select WhenSelected={ (data)=>{WhenTargetLanguageSelected(data)} } value={translationTargetLang} />
              <select
              onChange={(event)=>{chooseVoice(event)}}
              value={accentVoice}
              className="flex-1 lg:w-[200px] p-2 my-2">
                <option  value="">Accents</option>
                {window.speechSynthesis.getVoices().map((voice, index)=>{
                  return(<option value={index} key={index}>{ `${index+1}.  ${voice.name}`}</option>);
                })}
              </select>
            </div>
            {/* Add translation output here */}
            <textarea 
            ref={translationOutputElement}
            value={translatedOutput}
            className="w-full border-violet-500 border-solid border-[4px] p-4 rounded-xl" placeholder="Translated output" readOnly={false} name="" id="" cols="30" rows="8" />
            <div className="flex justify-center items-center">
            <div className="flex">
              {
                outputSpeechStatus === "stopped" ?
                <RoundedBtn clickedEvent={startSpeech} color={"bg-green-500"}>
                  <FontAwesomeIcon className="dark:text-slate-800 text-white" icon={faVolumeHigh} />
                </RoundedBtn>
      
                
              :
              <div className="flex gap-2">
              {
                //outputSpeechStatus === "started" || outputSpeechStatus === "paused" &&
              <RoundedBtn clickedEvent={resumeSpeech} color={"bg-violet-500"}>
                <FontAwesomeIcon className="dark:text-slate-800 text-white" icon={faPlay} />
              </RoundedBtn>
              }
              {
               // outputSpeechStatus === "started" || outputSpeechStatus === "resumed" &&
              <RoundedBtn clickedEvent={pauseSpeech} color={"bg-blue-500"}>
                <FontAwesomeIcon className="dark:text-slate-800 text-white" icon={faPause} />
              </RoundedBtn>
              }
              <RoundedBtn clickedEvent={stopSpeech} color={"bg-red-500"}>
                <FontAwesomeIcon className="dark:text-slate-800 text-white" icon={faStop} />
              </RoundedBtn>
              </div>
            }

            </div>
            </div>
            
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:justify-evenly">
          {/* Add translation logic and handler */}
          <input type="file" name="main-file" id="" onChange={uploadFile} />
          <button className="bg-violet-500 flex gap-4 text-white p-3 rounded-lg" onClick={() => {setSendMessage(!sendMessage); setLoading(true);}}>
            Translate
            <span className="w-6 h-6  rounded-full block">
              {
              loading ? 
               <FontAwesomeIcon icon={faSpinner}  className="text-[20px] rotate-90 animate-spin ease-in-out" />
               :
               <FontAwesomeIcon icon={faLanguage}  className="text-[20px] " />
              
              }
            </span>
          </button>
          
          <ToggleBtn handleExtClick={()=>handleAutoTranslate()} status={autoTranslate} />
        </div>
        
      </div>
    </>
  );
};

export default TranslatorApp;
