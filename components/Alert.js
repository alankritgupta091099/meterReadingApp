import { showMessage, hideMessage } from 'react-native-flash-message';

export function showAlert({ title, message, onOk, buttonText = 'OK' }) {
  showMessage({
    message: title || 'Notice',
    description: message || '',
    type: 'info',
    icon: 'info',
    duration: 4000,
    onPress: typeof onOk === 'function' ? onOk : undefined,
  });
}

export function showError(message, title = 'Error', buttonText = 'OK') {
  showMessage({
    message: title,
    description: message,
    type: 'danger',
    icon: 'danger',
    duration: 2000,
  });
}

export function showSuccess(message, title = 'Success', onOk, buttonText = 'OK') {
  showMessage({
    message: title,
    description: message,
    type: 'success',
    icon: 'success',
    duration: 1000,
    onPress: typeof onOk === 'function' ? onOk : undefined,
  });
}

export function showWarning(message, title = 'Warning') {
  showMessage({
    message: title,
    description: message,
    type: 'warning',
    icon: 'warning',
    duration: 4000,
  });
}

export function showInfo(message, title = 'Info') {
  showMessage({
    message: title,
    description: message,
    type: 'info',
    icon: 'info',
    duration: 3000,
  });
}

export function hideAllMessages() {
  hideMessage();
}
