import React from 'react';
import { View, Text, StyleSheet } from 'react-native-web';

const Version = () => {
  // Version will be injected during build process
  const version = process.env.NEXT_PUBLIC_VERSION || '1.0.0';

  return (
    <View style={styles.container}>
      <Text style={styles.version}>v{version}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    bottom: 8,
    right: 8,
    zIndex: 1000,
  },
  version: {
    fontSize: 12,
    color: '#666',
    opacity: 0.7,
    fontFamily: 'monospace',
  },
});

export default Version; 