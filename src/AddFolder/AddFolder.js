import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types'

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
      
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    if (this.context.addFolder.hasError === true){
      return this.context.updateNewFolderName()
    } else {
      const folder = {
        folder_name: e.target['folder-name'].value
      }
      fetch(`${config.API_ENDPOINT}/folders`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(folder),
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
          return res.json()
        })
        .then(folder => {
          this.context.addFolder(folder)
          this.props.history.push(`/folder/${folder.id}`)
        })
        .catch(error => {
          console.error({ error })
        })
      }
    }
    

  //updateFolderName(e) {
  //  const newName = e.target.value;
  //  this.context.updateNewFolderName(newName);
  //}

  validateFolderName() {
    if (this.context.newFolder.name.trim().length === 0) {
      return 'Must be more than 0 characters.'
    } else if ( this.context.newFolder.name.trim().length <= 3 ) {    
      return 'Must be more than 3 characters.'
    }
  }

  render() {
    return(
      <section className='AddFolder'>
      <h2>Create a folder</h2>
      <NotefulForm onSubmit={this.handleSubmit}>
        <div className='field'>
        <label htmlFor='folder-name'>
          Name:
        {this.context.addFolder.touched && (
        <p>{this.validateFolderName()}</p>
      )}  
      </label>
      <input type='text' 
        id='new-folder'
        name="folder-name"
        aria-required="true"
        aria-label="Name"
        required
        defaultValue=""
        //onChange={(e) => this.updateFolderName(e)}
      />
        <button type="submit">Submit</button>
        </div>
        </NotefulForm>
      </section>
    )
  }
}


AddFolder.propTypes = {
  history: PropTypes.object
}