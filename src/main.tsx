import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {store} from './redux/store/store.ts';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
} else {
  console.error("Элемент с идентификатором 'root' не найден в документе.");
}
