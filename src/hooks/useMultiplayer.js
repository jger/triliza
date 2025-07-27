import { useState, useEffect, useCallback, useRef } from 'react';
import { WebRTCManager, getInvitationCodeFromURL, copyToClipboard } from '../utils/webrtc';

export const useMultiplayer = (onGameStateUpdate) => {
  const [gameMode, setGameMode] = useState('local');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [invitationCode, setInvitationCode] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState('');
  const [connectionData, setConnectionData] = useState('');
  const [waitingForAnswer, setWaitingForAnswer] = useState(false);
  
  const webrtcRef = useRef(null);
  const signalCheckIntervalRef = useRef(null);

  const handleConnectionChange = useCallback((status) => {
    console.log('Connection status changed:', status);
    setConnectionStatus(status);
    if (status === 'error') {
      setError('Connection failed. Please try again.');
    } else if (status === 'connected') {
      setError(''); // Clear any previous errors
    }
  }, []);

  const handleDataReceived = useCallback((data) => {
    console.log('WebRTC data received:', data);
    if (data.type === 'gameState') {
      // Update the game state when receiving from other player
      console.log('Updating game state from remote player:', data.payload);
      onGameStateUpdate?.(data.payload);
    }
  }, [onGameStateUpdate]);

  const createGame = useCallback(async () => {
    try {
      setError('');
      setGameMode('host');
      setIsHost(true);
      setConnectionStatus('connecting');

      webrtcRef.current = new WebRTCManager();
      webrtcRef.current.onConnectionChange = handleConnectionChange;
      webrtcRef.current.onDataReceived = handleDataReceived;

      const code = webrtcRef.current.generateInvitationCode();
      setInvitationCode(code);

      await webrtcRef.current.createConnection(true, code);
      
      // Wait for ICE gathering to complete, then generate connection string
      const waitForIceGathering = () => {
        const checkInterval = setInterval(() => {
          if (webrtcRef.current.iceGatheringComplete || webrtcRef.current.iceCandidates.length > 0) {
            clearInterval(checkInterval);
            const connectionString = webrtcRef.current.getConnectionString();
            setConnectionData(connectionString);
            setWaitingForAnswer(true);
            console.log('Host connection data ready');
          }
        }, 100);
        
        // Fallback after 5 seconds
        setTimeout(() => {
          clearInterval(checkInterval);
          if (!connectionData) {
            const connectionString = webrtcRef.current.getConnectionString();
            setConnectionData(connectionString);
            setWaitingForAnswer(true);
            console.log('Host connection data ready (fallback)');
          }
        }, 5000);
      };
      
      waitForIceGathering();

    } catch (error) {
      console.error('Failed to create game:', error);
      setError('Failed to create game: ' + error.message);
      setConnectionStatus('error');
    }
  }, [handleConnectionChange, handleDataReceived, connectionData]);

  const joinGame = useCallback(async (hostConnectionString) => {
    try {
      setError('');
      setGameMode('guest');
      setIsHost(false);
      setConnectionStatus('connecting');

      webrtcRef.current = new WebRTCManager();
      webrtcRef.current.onConnectionChange = handleConnectionChange;
      webrtcRef.current.onDataReceived = handleDataReceived;

      await webrtcRef.current.createConnection(false);
      
      // Handle host's connection data
      await webrtcRef.current.handleConnectionString(hostConnectionString);
      
      // Wait for ICE gathering to complete, then generate answer
      const waitForIceGathering = () => {
        const checkInterval = setInterval(() => {
          if (webrtcRef.current.iceGatheringComplete || webrtcRef.current.iceCandidates.length > 0) {
            clearInterval(checkInterval);
            const connectionString = webrtcRef.current.getConnectionString();
            setConnectionData(connectionString);
            console.log('Guest answer ready');
          }
        }, 100);
        
        // Fallback after 5 seconds
        setTimeout(() => {
          clearInterval(checkInterval);
          if (!connectionData) {
            const connectionString = webrtcRef.current.getConnectionString();
            setConnectionData(connectionString);
            console.log('Guest answer ready (fallback)');
          }
        }, 5000);
      };
      
      waitForIceGathering();

    } catch (error) {
      console.error('Failed to join game:', error);
      setError('Failed to join game: ' + error.message);
      setConnectionStatus('error');
    }
  }, [handleConnectionChange, handleDataReceived, connectionData]);

  const sendGameState = useCallback((gameState) => {
    console.log('Attempting to send game state:', gameState, 'Connection status:', connectionStatus);
    if (webrtcRef.current && connectionStatus === 'connected') {
      console.log('Sending game state via WebRTC:', gameState);
      webrtcRef.current.sendData({
        type: 'gameState',
        payload: gameState
      });
    } else {
      console.log('Cannot send game state - not connected');
    }
  }, [connectionStatus]);

  const disconnect = useCallback(() => {
    console.log('Disconnecting...');
    if (signalCheckIntervalRef.current) {
      clearInterval(signalCheckIntervalRef.current);
      signalCheckIntervalRef.current = null;
    }
    
    if (webrtcRef.current) {
      webrtcRef.current.disconnect();
      webrtcRef.current = null;
    }

    setGameMode('local');
    setConnectionStatus('disconnected');
    setInvitationCode('');
    setIsHost(false);
    setError('');
  }, []);

  const handleAnswer = useCallback(async (answerString) => {
    try {
      if (webrtcRef.current && isHost) {
        await webrtcRef.current.handleConnectionString(answerString);
        setWaitingForAnswer(false);
        console.log('Host processed guest answer');
      }
    } catch (error) {
      console.error('Failed to handle answer:', error);
      setError('Failed to process connection data: ' + error.message);
    }
  }, [isHost]);

  const copyConnectionData = useCallback(async () => {
    if (connectionData) {
      await copyToClipboard(connectionData);
    }
  }, [connectionData]);

  // Check for invitation code in URL on mount
  useEffect(() => {
    const urlCode = getInvitationCodeFromURL();
    if (urlCode) {
      console.log('Found invitation code in URL:', urlCode);
      joinGame(urlCode);
    }
  }, [joinGame]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (signalCheckIntervalRef.current) {
        clearInterval(signalCheckIntervalRef.current);
      }
      if (webrtcRef.current) {
        webrtcRef.current.disconnect();
      }
    };
  }, []);

  return {
    gameMode,
    connectionStatus,
    invitationCode,
    isHost,
    error,
    connectionData,
    waitingForAnswer,
    createGame,
    joinGame,
    sendGameState,
    disconnect,
    handleAnswer,
    copyConnectionData
  };
}; 