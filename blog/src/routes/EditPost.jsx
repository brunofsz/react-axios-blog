import './editPost.css'

import blogFetch from "../axios/config"

import { useEffect, useState } from "react"

import { useParams, useNavigate } from "react-router-dom"



const EditPost = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const { id } = useParams()


    const getPost = async () => {
        try {

            const response = await blogFetch.get(`/posts/${id}`)

            const data = response.data

            setTitle(data.title)
            setBody(data.body)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPost()
    }, [])


const editPost = async (e) => {
        e.preventDefault()
    
    const post = { title, body, userId: 1 }
    
    await blogFetch.put(`/posts/${id}`, {
        body: post,
    })
    }



    return (
        <div className='newPost'>
            <h2>Editando: {title}</h2>
            <form onSubmit={(e) => editPost(e)}>
                <div className='formControl'>
                    <label htmlFor='title'>Título:</label>
                    <input type="text" id='title' name='title' placeholder='Digite o título do post' onChange={(e) => setTitle(e.target.value)} value={title || ""} />
                </div>
                <div className='formControl'>
                    <label htmlFor='body'>Conteúdo:</label>
                    <textarea id='body' name='body' placeholder='Digite o conteúdo do post' onChange={(e) => setBody(e.target.value)} value={body || ""}></textarea>
                </div>
                <input type="submit" value="Editar Post" className='btn' />
            </form>
        </div>
    )
}

export default EditPost