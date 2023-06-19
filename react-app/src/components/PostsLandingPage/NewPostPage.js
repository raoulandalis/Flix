import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { createPost } from '../../store/posts';
import './PostLandingPage.css'

const NewPostForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const posts = useSelector(state => state.posts);
    // const user = useSelector(state.session.user)

    //state slices
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [post_image, setPostImage] = useState('')
    const [rating, setRating] = useState('')
    const [errors, setErrors] = useState('')
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const error = {}
        if (!name) error.name = "Name is required"
        if (name.length < 5 || name.length > 50) error.name = "Name must be between 5 and 50 characters"
        if (!description) error.description = "Description is required"
        if (!genre) error.genre = "Genre is required"
        if (genre.length < 5 || genre.length > 50) error.genre = "Name must be between 5 and 50 characters"
        if (!post_image) error.post_image = "Image is required"
        if (!rating) error.rating = "Rating 2 is required"
        setErrors(error)
    }, [name, description, genre, post_image, rating])

    const submitForm = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        const formData = new FormData();
        formData.append("name", name)
        formData.append("description", description)
        formData.append("genre", genre)
        formData.append("post_image", post_image)
        formData.append("rating", rating)

        //error handling here
        // if (!Object.values(errors).length) {
        //     const data = await dispatch(createPost(formData));
        // }

        const data = await dispatch(createPost(formData));

        if (data.errors) {
            return setErrors(data.errors)
        }

        if (submitted && errors) {
            setErrors('')
        }

        setName('')
        setDescription('')
        setGenre('')
        setPostImage('')
        setRating('')
        setSubmitted(false)

        history.push("/posts")
    }

    if (!posts) return null

    return (
        <>
        <h2 style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>Create Post Page</h2>
        <div className='post-form-house'>
            <form id="p-form" onSubmit={submitForm}>
                <label>
                    Name:
                    {errors.name && submitted && < p style={{ color: "red" }}>{errors.name}</p>}
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>
                    Genre:
                    {errors.genre && submitted && < p style={{ color: "red" }}>{errors.genre}</p>}
                    <input type="text" name="genre" onChange={(e) => setGenre(e.target.value)}/>
                </label>
                <label>
                    Description:
                    {errors.description && submitted && < p style={{ color: "red" }}>{errors.description}</p>}
                    <textarea style={{resize: 'none'}} type="text" name="description" onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <label>
                    Image Link:
                    {errors.post_image && submitted && < p style={{ color: "red" }}>{errors.post_image}</p>}
                    <input type="text" name="image" onChange={(e) => setPostImage(e.target.value)}/>
                </label>
                <label>
                    Rating:
                    {errors.rating && submitted && < p style={{ color: "red" }}>{errors.rating}</p>}
                    <input type="number" name="rating" min="1" max="5" onChange={(e) => setRating(e.target.value)}/>
                </label>
                <button>POST</button>
            </form>
            </div>
        </>
    )
}

export default NewPostForm
