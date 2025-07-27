import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native-web';

const Rules = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.title}>🎮 Triliza Game Rules</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.text}>
              Triliza is a modern take on the classic Tic-Tac-Toe game, featuring multi-dimensional gameplay and enhanced scoring mechanics.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objective</Text>
            <Text style={styles.text}>
              Score the most points by creating three-in-a-row patterns on the game board.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Players</Text>
            <Text style={styles.text}>• <Text style={styles.bold}>Player X</Text> (starts first)</Text>
            <Text style={styles.text}>• <Text style={styles.bold}>Player O</Text> (goes second)</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Game Board</Text>
            <Text style={styles.text}>• Default board size: 3x3 grid</Text>
            <Text style={styles.text}>• Each cell is numbered from 1-9 (top-left to bottom-right)</Text>
            <Text style={styles.text}>• Players take turns placing their symbol (X or O) in empty cells</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Scoring System</Text>
            <Text style={styles.subtitle}>Three-in-a-Row Patterns:</Text>
            <Text style={styles.text}>• <Text style={styles.bold}>Horizontal</Text> - Three symbols in the same row</Text>
            <Text style={styles.text}>• <Text style={styles.bold}>Vertical</Text> - Three symbols in the same column</Text>
            <Text style={styles.text}>• <Text style={styles.bold}>Diagonal</Text> - Three symbols diagonally (both directions)</Text>
            
            <View style={styles.highlight}>
              <Text style={styles.subtitle}>Scoring Mechanics:</Text>
              <Text style={styles.text}>• Each three-in-a-row pattern = <Text style={styles.bold}>1 point</Text></Text>
              <Text style={styles.text}>• Multiple patterns can be created simultaneously</Text>
              <Text style={styles.text}>• Patterns are counted dynamically as the game progresses</Text>
              <Text style={styles.text}>• The player with the highest score when the board is full wins</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Game Flow</Text>
            <View style={styles.gameFlow}>
              <Text style={styles.text}>1. <Text style={styles.bold}>Setup</Text>: Board starts empty with numbered cells (1-9)</Text>
              <Text style={styles.text}>2. <Text style={styles.bold}>Turns</Text>: Players alternate placing X or O in empty cells</Text>
              <Text style={styles.text}>3. <Text style={styles.bold}>Scoring</Text>: Points are calculated after each move</Text>
              <Text style={styles.text}>4. <Text style={styles.bold}>Game End</Text>: When all cells are filled (9 moves total)</Text>
              <Text style={styles.text}>5. <Text style={styles.bold}>Winner</Text>: Player with the highest score wins</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Winning Conditions</Text>
            <Text style={styles.text}>• <Text style={styles.bold}>Win</Text>: Player with the highest score when board is full</Text>
            <Text style={styles.text}>• <Text style={styles.bold}>Tie</Text>: Both players have equal scores when board is full</Text>
            <Text style={styles.text}>• <Text style={styles.bold}>No Draw</Text>: Unlike traditional Tic-Tac-Toe, there's always a winner due to scoring</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Strategy Tips</Text>
            <View style={styles.strategyTips}>
              <Text style={styles.text}>1. <Text style={styles.bold}>Block Opponent</Text>: Prevent opponent from creating three-in-a-row patterns</Text>
              <Text style={styles.text}>2. <Text style={styles.bold}>Create Multiple Patterns</Text>: Try to set up moves that create multiple scoring opportunities</Text>
              <Text style={styles.text}>3. <Text style={styles.bold}>Center Control</Text>: The center cell (5) is often valuable for creating diagonal patterns</Text>
              <Text style={styles.text}>4. <Text style={styles.bold}>Pattern Recognition</Text>: Look for opportunities to complete existing two-in-a-row patterns</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Multiplayer Mode</Text>
            <Text style={styles.text}>• <Text style={styles.bold}>Local</Text>: Two players on the same device</Text>
            <Text style={styles.text}>• <Text style={styles.bold}>Online</Text>: Play with friends over the internet (Beta feature)</Text>
            <Text style={styles.text}>• <Text style={styles.bold}>Real-time</Text>: Synchronized gameplay with live updates</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity onPress={onClose} style={styles.closeModalButton}>
            <Text style={styles.closeModalText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 12,
    maxWidth: 600,
    width: '90%',
    maxHeight: '80vh',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  closeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
    margin: 0,
    padding: 0,
  },
  content: {
    padding: 20,
    maxHeight: '60vh',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
    paddingBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  highlight: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    marginTop: 10,
    marginBottom: 10,
  },
  gameFlow: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
    marginTop: 10,
  },
  strategyTips: {
    backgroundColor: '#e8f5e8',
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
    marginTop: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  closeModalButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 6,
  },
  closeModalText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Rules; 