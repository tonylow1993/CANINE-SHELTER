import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listDogDetails,
} from '../actions/dogActions'
import { addUserFavourite } from '../actions/favouriteActions'
import { createMessage } from '../actions/messageActions'

const DogScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const [message, setMessage] = useState({
    name: '',
    contact: '',
    email: '',
    text: '',
  })

  const dogDetails = useSelector((state) => state.dogDetails)
  const { loading, error, dog } = dogDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!dog._id || dog._id !== match.params.id) {
      dispatch(listDogDetails(match.params.id))
    }
  }, [dispatch, match])

  const addToFavouriteHandler = () => {
    dispatch(
      addUserFavourite(
        userInfo._id,
        dog._id
      )
    )
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createMessage(match.params.id, message))
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={dog.name} />
          <Row>
            <Col md={7}>
              <Image src={dog.image} alt={dog.name} fluid />
            </Col>
            <Col md={5}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{dog.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Breed: {dog.breed}
                </ListGroup.Item>
                <ListGroup.Item>
                  Year: {dog.year}
                </ListGroup.Item>
                <ListGroup.Item>
                  Location: {dog.location}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Button
                    onClick={addToFavouriteHandler}
                    className='btn-block'
                    type='button'
                  >
                    Add To Favourite
                  </Button>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant='flush'>
                {/* {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))} */}
                <ListGroup.Item>
                  <h2 class='divider'>Leave a message to express your interest</h2>
                  {
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          as='input'
                          value={message.name}
                          onChange={(e) => setMessage({...message, name: e.target.value })}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId='contact'>
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                          as='input'
                          value={message.contact}
                          onChange={(e) => setMessage({...message, contact: e.target.value })}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          as='input'
                          value={message.email}
                          onChange={(e) => setMessage({...message, email: e.target.value })}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId='text'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={message.text}
                          onChange={(e) => setMessage({...message, text: e.target.value })}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        //disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  }
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default DogScreen
