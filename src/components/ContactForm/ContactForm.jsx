import { Component } from "react";
import PropTypes from 'prop-types';
import css from './ContactForm.module.css'

export class ContactForm extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape(PropTypes.string.isRequired).isRequired
    ).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const identicalContact = this.props.contacts.some(
      contact => contact.name === this.state.name
    );

    identicalContact
      ? alert(`${this.state.name} is already in contacts`)
      : this.onNoIdenticalContact();
  };

  onNoIdenticalContact() {
    
    this.props.onFormSubmit(this.state);
    this.reset();
  }

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={css.contactForm} onSubmit={this.handleFormSubmit}>
        <label>
          Name <br />
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleInputChange}
          />
        </label>

        <label>
          Number <br />
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleInputChange}
          />
        </label>

        <button type="submit">Add contact</button>
      </form>
    );
  }
}