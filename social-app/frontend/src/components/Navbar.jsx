import { useContext } from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, Badge, Chip, IconButton } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../App';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid #f0f0f0' }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
          Social
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label={<span><span style={{ color: 'red', fontWeight: 'bold' }}>348</span> ⭐</span>} 
            size="small" 
            sx={{ bgcolor: '#fff5f5', border: '1px solid #ffe5e5', borderRadius: 4 }} 
          />
          <Chip 
            label="₹0.00" 
            size="small" 
            sx={{ bgcolor: '#f0fff4', color: '#38a169', border: '1px solid #c6f6d5', borderRadius: 4, fontWeight: 'bold' }} 
          />
          <IconButton size="small">
            <Badge variant="dot" color="error">
              <NotificationsNoneIcon sx={{ color: '#666' }} />
            </Badge>
          </IconButton>
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar 
              sx={{ width: 35, height: 35, bgcolor: '#0052cc', border: '2px solid #38a169', p: 0.5 }}
            >
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </Avatar>
            <IconButton size="small" onClick={logout} title="Logout">
              <LogoutIcon sx={{ color: '#d32f2f' }} />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
      <Toolbar sx={{ pt: 0, pb: 1, minHeight: 'auto' }}>
         <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', bgcolor: '#f0f2f5', borderRadius: 6, px: 2, py: 0.5 }}>
              <Typography color="text.secondary" variant="body2">Search promotions, users,</Typography>
            </Box>
            <IconButton sx={{ bgcolor: '#0066ff', color: 'white', '&:hover': { bgcolor: '#0052cc' } }}>
               <SearchIcon />
            </IconButton>
            <IconButton sx={{ bgcolor: '#f0f2f5' }}>
               <DarkModeIcon sx={{ color: '#666' }} />
            </IconButton>
         </Box>
      </Toolbar>
    </AppBar>
  );
}
