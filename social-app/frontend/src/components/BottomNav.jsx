import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

export default function BottomNav() {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, borderTop: '1px solid #eee' }} elevation={3}>
      <BottomNavigation
        showLabels
        value={2} // "Social" is index 2
        sx={{
          '& .Mui-selected': {
            color: '#0066ff',
          },
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 0',
          }
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon />} />
        <BottomNavigationAction label="Tasks" icon={<AssignmentOutlinedIcon />} />
        <BottomNavigationAction 
          label="Social" 
          icon={
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: -15, left: -20, right: -20, bottom: -5, backgroundColor: 'white', borderRadius: '50% 50% 0 0', borderTop: '2px solid #eee' }}></div>
              <LanguageIcon sx={{ position: 'relative', zIndex: 1, fontSize: 32 }} />
            </div>
          } 
        />
        <BottomNavigationAction label="Leader Board" icon={<EmojiEventsOutlinedIcon />} />
        <BottomNavigationAction label="Chat" icon={<ChatBubbleOutlineOutlinedIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
