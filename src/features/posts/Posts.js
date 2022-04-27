import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"
import { removePost, edittPost, fetchPosts, selectAllPosts, addPost} from "./postSlice"


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
    }
  }, [postStatus, dispatch])

  const savePost = async() => {
    if (title && content && btnName === 'Add Post') {
      try {
        dispatch(
          addPost({ id: nanoid(), title, content })
        )
        setTitle('')
        setContent('')
      }catch(err){
        console.log('Failed To save post: ', err)
      }finally{
        console.log("success")
      }
      
    } else {
      dispatch(
        edittPost({ id, title, content })
      )

      setTitle('')
      setContent('')
      setBtnName('Add Post')
    }
  }

  const deletePost = (userId) => {
      dispatch(removePost(userId))
      setTitle('')
      setContent('')
      setBtnName('Add Post')
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
              <span onClick={() => deletePost(post.id)} className="xBtn">
                <b>DEL</b>
              </span>
            </span>
            <br />
            <p style={{ fontSize: '15px', marginTop: '7px' }}>
              {post.content}
              <span onClick={() => editPost(post)} className="eBtn">
                <b>EDIT</b>
              </span>
            </p>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Posts