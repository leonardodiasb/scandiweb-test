import { Provider } from 'react-redux';
import store from './redux/configureStore';
import './App.css';

function App() {
  return (
    <>
      <Provider store={store} />
    </>
  );
}

export default App;
