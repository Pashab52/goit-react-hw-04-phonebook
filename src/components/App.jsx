import { useState, useEffect,useLayoutEffect, useRef} from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { nanoid } from 'nanoid';
import css from './App.module.css'

const defContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(defContacts);
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true)


  useLayoutEffect(() => {
    try {
      const contactsJSON = localStorage.getItem('contacts');

      if (contactsJSON) {
        const localContacts = JSON.parse(contactsJSON);

        // console.log('запис з ЛХ у стейт')
        setContacts(localContacts);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      // console.log('рендер 1', contacts);
      firstRender.current = false;
      return
    }
    
      // console.log('запис зі стейту в ЛХ');
      localStorage.setItem('contacts', JSON.stringify(contacts));

    },
    [contacts]
  );



  const onFormSubmit = newContact => {
    const copyNewContact = { ...newContact };

    copyNewContact.id = nanoid();

    setContacts([...contacts, copyNewContact]);
  };

  const onFilterChange = filterWord => {
    setFilter(filterWord);
  };

  function filterContacts() {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className={css.phoneContainer}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onFormSubmit={onFormSubmit} contacts={contacts} />

      <Filter onFilterChange={onFilterChange} value={filter} />

      <h2>Contacts</h2>
      {contacts.length > 0 && (
        <ContactList
          contacts={filterContacts()}
          OnBtnDelClick={deleteContact}
        />
      )}
    </div>
  );
};

// let localContacts = useRef(null);

// useEffect(() => {
//   try {
//     const contactsJSON = localStorage.getItem('contacts');

//     if (contactsJSON) {
//       localContacts.current = JSON.parse(contactsJSON);

//       console.log('запис з ЛХ у стейт');
//       setContacts(localContacts.current);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }, []);

// useEffect(() => {
//   if (firstRender.current) {
//     console.log('рендер 1', contacts);
//     firstRender.current = false;
//     return;
//   }
//   if (localContacts.current === contacts) {
//     console.log('пропуск', contacts);
//     return;
//   }
//   console.log('запис зі стейту в ЛХ');
//   localStorage.setItem('contacts', JSON.stringify(contacts));
// }, [contacts]);