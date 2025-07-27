import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native-web';

const MultiplayerControls = ({ 
  gameMode, 
  connectionStatus, 
  invitationCode, 
  error, 
  onCreateGame, 
  onJoinGame, 
  onDisconnect, 
  onCopyLink,
  showMultiplayer,
  onToggleMultiplayer
}) => {
  const [joinCode, setJoinCode] = useState('');

  const handleJoinGame = () => {
    if (joinCode.trim()) {
      onJoinGame(joinCode.trim().toUpperCase());
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return '#4CAF50';
      case 'connecting': return '#FF9800';
      case 'error': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting...';
      case 'error': return 'Connection Error';
      default: return 'Disconnected';
    }
  };

  if (gameMode === 'local' && !showMultiplayer) {
    return (
      <View style={styles.betaContainer}>
        <TouchableOpacity style={styles.betaLink} onPress={onToggleMultiplayer}>
          <Text style={styles.betaLinkText}>🚀 Try Online Multiplayer (BETA)</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (gameMode === 'local' && showMultiplayer) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Play Online (BETA)</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onToggleMultiplayer}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.betaWarning}>⚠️ Beta feature - may have connection issues</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onCreateGame}>
            <Text style={styles.buttonText}>Create Game</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>or</Text>
          <View style={styles.joinContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter invitation code"
              value={joinCode}
              onChangeText={setJoinCode}
              maxLength={6}
              autoCapitalize="characters"
            />
            <TouchableOpacity 
              style={[styles.button, styles.joinButton]} 
              onPress={handleJoinGame}
              disabled={!joinCode.trim()}
            >
              <Text style={styles.buttonText}>Join Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.activeHeader}>
        <Text style={styles.title}>
          {gameMode === 'host' ? 'Hosting Game' : 'Joining Game'}
        </Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>
      </View>

      {gameMode === 'host' && invitationCode && (
        <View style={styles.invitationContainer}>
          <Text style={styles.invitationLabel}>Invitation Code:</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{invitationCode}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={onCopyLink}>
              <Text style={styles.copyButtonText}>Copy Link</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.instructionText}>
            Share this link with your friend to start playing
          </Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.disconnectButton} onPress={onDisconnect}>
        <Text style={styles.disconnectButtonText}>Back to Local Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  betaContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  betaLink: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    borderRadius: 6,
  },
  betaLinkText: {
    color: '#2196F3',
    fontSize: 14,
    textDecorationLine: 'underline',
    cursor: 'pointer',
  },
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 20,
    minWidth: 300,
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  betaWarning: {
    fontSize: 12,
    color: '#FF9800',
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginVertical: 5,
    minWidth: 120,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  orText: {
    marginVertical: 10,
    color: '#666',
  },
  joinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    textAlign: 'center',
    minWidth: 120,
    textTransform: 'uppercase',
  },
  joinButton: {
    backgroundColor: '#4CAF50',
  },
  activeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  invitationContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 6,
    marginBottom: 15,
  },
  invitationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  codeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    letterSpacing: 2,
  },
  copyButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  copyButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  instructionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  errorText: {
    color: '#f44336',
    textAlign: 'center',
  },
  disconnectButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  disconnectButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default MultiplayerControls; 