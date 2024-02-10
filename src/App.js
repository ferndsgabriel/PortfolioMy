import './App.css';
import { RoutesApp } from './routes';
import {AuthProvider} from "./middleware/authLogin";
import { ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RoutesApp/>
      </AuthProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
    </div>
  );
}

export default App;
