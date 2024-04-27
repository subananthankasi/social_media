import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const EditPost = ({posts,handleEdit,editBody,setEditBody,editTitle,setEditTitle}) => {
 const {id} = useParams();
 const post =posts.find(post=>(post.id).toString()===id);
 
 useEffect(()=>{
    if(post){
        setEditTitle(post.title);
        setEditBody(post.body)
    }
 },[post,setEditTitle,setEditBody])
 
 return (
   <main className='NewPost'>
    {
      editTitle &&
      <>
      <h2>Edit post</h2>
      <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
       <label>Title:</label>
       <input type='text'
              id='postTitle'
              required
              value={editTitle}
              onChange={(e)=>setEditTitle(e.target.value)}

       
       />
       <label htmlFor="postBody">post:</label>
       <textarea 
        id="postBody"
        required
        value={editBody}
        onChange={(e)=>setEditBody(e.target.value)}

        
        
        ></textarea>
        <button type='submit' onClick={()=>handleEdit(post.id)}> Submit</button>

      </form>

      </>

    }
    {!editTitle &&
      <>
      <h2>Post not found</h2>
      <p>
        well,that's dissappointing.
      </p>
      <p>
        <Link to={'/'}> visit our homepage</Link>
      </p>
      </>
    
    }
     
   </main>
  )
}

export default EditPost