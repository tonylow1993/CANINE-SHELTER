import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listDogs,
  deleteDog,
  createDog,
} from '../actions/dogActions'
import { DOG_CREATE_RESET } from '../constants/dogConstants'

const DogListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const dogList = useSelector((state) => state.dogList)
  const { loading, error, dogs, page, pages } = dogList

  const dogDelete = useSelector((state) => state.dogDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = dogDelete

  const dogCreate = useSelector((state) => state.dogCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    dog: createdDog,
  } = dogCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: DOG_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/dog/${createdDog._id}/edit`)
    } else {
      dispatch(listDogs('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdDog,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteDog(id))
    }
  }

  const createDogHandler = () => {
    dispatch(createDog())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Dogs</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createDogHandler}>
            <i className='fas fa-plus'></i> Add Dog
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>BREED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dogs.map((dog) => (
                <tr key={dog._id}>
                  <td>{dog._id}</td>
                  <td>{dog.name}</td>
                  <td>{dog.breed}</td>
                  <td>
                    <LinkContainer to={`/admin/dog/${dog._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(dog._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default DogListScreen
