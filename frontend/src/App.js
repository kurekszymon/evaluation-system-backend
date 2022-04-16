import { Route } from 'react-router';
import './App.css';

import Home from './pages/Home/Home.page';
import Test from './pages/Overview/Overview';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/*/overview" component={Test} />
    </div>
  );
}

export default App;
