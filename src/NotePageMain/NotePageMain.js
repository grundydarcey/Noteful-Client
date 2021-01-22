import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'
//import PropTypes from 'prop-types';

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    console.log(note);
    //console.log({notes});
    console.log({noteId});
    console.log(note, "this is in note page main")
    return (
      <section className='NotePageMain'>
        <Note
          id={note.folder_id}
          note_name={note.note_name}
          date_modified={note.date_modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}
/*NotePageMain.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object
}*/