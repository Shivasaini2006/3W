import { useState, useContext } from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, Typography, IconButton, Box, Button, TextField, Collapse } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import axios from 'axios';
import { AuthContext } from '../App';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function PostCard({ post, onUpdate }) {
  const { user } = useContext(AuthContext);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const isLiked = post.likes.some(like => like.userId === user?._id);

  const getTimeAgo = (dateStr) => {
    const diff = Math.floor((new Date() - new Date(dateStr)) / 1000);
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff/60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)} hours ago`;
    return `${Math.floor(diff/86400)} days ago`;
  };

  const handleLike = async () => {
    try {
      await axios.put(`${API_URL}/posts/${post._id}/like`);
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await axios.post(`${API_URL}/posts/${post._id}/comment`, { text: commentText });
      setCommentText('');
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card elevation={0} sx={{ mb: 2, borderRadius: 4, bgcolor: 'white', border: '1px solid #f0f0f0' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#0052cc', width: 48, height: 48 }}>
            {post.username[0].toUpperCase()}
          </Avatar>
        }
        action={
          <Button variant="contained" size="small" sx={{ bgcolor: '#0066ff', borderRadius: 20, textTransform: 'none', fontWeight: 'bold', mt: 1, mr: 1 }}>
            Follow
          </Button>
        }
        title={
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" fontSize="1.1rem" sx={{ color: '#333' }}>
              {post.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{post.username.toLowerCase()}
            </Typography>
          </Box>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            {getTimeAgo(post.createdAt)}
          </Typography>
        }
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ pt: 1, pb: 1 }}>
        {post.text && (
          <Typography variant="body1" sx={{ color: '#333', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
            {post.text}
          </Typography>
        )}
        {post.image && (
          <Box sx={{ mt: 2, borderRadius: 3, overflow: 'hidden' }}>
            <img src={post.image} alt="post" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', display: 'block' }} />
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 3, py: 1.5, borderTop: '1px solid #f9f9f9' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#666' }}>
          <IconButton onClick={handleLike} size="small" sx={{ color: isLiked ? '#f91880' : 'inherit', mr: 0.5 }}>
            {isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderOutlinedIcon fontSize="small" />}
          </IconButton>
          <Typography variant="body2">{post.likes.length}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#666' }}>
          <IconButton onClick={() => setShowComments(!showComments)} size="small" color="inherit" sx={{ mr: 0.5 }}>
            <ChatBubbleOutlineOutlinedIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{post.comments.length}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', color: '#666' }}>
          <IconButton size="small" color="inherit" sx={{ mr: 0.5 }}>
            <ShareOutlinedIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">0</Typography>
        </Box>
      </CardActions>
      
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0, bgcolor: '#f9f9f9', borderTop: '1px solid #eee' }}>
          <Box sx={{ maxHeight: 200, overflowY: 'auto', mb: 2, mt: 2 }}>
            {post.comments.map((comment, i) => (
              <Box key={i} sx={{ mb: 1.5 }}>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#333' }}>{comment.username}</Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>{comment.text}</Typography>
              </Box>
            ))}
            {post.comments.length === 0 && <Typography variant="body2" color="text.secondary">No comments yet.</Typography>}
          </Box>
          <Box component="form" onSubmit={handleComment} sx={{ display: 'flex', gap: 1 }}>
            <TextField fullWidth size="small" placeholder="Write a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} sx={{ bgcolor: 'white', borderRadius: 1 }} />
            <Button type="submit" variant="contained" size="small" disabled={!commentText.trim()} sx={{ borderRadius: 2 }}>Send</Button>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
