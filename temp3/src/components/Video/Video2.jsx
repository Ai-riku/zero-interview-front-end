import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const Video = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const socket = useRef();
  const [localStream, setLocalStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    socket.current = io();

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setLocalStream(stream);
        localVideoRef.current.srcObject = stream;

        socket.current.emit('offer', { to: 'receiver' });

        socket.current.on('offer', data => {
          const pc = new RTCPeerConnection();
          stream.getTracks().forEach(track => pc.addTrack(track, stream));

          pc.ontrack = event => {
            remoteVideoRef.current.srcObject = event.streams[0];
          };

          pc.onicecandidate = event => {
            if (event.candidate) {
              socket.current.emit('icecandidate', { to: data.from, candidate: event.candidate });
            }
          };

          pc.setRemoteDescription(data.offer)
            .then(() => pc.createAnswer())
            .then(answer => pc.setLocalDescription(answer))
            .then(() => {
              socket.current.emit('answer', { to: data.from, answer: pc.localDescription });
            });

          setPeerConnection(pc);
        });

        socket.current.on('answer', data => {
          peerConnection.setRemoteDescription(data.answer);
        });

        socket.current.on('icecandidate', data => {
          peerConnection.addIceCandidate(data.candidate);
        });
      })
      .catch(error => console.error('getUserMedia 오류 : ', error));

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peerConnection) {
        peerConnection.close();
      }
      socket.current.disconnect();
    };
  }, []);

  return (
    // <>
    //   <video ref={localVideoRef} id="localVideo" autoPlay muted></video>
    //   <video ref={remoteVideoRef} id="remoteVideo" autoPlay></video>
    // </>
	<div>
      <video ref={localVideoRef} autoPlay muted />
    </div>
  );
};

export default Video;
