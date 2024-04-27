import React from 'react'
import { Link, useParams } from 'react-router-dom'
// import EditPost from './EditPost';

const Postpage = ({posts,handledelete}) => {
  const {id} = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  // const navigate = useNavigate();

//  const handleEditClick = () => {
//   navigate(`/edit/${post.id}`);
//  }

  return (
   <main className='PostPage'>
      
    <article className='post'>
    {post && 
    <>
      <h2>{post.title} </h2>
        <p className='postDate'> {post.datetime} </p>
        <p className='postBody'> {post.body} </p>
            <Link to={`/edit/${post.id}`}><button>EditPost</button></Link>
        <button onClick={()=>handledelete(post.id)} className='deleteButton'>Deletepost</button>
    </>
    } 
    {!post &&
    <>
    <h2>Page not Found</h2>
    <p>Well,that's disapointing</p>
    <p>  <Link to={'/'}>visit our homepage </Link></p>
    </>
    }
    </article>
   </main>
  ) 
}

export default Postpage