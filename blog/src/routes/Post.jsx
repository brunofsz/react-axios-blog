import blogFetch from "../axios/config"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './post.css'

const Post = () => {
    const { id } = useParams()

    const [post, setPost] = useState({})

    const getPost = async () => {
        try {

            const response = await blogFetch.get(`/posts/${id}`)

            const data = response.data

            setPost(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <div className="postContainer">
            {
                !post.title ? <p>Carregando post...</p> : (
                    <div className="post">
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                )
            }
        </div>
    )
}

export default Post