import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import style from './ContactForm.module.css';

class ContactForm extends Component {
  state = { name: '', number: '' };

  handleChange = event => {
    const { name, value } = event.currentTarget;

    if (name === 'number' && !/^[0-9\s-+()]*$/.test(value)) {
      alert('Введіть лише цифри, символи та пробіл!');
      return;
    }

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { name, number } = this.state;
    event.preventDefault();

    const matchName = this.props.contactsName.some(
      contactName => name.toLowerCase() === contactName.toLowerCase()
    );
    if (matchName) {
      return alert(`${name} is already in contacts`);
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.props.onSubmit(newContact);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={style.form}>
        <label className={style.label}>
          Name
          <input
            type="text"
            name="name"
            className={style.input}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
            value={name}
            autoFocus
          />
        </label>

        <label className={style.label}>
          Number
          <input
            type="tel"
            name="number"
            className={style.input}
            pattern="[0-9\s-+()]*"
            title="Phone number must contain only digits, symbols (+, -, (, ), space)"
            required
            onChange={this.handleChange}
            value={number}
          />
        </label>

        <button type="submit" className={style.submit_btn}>
        <span></span>
      <span></span>
      <span></span>
      <span></span>
          add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contactsName: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default ContactForm;