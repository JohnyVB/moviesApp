import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer} from '@react-navigation/native';
import { NavigationController } from './src/navigation/NavigationController';
import { GradientProvider } from './src/context/GradientContext';

const AppState = ({ children }: any) => {
  return (
    <GradientProvider>
      { children }
    </GradientProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <NavigationController />
      </AppState>
    </NavigationContainer>
  )
}

export default App;
