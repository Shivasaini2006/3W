import { useState } from 'react';
import { Card, Box, TextField, Button, IconButton, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function CreatePost({ onPostCreated }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [tab, setTab] = useState('all');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1048576) { // 1MB limit
        alert("Image is too large! Please choose an image smaller than 1MB to avoid slowing down your database.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !image) return;
    try {
      await axios.post(`${API_URL}/posts`, { text, image });
      setText('');
      setImage('');
      onPostCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card elevation={0} sx={{ borderRadius: 4, mb: 2, bgcolor: 'white', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">Create Post</Typography>
        <ToggleButtonGroup
          value={tab}
          exclusive
          onChange={(e, val) => val && setTab(val)}
          size="small"
          sx={{ bgcolor: '#f0f2f5', borderRadius: 20, p: 0.5, '& .MuiToggleButton-root': { border: 'none', borderRadius: '20px !important', px: 2, textTransform: 'none', fontWeight: 'bold' }, '& .Mui-selected': { bgcolor: '#0066ff !important', color: 'white !important' } }}
        >
          <ToggleButton value="all">All Posts</ToggleButton>
          <ToggleButton value="promo" sx={{ color: '#666' }}>Promotions</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          minRows={2}
          placeholder="What's on your mind?"
          variant="standard"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2, '& .MuiInputBase-root': { fontSize: '1.1rem', color: '#333' } }}

        />
        {image && (
          <Box sx={{ mb: 2, position: 'relative' }}>
            <img src={image} alt="preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }} />
            <Button size="small" color="error" variant="contained" sx={{ position: 'absolute', top: 8, right: 8, minWidth: 30 }} onClick={() => setImage('')}>X</Button>
          </Box>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', pt: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, color: '#0066ff' }}>
            <IconButton color="inherit" component="label" size="small">
              <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
              <PhotoCameraOutlinedIcon />
            </IconButton>
            <IconButton color="inherit" size="small"><SentimentSatisfiedOutlinedIcon /></IconButton>
            <IconButton color="inherit" size="small"><MenuOutlinedIcon /></IconButton>
            <Button startIcon={<CampaignOutlinedIcon />} sx={{ color: '#0066ff', textTransform: 'none', fontWeight: 'bold' }}>
              Promote
            </Button>
          </Box>
          <Button 
            type="submit" 
            variant="contained" 
            endIcon={<SendIcon />}
            disabled={!text && !image} 
            sx={{ borderRadius: 20, bgcolor: text || image ? '#a3b8cc' : '#e0e0e0', color: 'white', textTransform: 'none', px: 3, boxShadow: 'none' }}
          >
            Post
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
