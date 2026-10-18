'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918308383673';
  const message = encodeURIComponent('Hello! I would like to inquire about your engineering services.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={32} color="white" />
    </a>
  );
}
