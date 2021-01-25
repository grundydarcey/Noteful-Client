import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'
//import PropTypes from 'prop-types'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { folderId } = this.props.match.params
    console.log(folderId, 'folderId note list main')
    const { notes=[] } = this.context
    console.log(notes, 'const notes')
    const notesForFolder = getNotesForFolder(notes, folderId)
    console.log(notesForFolder, 'const notesforfolder')
  
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                note_name={note.note_name}
                date_modified={note.date_modified}
                // onDeleteNote={this.onDeleteNote}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
}

// NoteListMain.propTypes = {
//   match: PropTypes.object,
//   params: PropTypes.object
// }