import './newPost.css'
    import blogFetch from "../axios/config"

    import { useState } from "react"

    import { useNavigate } from "react-router-dom"

const NewPost = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const createPost = async (e) => {
        e.preventDefault()


        const post = { title, body, userId: 1 }


        await blogFetch.post('/posts', {
            body: post,
        });

        navigate('/');
    }

    return (
        <div className='newPost'>
            <h2>Inserir novo post:</h2>
            <form onSubmit={(e) => createPost(e)}>
                <div className='formControl'>
                    <label htmlFor='title'>Título:</label>
                    <input type="text" id='title' name='title' placeholder='Digite o título do post' onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='formControl'>
                    <label htmlFor='body'>Conteúdo:</label>
                    <textarea id='body' name='body' placeholder='Digite o conteúdo do post' onChange={(e) => setBody(e.target.value)}></textarea>
                </div>
                <input type="submit" value="Criar Post" className='btn' />
            </form>
        </div>
    )
}

export default NewPost