import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Dog = ({ dog }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/dog/${dog._id}`}>
        <Card.Img src={dog.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/dog/${dog._id}`}>
          <Card.Title as='div'>
            <strong>{dog.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Dog
