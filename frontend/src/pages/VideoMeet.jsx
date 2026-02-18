import React, { useRef, useState } from 'react';

const server_url = "http://localhost:8000";

var connections = {};

const peerConfigConnections = {
    "iceServers": [
        {"urls": "stun:stun.l.google.com:19302"}
    ]
}

export default function VideoMeetComponent() {
    //let connections = useRef({})
    // this is normal way to make connections
    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoRef = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    
    return (
        <div>
            VideoMeetComponent{window.location.href}
        </div>
    );
}