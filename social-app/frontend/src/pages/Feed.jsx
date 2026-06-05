import { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, IconButton, Fab, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      if (posts.length === 0) setLoading(true);
      const res = await axios.get(`${API_URL}/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box sx={{ pb: 8, bgcolor: '#f0f2f5', minHeight: '100vh' }}>
      <Container maxWidth="sm" sx={{ pt: 2 }}>
        <CreatePost onPostCreated={fetchPosts} />
        
        {/* Filter Tabs */}
        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', mb: 2, pb: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
          <Button 
            variant="contained" 
            sx={{ borderRadius: 20, bgcolor: filter === 'all' ? '#0066ff' : 'white', color: filter === 'all' ? 'white' : '#666', boxShadow: 'none', border: filter === 'all' ? 'none' : '1px solid #ddd', minWidth: 'auto', px: 3, textTransform: 'none', fontWeight: 'bold' }}
            onClick={() => setFilter('all')}
          >
            All Post
          </Button>
          <Button 
            variant="contained" 
            sx={{ borderRadius: 20, bgcolor: filter === 'foryou' ? '#0066ff' : 'white', color: filter === 'foryou' ? 'white' : '#666', boxShadow: 'none', border: filter === 'foryou' ? 'none' : '1px solid #ddd', minWidth: 'auto', px: 3, textTransform: 'none', fontWeight: 'bold', whiteSpace: 'nowrap' }}
            onClick={() => setFilter('foryou')}
          >
            For You
          </Button>
          <Button 
            variant="contained" 
            sx={{ borderRadius: 20, bgcolor: filter === 'mostliked' ? '#0066ff' : 'white', color: filter === 'mostliked' ? 'white' : '#666', boxShadow: 'none', border: filter === 'mostliked' ? 'none' : '1px solid #ddd', minWidth: 'auto', px: 3, textTransform: 'none', fontWeight: 'bold', whiteSpace: 'nowrap' }}
            onClick={() => setFilter('mostliked')}
          >
            Most Liked
          </Button>
          <Button 
            variant="contained" 
            sx={{ borderRadius: 20, bgcolor: filter === 'mostcommented' ? '#0066ff' : 'white', color: filter === 'mostcommented' ? 'white' : '#666', boxShadow: 'none', border: filter === 'mostcommented' ? 'none' : '1px solid #ddd', minWidth: 'auto', px: 3, textTransform: 'none', fontWeight: 'bold', whiteSpace: 'nowrap' }}
            onClick={() => setFilter('mostcommented')}
          >
            Most Commented
          </Button>
        </Box>

        {/* Feed */}
        <Box>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : posts.length === 0 ? (
            <Typography align="center" color="textSecondary" sx={{ mt: 4 }}>No posts yet. Be the first to post!</Typography>
          ) : (
            posts.map(post => (
              <PostCard key={post._id} post={post} onUpdate={fetchPosts} />
            ))
          )}
        </Box>
        
        {/* Floating Action Button (Dummy for design) */}
        <Fab color="primary" sx={{ position: 'fixed', bottom: 70, right: 20, bgcolor: '#0066ff' }}>
          <AddIcon />
        </Fab>
      </Container>
    </Box>
  );
}
