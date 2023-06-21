import React, { useEffect } from "react";
import { useSpeechRecognition } from 'react-speech-recognition'
//SpeechRecognition,
// var SupportedBrowser = !SpeechRecognition.browserSupportsSpeechRecognition()

const AudioRecognize = (props) => {
  const { transcript, resetTranscript } = useSpeechRecognition()
  useEffect(() => {
    console.log(transcript,props.recordText)
    if (transcript !== "" && props.recordText !== transcript) {
      props.setRecord(transcript)
    }
  }, [transcript, props]);

  React.useEffect(() => {
    if (props.resetTextState) {
      console.log("reset-->")
      resetTranscript()
      props.updateResetText()
    }
  });
  return props.children
}
export default AudioRecognize;