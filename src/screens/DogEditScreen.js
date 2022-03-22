import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listDogDetails, updateDog } from '../actions/dogActions'
import { DOG_UPDATE_RESET } from '../constants/dogConstants'

const DogEditScreen = ({ match, history }) => {
  const dogId = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [breed, setBreed] = useState('')
  const [year, setCountInStock] = useState(0)
  const [location, setLocation] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const dogDetails = useSelector((state) => state.dogDetails)
  const { loading, error, dog } = dogDetails

  const dogUpdate = useSelector((state) => state.dogUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = dogUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DOG_UPDATE_RESET })
      history.push('/admin/doglist')
    } else {
      if (!dog.name || dog._id !== dogId) {
        dispatch(listDogDetails(dogId))
      } else {
        setName(dog.name)
        setImage(dog.image)
        setBreed(dog.breed)
        setCountInStock(dog.year)
        setLocation(dog.location)
      }
    }
  }, [dispatch, history, dogId, dog, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateDog({
        _id: dogId,
        name,
        image,
        breed,
        location,
        year,
      })
    )
  }

  return (
    <>
      <Link to='/admin/doglist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Dog</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='breed'>
              <Form.Label>Breed</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter breed'
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='year'>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter year'
                value={year}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default DogEditScreen
