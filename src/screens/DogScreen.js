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

const DogScreen = ({ history, match }) => {
  const dispatch = useDispatch()

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
            <Col md={6}>
              <Image src={dog.image} alt={dog.name} fluid />
            </Col>
            <Col md={3}>
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
            </Col>
            <Col md={3}>
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
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default DogScreen
