import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import { Animated, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';


export default function TabLayout() {
  const backgroundColor = '#FFF';
  const grey = '#141415';

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Julio é escroto</ThemedText>
      <ThemedText>Julio é escroto</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
});
