import { useParams, useHistory } from "react-router-dom"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts} from '../../store/posts';
import { getAllReviews } from "../../store/reviews";
import OpenModalButton from '../OpenModalButton'
import UpdatePost from "./UpdatePage";
import DeletePostModal from "./DeletePostModal";
import CreateReviewModal from "./CreateReviewModal"
import UpdateReviewModal from "./UpdateReview";
import DeleteReviewModal from "./DeleteReviewModal";
import "./PostDetailPage.css"

const PostDetailPage = () => {

    const { postId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.session.user)
    const reviews = Object.values(useSelector(state => state.reviews))
    // const review = useSelector(state => state.reviews)
    // const single_review = useSelector(state => state.reviews)
    const post = posts[postId]

    // console.log("whats this", post)

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllReviews())
    }, [dispatch])

    if (!post) return null
    if (!user) return null

    const starRating = (rating) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<i class="fa-sharp fa-solid fa-star" style={{color: '#b7b224'}}></i>)
            } else {
                stars.push(<i class="fa-regular fa-star" style={{color: '#b7b224'}}></i>)
            }
        }
        return stars
    }

    const postOwner = post.user.id === user.id
    const userReviewsForPost = reviews.find(review => (review.post_id == postId && review.user.id === user.id))


    return (
        <>
        {!postOwner && !userReviewsForPost && (
        <div>
            <OpenModalButton
                    buttonText={'Post Review'}
                    modalComponent={<CreateReviewModal postId={post.id}/>}
                />
        </div>)}
        {postOwner &&
            <>
            <button onClick={() => history.push(`/posts/${postId}/update`)}>Update Post</button>
            <OpenModalButton
                buttonText={'Delete Post'}
                modalComponent={<DeletePostModal postId={postId}/>}
            />
            </>
        }
        <div className="post-detail-house">
            <div>
                <img src={post.post_image} style={{height: '500px'}}></img>
            </div>
            <div className="details">
                <div className="top-name">
                    <h1>{post.name}</h1>
                    <h3>{post.genre}</h3>
                    <p>{post.description}</p>
                </div>
                <h3 id="detail-reviews-word">Reviews</h3>
                <div className="detail-reviews">
                {reviews.map(review => {
                    if (review.post_id === post.id) {
                    return (
                        <>
                        <div>
                            <div>{starRating(review.rating)}</div>
                            <div>{review.content}</div>
                            <div>{review.user.username}</div>
                        </div>
                        {review.user.id === user.id && (
                            <>
                            <OpenModalButton
                                buttonText={'Update'}
                                modalComponent={<UpdateReviewModal reviewId={review.id} />}
                            />
                            <OpenModalButton
                                buttonText={'Delete'}
                                modalComponent={<DeleteReviewModal reviewId={review.id} />}
                            />
                            </>
                            )}

                        </>
                    )}
                })}
                </div>
            </div>
        </div>
        </>
    )
}

export default PostDetailPage
