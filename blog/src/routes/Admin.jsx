import blogFetch from "../axios/config"

import { use, useEffect, useState } from "react"

import { Link } from "react-router-dom"

import "./admin.css"

const Admin = () => {

    const [posts, setPosts] = useState([])

    const getPosts = async () => {

        try {

            const res = await blogFetch.get('/posts')

            const data = res.data

            setPosts(data)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getPosts()
    }, [])

    const deletePost = async (id) => {
        await blogFetch.delete(`/posts/${id}`)
        getPosts()

        const filteredPosts = posts.filter((post) => post.id !== id)
        setPosts(filteredPosts)


    }


    return (
        <div className="admin">
            <h1>Gerenciar Posts</h1>
            {posts.length === 0 ? (
                <p>Carregando...</p>
            ) : (posts.map((post) => (
                <div className="post" key={post.id}>
                    <h2>{post.title}</h2>
                    <div className="actions">
                        <Link to={`/posts/edit/${post.id}`} className="btn editBtn">Editar</Link>
                        <button className="btn deleteBtn" onClick={() => { deletePost(post.id) }}>Excluir</button>
                    </div>
                </div>
            )))}
        </div>
    )
}

export default Admin