import React, { createContext, useContext, useState, useEffect } from 'react';
import { getContact } from '../api/client';

const ContactContext = createContext(null);

export const ContactProvider = ({ children }) => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    getContact()
      .then((data) => setContact(data))
      .catch((err) => console.warn("Aloqa ma'lumotlarini yuklashda xatolik:", err));
  }, []);

  return (
    <ContactContext.Provider value={contact}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => useContext(ContactContext);