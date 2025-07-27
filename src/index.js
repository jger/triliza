import { AppRegistry } from 'react-native-web';
import App from './App';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';

AppRegistry.registerComponent('triliza', () => App);
AppRegistry.runApplication('triliza', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
