import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'
//import PropTypes from 'prop-types'

export default class Note extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    },
    onDeleteNote: () => { },
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {       
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { note_name, id, date_modified } = this.props
    console.log(id)
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/notes/${id}`}>
            {note_name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Date Modified
            {' '}
            <span className='Date'>
              {format(date_modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}


// Note.propTypes = {
//   onDeleteNote: PropTypes.func,
//   id: PropTypes.string.isRequired,
//   note_name: PropTypes.string.isRequired,
//   date_modified: PropTypes.string.isRequired
// }