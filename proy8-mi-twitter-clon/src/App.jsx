import {Outlet} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import {Navigation} from './components/Navigation.jsx';
import {AuthProvider} from './context/AuthContext.jsx';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg--100">
        <Navigation />
        <main className="flex justify-center py-4">
            <AnimatePresence mode="wait"><Outlet/></AnimatePresence>
        </main>
        
        <footer className="bg-white border-t border-gray-200 py-6 mt-12 text-center text-gray-500 text-sm">
          <p>MiniX - Clon educativo de Twitter con React Hooks</p>
        </footer>
      </div>
    </AuthProvider>
  );
}