import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { nanoid } from 'nanoid';
import css from './App.module.css'

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() { 

  const contactsJSON = localStorage.getItem('contacts');
      const localContacts = JSON.parse(contactsJSON);
 
  if (this.state.contacts !== localContacts && localContacts !== null) {
    this.setState({ contacts: localContacts });
  }
   
  };


  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  onFormSubmit = newContact => {
    const copyNewContact = { ...newContact };

    this.setState(prevState => {
      copyNewContact.id = nanoid();
      return { contacts: [...prevState.contacts, copyNewContact] };
    });
  };

  onFilterChange = filterWord => {
    this.setState({
      filter: filterWord,
    });
  };

  filterContacts() {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div className={css.phoneContainer}>
        <h1>Phonebook</h1>
        <ContactForm
          onFormSubmit={this.onFormSubmit}
          contacts={this.state.contacts}
        />

        <Filter
          onFilterChange={this.onFilterChange}
          value={this.state.filter}
        />

        <h2>Contacts</h2>
        {this.state.contacts.length > 0 && (
          <ContactList
            contacts={this.filterContacts()}
            OnBtnDelClick={this.deleteContact}
          />
        )}
      </div>
    );
  }
};
