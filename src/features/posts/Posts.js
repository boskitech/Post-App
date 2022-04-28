import { 
  useAddNewPostMutation, 
  useGetPostsQuery, 
  useUpdatePostMutation,
  useDeletePostMutation
} from '../api/apiSlice'
import { useState } from "react"


let PostExcerpt = ({ post, editPost, delPost }) => {
  return (
    <div
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
        <span onClick={() => delPost(post.id)}  className="xBtn">
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
  )
}

const Posts = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
  } = useGetPostsQuery()

  const [addNewPost] = useAddNewPostMutation()
  const [updatePost] = useUpdatePostMutation()
  const [deletePost] = useDeletePostMutation()

  const [btnName, setBtnName] = useState('Add Post')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [id, setId] = useState('')

  const savePost = async () => {
    if (title && content && btnName === 'Add Post') {
      try {
        await addNewPost({title, content}).unwrap()
        setTitle('')
        setContent('')
      }catch(err){
        console.log('Failed to save post: ', err)
      }
    }else {
      await updatePost({id, title, content}).unwrap()
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

  const delPost = async (userId) => {
    await deletePost(userId)
  }

  let body

  if (isLoading) {
    body = 'Loading Content'
  } else if (isSuccess) {
    body = posts.map(post => (<PostExcerpt editPost={editPost} delPost={delPost} key={post.id} post={post} />))
  } else if (isError) {
    body = 'Error Loading Posts'
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
        {body}
      </div>

    </div>
  )
}

export default Posts