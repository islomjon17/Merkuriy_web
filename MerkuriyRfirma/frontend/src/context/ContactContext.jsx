import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ContactContext = createContext(null);

export const ContactProvider = ({ children }) => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    // API faqat 1 marta chaqiriladi
    axios.get('http://127.0.0.1:8000/api/contact/')
      .then(res => setContact(res.data))
      .catch(err => console.error("Aloqa ma'lumotlarini yuklashda xatolik:", err));
  }, []);

  return (
    <ContactContext.Provider value={contact}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => useContext(ContactContext);