import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/posts';
import { NavLink } from "react-router-dom";
import "./ProfilePage.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ProfilePage = () => {

    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts))
    const user = useSelector(state => state.session.user)

    const userPosts = posts.filter(post => post.user.id === user.id)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])


    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3
        }
    }


    return (
        <>
        <h2>Profile Page Landing</h2>
        <div className='profile-landing-house'>
        <Carousel infiniteLoop={true} responsive={responsive}>
            {userPosts.map(post => {
                return (
                    <>
                    <NavLink to={`/posts/${post.id}`} style={{textDecoration: 'none', color: 'black'}}>
                        <div key={post.id} className="post-tiles">
                            <img src={post.post_image} style={{height: '400px', width: '100%', objectFit:'cover'}}></img>
                            <h2>{post.name}</h2>
                            <h3>My Rating: {post.rating} Stars</h3>
                            <h3>{post.genre}</h3>
                            <p>Posted by {post.user.username}</p>
                        </div>
                    </NavLink>
                    </>
                )
            })}
            </Carousel>
        </div>
        </>
    )
}

export default ProfilePage
