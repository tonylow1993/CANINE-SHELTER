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
import { createMessage, deleteMessage, listMessage, replyMessage } from '../actions/messageActions'
import '../message.css'

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

  const messageList = useSelector((state) => state.messageList)
  const { messages } = messageList

  useEffect(() => {
    if (!dog._id || dog._id !== match.params.id) {
      dispatch(listMessage(match.params.id))
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

  const Comment = ({ message }) => {
    const [toggleReplyBox, setToggleReplyBox] = useState(false)
    const [reply, setReply] = useState('')

    const sendReply = (messageId) => {
      dispatch(replyMessage(messageId, reply))
    }

    const deleteMsg = (messageId) => {
      dispatch(deleteMessage(messageId, -1))
    }

    return (
      <div className='comment-thread'>
          <details open className='comment' id='comment-1'>
              <summary>
                  <div className='comment-heading'>
                      <div className='comment-info'>
                          <div className='comment-author'>{message.name}</div>
                      </div>
                  </div>
              </summary>
              <div className='comment-body'>
                  <p>{message.text}</p>
                  { userInfo?.isAdmin && <button className='btn-primary btn-small' type='button' onClick={() => setToggleReplyBox(true)}>Reply</button> }
                  { userInfo?.isAdmin && <button className='btn-primary btn-small' type='button' onClick={() => deleteMsg(message._id)}>Delete</button> }
                  {
                    toggleReplyBox && <div className='reply-form'>
                      <textarea placeholder='Reply to message' rows='4' value={reply} onChange={e => setReply(e.target.value)}></textarea>
                      <button className='btn-primary btn-small' type='button' onClick={() => sendReply(message._id)}>Submit</button>
                      <button className='btn-primary btn-small' type='button' onClick={() => setToggleReplyBox(false)}>Cancel</button>
                    </div>
                  }
              </div>
              {
                message.replies.map((reply, index) => (
                  <Reply messageId={message._id} key={index} reply={reply} index={index}/>
                ))
              }
          </details>
      </div>
    )
  }

  const Reply = ({ index, messageId, reply }) => {
    const deleteReply = () => {
      dispatch(deleteMessage(messageId, index))
    }

    return (
      <div className='replies'>
        <details open className='comment'>
            <summary>
                <div className='comment-heading'>
                    <div className='comment-info'>
                        <div className='comment-author'>Admin</div>
                    </div>
                </div>
            </summary>
            <div className='comment-body'>
                <p> {reply} </p>
                { userInfo?.isAdmin && <button type='btn-primary btn-small' onClick={() => deleteReply()}>Delete</button> }
            </div>
        </details>
      </div>
    )
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
                  {
                    userInfo && <Button
                      onClick={addToFavouriteHandler}
                      className='btn-block'
                      type='button'
                    >
                      Add To Favourite
                    </Button>
                  }
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className='divider'>
            <Col md={7}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Messages</h2>
                  { 
                    messages.map(message => (
                      <Comment key={message.id} message={message}/>
                    ))
                  }
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={5}>
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
                  <h2>Leave a message to express your interest</h2>
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
                        <Form.Label>Message</Form.Label>
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
