import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { deleteUserFavourite, listFavouriteDogs } from '../actions/favouriteActions'

const FavouriteScreen = ({ match, location, history }) => {
  const dispatch = useDispatch()

  const favouriteDogList = useSelector((state) => state.favouriteDogList)
  const { favouriteDogs } = favouriteDogList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const favouriteList = useSelector((state) => state.favouriteList)
  const { favourites } = favouriteList

  useEffect(() => {
    dispatch(listFavouriteDogs())
  }, [dispatch, favourites])

  const removeFromFavouriteHandler = (id) => {
    dispatch(deleteUserFavourite(userInfo._id, id))
  }

  return (
    <Row>
      <Col md={12}>
        <h1>Favourite</h1>
        {favouriteDogs?.length === 0 ? (
          <Message>
            Your favourite list is empty
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {favouriteDogs?.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <Link to={`/dog/${item._id}`}>{item.name}</Link>
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
                      onClick={() => removeFromFavouriteHandler(item._id)}
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
