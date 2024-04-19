import React, { useEffect, useRef } from 'react';
import Peer from 'peerjs';
import io from 'socket.io-client';

const Webrtc = ({ roomId }) => {
  const socket = io('/');
  const videoGridRef = useRef(null);
  const myPeerRef = useRef(null);
  const myVideoRef = useRef(null);
  const peersRef = useRef({});

  useEffect(() => {
    const myPeer = new Peer(undefined, {
      host: '/',
      port: '3001'
    });
    myPeerRef.current = myPeer;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        addVideoStream(myVideoRef.current, stream);

        myPeer.on('call', call => {
          call.answer(stream);
          const video = document.createElement('video');
          call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
          });
        });

        socket.on('user-connected', userId => {
          connectToNewUser(userId, stream);
        });
      });

    socket.on('user-disconnected', userId => {
      if (peersRef.current[userId]) peersRef.current[userId].close();
    });

    myPeer.on('open', id => {
      socket.emit('join-room', roomId, id);
    });

    return () => {
      socket.disconnect();
      myPeer.destroy();
    };
  }, [roomId]);

  function connectToNewUser(userId, stream) {
    const call = myPeerRef.current.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });
    call.on('close', () => {
      video.remove();
    });

    peersRef.current[userId] = call;
  }

  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    videoGridRef.current.append(video);
  }

  return (
    <div id="video-grid" ref={videoGridRef}></div>
  );
};

export default Webrtc;