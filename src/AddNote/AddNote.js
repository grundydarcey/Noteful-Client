import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'

export default class AddNote extends React.Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext

  addNewNote = note => {
    note.date_modified = new Date(note.modified);
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(note),
    })
      .then(res => {
        return res.json()
      })
      .then(resJSON => this.context.handleAddNote(resJSON))
  }
  parseFolders = () => {
    return this.context.folders.map(folder => (
      <option key={folder.id} name={folder.id} value={folder.id}>
        {folder.folder_name}
      </option>
    ))
  }

  handleSubmit = e => {
    e.preventDefault(e);
    const newNote = {
      note_name: e.target.name.value,
      content: e.target.content.value,
      folder_id: e.target.folder.value,
      modified: new Date(),
    }
    if (e.target.name.value.length !== 0 && e.target.content.value.length !== 0) {
      this.addNewNote(newNote)
      this.props.history.push('/');
    } else {
      return this.context.updateBadSubmitData()
    }
  }

  validateName = () => {
    if (this.context.newNote.name.value === undefined || this.context.newNote.name.value.length === 0) {
      return 'Name is required'
    }
  }

  validateDescription = () => {
    if (this.context.newNote.content.value === undefined || this.context.newNote.content.value.length === 0) {
      return 'Description is required'
    }
  }
  render() {
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note_name'>
              Name: 
            </label>
            <input type='text' id='note-name' name='name'
              aria-required="true"
              aria-label="Name"
              required
              defaultValue=""
            />
          </div>
          <div className='field'>
            <label htmlFor="content">
              Description
            </label>
            <textarea id='note-content' name='content'
              aria-required="true"
              aria-label="Description"
              defaultValue=""
              required
            />
          </div>
          <div className='field'>
            <label htmlFor="folder-select">Select a Folder</label>
            <select
              id="note-folder"
              name="folder"
              aria-required="true"
              aria-label="Select a folder"
            >
              {this.parseFolders()}
            </select>
          </div>
          <div className='buttons'>
            <button type="submit">Submit</button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}