import { nanoid } from 'nanoid';

export class WebRTCManager {
  constructor() {
    this.peerConnection = null;
    this.dataChannel = null;
    this.connectionStatus = 'disconnected';
    this.onDataReceived = null;
    this.onConnectionChange = null;
    this.isHost = false;
    this.connectionTimeout = null;
  }

  generateInvitationCode() {
    return nanoid(6).toUpperCase();
  }

  async createConnection(isHost = true) {
    try {
      this.isHost = isHost;
      this.connectionStatus = 'connecting';
      this.onConnectionChange?.('connecting');

      // Create RTCPeerConnection
      this.peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      });

      this.setupEventListeners();

      if (isHost) {
        // Host creates data channel
        this.dataChannel = this.peerConnection.createDataChannel('gameData', {
          ordered: true
        });
        this.setupDataChannel(this.dataChannel);
        
        // Create offer
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        
        // Store offer for guest to pick up
        localStorage.setItem('hostOffer', JSON.stringify(offer));
        console.log('Host created offer:', offer);
      } else {
        // Guest waits for offer
        this.peerConnection.ondatachannel = (event) => {
          console.log('Guest received data channel:', event.channel);
          this.dataChannel = event.channel;
          this.setupDataChannel(this.dataChannel);
        };
      }

      // Set connection timeout
      this.connectionTimeout = setTimeout(() => {
        if (this.connectionStatus === 'connecting') {
          console.log('Connection timeout');
          this.connectionStatus = 'error';
          this.onConnectionChange?.('error');
        }
      }, 30000); // 30 seconds timeout

      return this.peerConnection;
    } catch (error) {
      console.error('Failed to create WebRTC connection:', error);
      this.connectionStatus = 'error';
      this.onConnectionChange?.('error');
      throw error;
    }
  }

  setupEventListeners() {
    if (!this.peerConnection) return;

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        const candidateKey = this.isHost ? 'hostCandidate' : 'guestCandidate';
        localStorage.setItem(candidateKey, JSON.stringify(event.candidate));
        console.log('ICE candidate stored:', candidateKey);
      }
    };

    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection.connectionState;
      console.log('Connection state changed:', state);
      
      if (state === 'connected') {
        if (this.connectionTimeout) {
          clearTimeout(this.connectionTimeout);
          this.connectionTimeout = null;
        }
        this.connectionStatus = 'connected';
        this.onConnectionChange?.('connected');
      } else if (state === 'failed' || state === 'disconnected') {
        if (this.connectionTimeout) {
          clearTimeout(this.connectionTimeout);
          this.connectionTimeout = null;
        }
        this.connectionStatus = 'error';
        this.onConnectionChange?.('error');
      }
    };

    this.peerConnection.oniceconnectionstatechange = () => {
      const state = this.peerConnection.iceConnectionState;
      console.log('ICE connection state:', state);
    };
  }

  setupDataChannel(channel) {
    channel.onopen = () => {
      console.log('Data channel opened');
      if (this.connectionTimeout) {
        clearTimeout(this.connectionTimeout);
        this.connectionTimeout = null;
      }
      this.connectionStatus = 'connected';
      this.onConnectionChange?.('connected');
    };

    channel.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('Received message:', message);
        this.onDataReceived?.(message);
      } catch (error) {
        console.error('Failed to parse received data:', error);
      }
    };

    channel.onerror = (error) => {
      console.error('Data channel error:', error);
      this.connectionStatus = 'error';
      this.onConnectionChange?.('error');
    };

    channel.onclose = () => {
      console.log('Data channel closed');
      this.connectionStatus = 'disconnected';
      this.onConnectionChange?.('disconnected');
    };
  }

  async connectWithOffer(offer) {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }
    
    try {
      console.log('Guest connecting with offer:', offer);
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      
      // Create answer
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      
      // Store answer for host to pick up
      localStorage.setItem('guestAnswer', JSON.stringify(answer));
      console.log('Guest created answer:', answer);
    } catch (error) {
      console.error('Failed to connect with offer:', error);
      throw error;
    }
  }

  async connectWithAnswer(answer) {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }
    
    try {
      console.log('Host connecting with answer:', answer);
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error('Failed to connect with answer:', error);
      throw error;
    }
  }

  async addIceCandidate(candidate) {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }
    
    try {
      console.log('Adding ICE candidate:', candidate);
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('Failed to add ICE candidate:', error);
    }
  }

  sendData(data) {
    if (this.dataChannel && this.dataChannel.readyState === 'open') {
      try {
        console.log('Sending data:', data);
        this.dataChannel.send(JSON.stringify(data));
      } catch (error) {
        console.error('Failed to send data:', error);
      }
    } else {
      console.log('Data channel not ready, state:', this.dataChannel?.readyState);
    }
  }

  disconnect() {
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }

    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }
    
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    
    this.connectionStatus = 'disconnected';
    this.onConnectionChange?.('disconnected');
    
    // Clean up localStorage
    try {
      localStorage.removeItem('hostOffer');
      localStorage.removeItem('guestAnswer');
      localStorage.removeItem('hostCandidate');
      localStorage.removeItem('guestCandidate');
    } catch (error) {
      console.error('Failed to clean up localStorage:', error);
    }
  }

  getConnectionStatus() {
    return this.connectionStatus;
  }
}

export const getInvitationCodeFromURL = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
  } catch (error) {
    console.error('Failed to get invitation code from URL:', error);
    return null;
  }
};

export const createInvitationURL = (code) => {
  try {
    const currentURL = new URL(window.location.href);
    currentURL.searchParams.set('code', code);
    return currentURL.toString();
  } catch (error) {
    console.error('Failed to create invitation URL:', error);
    return window.location.href;
  }
};

export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}; 