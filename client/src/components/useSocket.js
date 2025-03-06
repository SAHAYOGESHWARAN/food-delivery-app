import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

const useSocket = (event, callback) => {
    useEffect(() => {
        socket.on(event, callback);

        return () => {
            socket.off(event, callback);
        };
    }, [event, callback]);
};

export default useSocket;