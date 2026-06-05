import { useState, useContext } from 'react';
import { Container, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../App';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? `${API_URL}/auth/login` : `${API_URL}/auth/signup`;
      const res = await axios.post(endpoint, formData);
      login(res.data.user, res.data.token);
    } catch (err) {
      alert(err.response?.data?.error || 'Error occurred');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {isLogin ? 'Login' : 'Sign Up'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            {!isLogin && (
              <TextField fullWidth label="Username" margin="normal"
                onChange={e => setFormData({ ...formData, username: e.target.value })} required />
            )}
            <TextField fullWidth label="Email" type="email" margin="normal"
              onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            <TextField fullWidth label="Password" type="password" margin="normal"
              onChange={e => setFormData({ ...formData, password: e.target.value })} required />
            <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </Box>
          <Button fullWidth onClick={() => setIsLogin(!isLogin)} sx={{ mt: 1 }}>
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
