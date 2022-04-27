import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"
import { postAdded, deletePost, postUpdate, fetchPosts, selectAllPosts } from "./postSlice"


const Posts = () => {
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(state => state.posts.status)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [btnName, setBtnName] = useState('Add Post')
  const [id, setId] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
      console.log(posts)
    }
  }, [postStatus, posts, dispatch])

  const savePost = () => {
    if (title && content && btnName === 'Add Post') {
      dispatch(
        postAdded({ id: nanoid(), title, content })
      )

      setTitle('')
      setContent('')
    } else {
      dispatch(
        postUpdate({ id, title, content })
      )

      setTitle('')
      setContent('')
      setBtnName('Add Post')
    }
  }

  const editPost = (post) => {
    setId(post.id)
    setTitle(post.title)
    setContent(post.content)
    setBtnName('Update Post')
  }

  return (
    <div style={{ width: '500px', height: '650px', margin: '100px auto', backgroundColor: '#cccccc', padding: '0px' }} className="Counter">
      <div style={{ height: '40px', backgroundColor: '#333333', padding: '15px', color: '#fff', fontSize: '30px' }} className="Header">
        <b>Redux Post App</b>
      </div>
      <div className="postDiv">
        <div style={{ marginTop: '20px' }} className='textfields'>
          <input type="text" placeholder='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{
              border: 'none',
              height: '50px',
              width: '400px',
              margin: '10px 45px',
              fontSize: '20px',
              paddingLeft: '7px'

            }} />
          <input type="text" placeholder='Content'
            value={content}
            onChange={e => setContent(e.target.value)}
            style={{
              border: 'none',
              height: '50px',
              width: '400px',
              margin: '0px 45px',
              fontSize: '20px',
              paddingLeft: '7px'
            }} />
          <button className="btn-minus"
            onClick={() => savePost()}
            style={{
              width: '410px',
              height: '47px',
              fontSize: '25px',
              border: 'none',
              backgroundColor: '#333333',
              margin: '20px 45px 30px 45px',
              color: 'white',
              cursor: 'pointer'
            }}>
            <b>{btnName}</b>
          </button>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #eeeeee', padding: '20px auto', height: '330px', overflow: 'auto' }} className="display">
        {posts.map(post => (
          <div key={post.id}
            onClick={() => editPost(post)}
            style={{
              width: '420px',
              margin: '10px auto',
              height: 'auto',
              border: '1px solid #hhhhhh',
              borderRadius: '3px',
              backgroundColor: '#aaaaaa',
              padding: '10px',
              color: '#333333',
              cursor: 'pointer'
            }}>

            <span style={{ fontSize: '25px' }}>{post.title}
              <span onClick={() => dispatch(deletePost(post.id))} style={{ fontSize: '20px', cursor: 'pointer', float: 'right', color: 'red' }}>
                <b>X</b>
              </span>
            </span>
            <br />
            <p style={{ fontSize: '15px', marginTop: '7px' }}>{post.content}</p>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Posts