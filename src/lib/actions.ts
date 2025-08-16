'use server';

import { addMessage } from './firebase';
import type { Message } from './types';

export async function submitMessage(formData: Message) {
  try {
    await addMessage(formData);
    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Error submitting message:', error);
    return { success: false, message: 'Failed to send message.' };
  }
}
