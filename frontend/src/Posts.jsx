// PostList.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List, ListItem, ListItemText } from '@mui/material'

const PostList = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // Fetch posts from Strapi API
    axios.get('http://localhost:1337/api/posts').then((response) => {
      setPosts(response.data.data)
    })
  }, [])

  return (
    <List>
      {posts.map((post) => (
        <ListItem key={post.id}>
          <ListItemText primary={post.title} />
        </ListItem>
      ))}
    </List>
  )
}

export default PostList
