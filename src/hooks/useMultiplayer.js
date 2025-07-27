import { useState, useEffect, useCallback, useRef } from 'react';
import { WebRTCManager, getInvitationCodeFromURL, createInvitationURL, copyToClipboard } from '../utils/webrtc';

export const useMultiplayer = (onGameStateUpdate) => {
  const [gameMode, setGameMode] = useState('local');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [invitationCode, setInvitationCode] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState('');
  
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
      
      // Start polling for guest connection
      signalCheckIntervalRef.current = setInterval(async () => {
        try {
          // Check for guest answer
          const guestAnswer = localStorage.getItem(`guestAnswer_${code}`);
          if (guestAnswer && webrtcRef.current) {
            console.log('Host found guest answer');
            const answer = JSON.parse(guestAnswer);
            await webrtcRef.current.connectWithAnswer(answer);
            localStorage.removeItem(`guestAnswer_${code}`);
          }

          // Check for guest ICE candidates
          const guestCandidate = localStorage.getItem(`guestCandidate_${code}`);
          if (guestCandidate && webrtcRef.current) {
            console.log('Host found guest ICE candidate');
            const candidate = JSON.parse(guestCandidate);
            await webrtcRef.current.addIceCandidate(candidate);
            localStorage.removeItem(`guestCandidate_${code}`);
          }
        } catch (error) {
          console.error('Error processing guest signals:', error);
        }
      }, 1000);

    } catch (error) {
      console.error('Failed to create game:', error);
      setError('Failed to create game: ' + error.message);
      setConnectionStatus('error');
    }
  }, [handleConnectionChange, handleDataReceived]);

  const joinGame = useCallback(async (code) => {
    try {
      setError('');
      setGameMode('guest');
      setIsHost(false);
      setConnectionStatus('connecting');
      setInvitationCode(code);

      webrtcRef.current = new WebRTCManager();
      webrtcRef.current.onConnectionChange = handleConnectionChange;
      webrtcRef.current.onDataReceived = handleDataReceived;

      await webrtcRef.current.createConnection(false, code);

      // Start polling for host connection
      signalCheckIntervalRef.current = setInterval(async () => {
        try {
          // Check for host offer
          const hostOffer = localStorage.getItem(`hostOffer_${code}`);
          if (hostOffer && webrtcRef.current) {
            console.log('Guest found host offer');
            const offer = JSON.parse(hostOffer);
            await webrtcRef.current.connectWithOffer(offer);
            localStorage.removeItem(`hostOffer_${code}`);
          }

          // Check for host ICE candidates
          const hostCandidate = localStorage.getItem(`hostCandidate_${code}`);
          if (hostCandidate && webrtcRef.current) {
            console.log('Guest found host ICE candidate');
            const candidate = JSON.parse(hostCandidate);
            await webrtcRef.current.addIceCandidate(candidate);
            localStorage.removeItem(`hostCandidate_${code}`);
          }
        } catch (error) {
          console.error('Error processing host signals:', error);
        }
      }, 1000);

    } catch (error) {
      console.error('Failed to join game:', error);
      setError('Failed to join game: ' + error.message);
      setConnectionStatus('error');
    }
  }, [handleConnectionChange, handleDataReceived]);

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

  const copyInvitationLink = useCallback(async () => {
    if (invitationCode) {
      const invitationURL = createInvitationURL(invitationCode);
      await copyToClipboard(invitationURL);
    }
  }, [invitationCode]);

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
    createGame,
    joinGame,
    sendGameState,
    disconnect,
    copyInvitationLink
  };
}; 