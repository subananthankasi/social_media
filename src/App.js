
import './App.css';
import Home from './Home';
import About from './About';
import Postpage from './Postpage';
import Newpost from './Newpost';
import Missing from './Missing';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Route, Routes, useNavigate } from 'react-router-dom';
import api from './api/posts'

function App() {
  const [posts,setPosts] = useState([])
  const [search,setSearch] = useState('')
  const [searchresult,setSearchresult] = useState([])
  const [postTitle,setPostTitle] = useState('')
  const [postBody,setPostBody] = useState('')
  const navigate = useNavigate()
  const navigate1 =useNavigate()

  useEffect(()=>{
    const fetchposts = async () => {
      try{
        const response =  await api.get('/posts')
        setPosts(response.data)

      }
      catch (err) {
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
        else{
       console.log(`Error:${err.message}`);
        }
        
      }
    }
    fetchposts() 
  },[]) 

  useEffect(()=>{
    const filteredResult = posts.filter((post)=>((post.body).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
  || ((post.title).toLocaleLowerCase()).includes(search.toLocaleLowerCase()))

  setSearchresult(filteredResult.reverse())
  },[posts,search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length?posts[posts.length-1].id+1:1
    const datetime = format(new Date(),'MMMM dd,yyyy pp')
    const newPost = {id,title:postTitle,datetime,body:postBody};
    try{
    const response = await api.post('/posts',newPost)
    const allPosts = [...posts,response.data]
    setPosts(allPosts);
    setPostTitle('')
    setPostBody('')
    navigate ('/')
    } 
    catch (err) {
     console.log(`Error:${err.message}`);
    }
  }
  const handledelete = async (id) => {
    try{
      await api.delete(`posts/${id}`)
     const postsList = posts.filter((post)=>post.id!==id)
     setPosts(postsList)
     navigate1('/')
    }
    catch (err) {
      console.log(`Error:${err.message}`);
     }
  } 
  return (
   <>
   <div className='App'>
      <Header title='Nanthan Social Media'/>
      <Nav
      search={search}
      setSearch={setSearch}
          />
          <Routes>
            <Route path='/' element={ <Home posts={searchresult}/>}/>
            <Route path='/post'>
            <Route index element={ <Newpost 
                                 postTitle={postTitle}
                                 setPostTitle={setPostTitle}
                                 postBody={postBody}
                                 setPostBody={setPostBody}
                                handleSubmit={handleSubmit}
      />} />
      <Route path=':id' element={<Postpage posts={posts} handledelete={handledelete} />} />
      </Route>
            <Route path='/about' element={<About/>} />
            <Route path='*' element={<Missing/>} />
          </Routes>
      <Footer/>

      </div>
   </>
  );
}

export default App;
