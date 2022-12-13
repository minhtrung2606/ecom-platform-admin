import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom';
import { store } from './redux_store';
import { routers } from './routes';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={routers} />
      </Provider>
    </div>
  );
}

export default App;
