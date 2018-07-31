import React, {
  Component
} from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './createContact.js'
import {
  Route
} from 'react-router-dom'

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({
        contacts
      })
    })
  }

  removeContact = (clickedContact) => {
    this.setState((stateLast) => ({
      contacts: stateLast.contacts.filter((c) => c.id !== clickedContact.id)
    }))
    ContactsAPI.remove(clickedContact);
  }

  createContact = (contact) => {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }))
    })
  }

  render() {
    return (
      <div className="app">
      <Route exact path="/" render={()=>( 
        <ListContacts 
        onDeleteContact={this.removeContact} 
        contactsInListContacts={this.state.contacts} 
        />
        )}
      />
      <Route path="/create" render={({ history })=>(
          <CreateContact 
          onCreateContact={(contact)=>{
            this.createContact(contact)
            history.push('/')
          }}/>
          )}
        />
      </div>
    )
  }
}

export default App;