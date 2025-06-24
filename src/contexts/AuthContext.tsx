import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  JSX,
  useContext,
} from 'react';

// ✅ Define Auth Context Type
interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
}

// ✅ Create Auth Context (Avoid `null` by using a default value)
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

// ✅ Correct Return Type: `JSX.Element`
export const AuthContextProvider = ({
  children,
}: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<any>(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null; // Parse stored JSON
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user)); // ✅ Store user in sessionStorage
    } else {
      sessionStorage.removeItem('user'); // ✅ Remove if logged out
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return { ...context };
};
