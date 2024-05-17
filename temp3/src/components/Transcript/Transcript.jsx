import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Transcript() {
    const [receivedTranscript, setReceivedTranscript] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socket.on('transcript', (transcript) => {
            console.log('Received message from server:', transcript);
            setReceivedTranscript(transcript);
        });

        // Clean up the effect when the component unmounts
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('transcript');
        };
    }, []);

    const sendMessage = () => {
        socket.send('Transcript requested');
    };

    return (
    <div>
        {/* <button onClick={sendMessage}>Show Transcript</button> */}
        <p>Transcript: {receivedTranscript}</p>
    </div>
    );
}

export default Transcript;