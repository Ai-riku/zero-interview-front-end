import React, { useRef, useState} from 'react';

import './Video.css'
import InterviewBtn from "../Interview/InterviewBtn.jsx";
import Transcript from '../Transcript/Transcript.jsx';

function Video() {
	const videoRef = useRef(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
	const [isStreaming, setIsStreaming] = useState(false);
	const [isRecording, setIsRecording] = useState(false);

    const handleStream = async (active) => {
        if (active) {
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
                setIsRecording(false); // Ensure recording state is updated
            }
            if (videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
            setIsStreaming(false);
            console.log('Camera and recorder stopped');
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setupRecorder(stream);
                setIsStreaming(true);
                console.log('Camera started');
            } catch (error) {
                console.error("Error accessing the camera: ", error);
            }
        }
    };

    const setupRecorder = (stream) => {
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = handleDataAvailable;
		recorder.onstop = () => setIsRecording(false);
        recorder.onstart = () => setIsRecording(true);
        setMediaRecorder(recorder);
    };

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            setRecordedChunks((prev) => [...prev, event.data]);
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            mediaRecorder.stop();
            console.log('Recording stopped');
        } else {
            mediaRecorder.start();
            console.log('Recording started');
        }
    };

	const saveRecording = async () => {
		const blob = new Blob(recordedChunks, { type: 'video/webm' });
		let formData = new FormData();
		formData.append("file", blob, "recording.webm");
	
		try {
			const response = await fetch('http://localhost:5000/upload', {
				method: 'POST',
				body: formData,
			});
			if (response.ok) {
				const responseBody = await response.json();
				console.log('Video uploaded successfully:', responseBody);
				setRecordedChunks([]);
			} else {
				throw new Error('Failed to upload video');
			}
		} catch (error) {
			console.error('Error uploading video:', error);
		}
	};

	return (
	<div>
		<video ref={videoRef} autoPlay muted></video>
		<section id="menubtn">
			<InterviewBtn onSelect={() => handleStream(isStreaming)}> {isStreaming ? 'Stop Camera' : 'Start Camera'}</InterviewBtn>
			{isStreaming && (<InterviewBtn onSelect={toggleRecording} disabled={!isStreaming}> {isRecording ? 'Stop Recording' : 'Start Recording'} </InterviewBtn>)}
			{recordedChunks.length > 0 && (<InterviewBtn onSelect={saveRecording}>Save Recording</InterviewBtn>)}
			<Transcript />
		</section>
	</div>);
}

export default Video;