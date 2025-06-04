import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      'newChat': 'New chat',
      'theme': 'Theme',
      'clearAllData': 'Clear All Data',
      'clearConfirmTitle': 'Clear All Data',
      'clearConfirmMessage': 'Are you sure you want to clear all chat history and settings? This action cannot be undone.',
      'cancel': 'Cancel',
      'confirm': 'Clear Data',
      'typeMessage': 'Type a message...',
      'thinking': 'Thinking',
      'errorMessage': 'Sorry, there was an error communicating with the API. Please check your connection and API settings.'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;