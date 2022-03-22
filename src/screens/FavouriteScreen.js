import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToFavourite, removeFromFavourite } from '../actions/favouriteActions'

const FavouriteScreen = ({ match, location, history }) => {
  const dogId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const favourite = useSelector((state) => state.favourite)
  const { favouriteItems } = favourite

  useEffect(() => {
    if (dogId) {
      dispatch(addToFavourite(dogId, qty))
    }
  }, [dispatch, dogId, qty])

  const removeFromFavouriteHandler = (id) => {
    dispatch(removeFromFavourite(id))
  }

  return (
    <Row>
      <Col md={12}>
        <h1>Favourite</h1>
        {favouriteItems.length === 0 ? (
          <Message>
            Your favourite is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {favouriteItems.map((item) => (
              <ListGroup.Item key={item.dog}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <Link to={`/dog/${item.dog}`}>{item.name}</Link>
                  </Col>
                  <Col md={4}>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        Breed: {item.breed}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Year: {item.year}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Location: {item.location}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromFavouriteHandler(item.dog)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  )
}

export default FavouriteScreen
