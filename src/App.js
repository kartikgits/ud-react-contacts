import React, { Component } from "react";
import CreateContact from "./CreateContact";
import ListContacts from "./ListContacts";
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: [],
    screen: 'list'
  }

  componentDidMount() {
    ContactsAPI.getAll()
      .then(contacts => {
        this.setState(() => ({
          contacts
        }))
      })
  }

  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: this.state.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))
    ContactsAPI.remove(contact)
  }

  render() {
    return(
      <div>
        {this.state.screen === 'list' && (<ListContacts 
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact}
          onNavigate={() => {
            this.setState(() => ({
              screen: 'create'
            }))
            }}
          />
        )}
        {this.state.screen === 'create' && (
          <CreateContact />
        )}
      </div>
    )
  }
}

export default App;
