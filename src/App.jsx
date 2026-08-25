import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import PasscodeScreen from './components/PasscodeScreen';
import FlowerLoadingScreen from './components/FlowerLoadingScreen';
import GiftUnboxing from './components/GiftUnboxing';
import MainBirthdayPage from './components/MainBirthdayPage';

export default function App() {
  const [currentStep, setCurrentStep] = useState('loading'); // 'loading' | 'passcode' | 'flower-loading' | 'unboxing' | 'unlocked'

  return (
    <div className="mobile-app-shell">
      {currentStep === 'loading' && (
        <LoadingScreen onComplete={() => setCurrentStep('passcode')} />
      )}

      {currentStep === 'passcode' && (
        <PasscodeScreen onUnlock={() => setCurrentStep('flower-loading')} />
      )}

      {currentStep === 'flower-loading' && (
        <FlowerLoadingScreen onComplete={() => setCurrentStep('unboxing')} />
      )}

      {currentStep === 'unboxing' && (
        <GiftUnboxing onOpen={() => setCurrentStep('unlocked')} />
      )}

      {currentStep === 'unlocked' && (
        <MainBirthdayPage />
      )}
    </div>
  );
}
