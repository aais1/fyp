import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Navbar() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await fetch('import.meta.VITE_BACKEND_URL/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      navigate('/');
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <div className="absolute top-4 right-4 md:h-12">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        {/* Dropdown Menu */}
        <DropdownMenuContent align="end" side="bottom">
          <DropdownMenuItem>Settings</DropdownMenuItem>

          <DropdownMenuItem>
            <Link to="/profile">Profille</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
