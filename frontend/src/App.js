import './App.css';
import { AuthProvider } from './context/AuthProvider';
import Routes from './routes/Routes';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </div>
  );
}

export default App;
