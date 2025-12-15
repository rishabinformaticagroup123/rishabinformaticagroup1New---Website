// components/WhatsAppButton.tsx
'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918970853557?text=Hi%20Rishab%20Informatica%20Group%2C%20I%20have%20a%20question"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50"
    >
      <FaWhatsapp size={24} />
    </a>
  );
}
