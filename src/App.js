import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';

import { AuthProvider } from './context/auth';
import AuthRoute, { PrivateRoute } from './util/AuthRoute';
import { Transition, TransitionGroup } from 'react-transition-group';
import { play, exit } from './helpers/timelines'
import './App.css';
// import MenuBar from './components/MenuBar';
// import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import MainHome from './pages/MainHome';
import NewHome from './pages/NewHome';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route render={({ location }) => {
          const { pathname, key } = location;

          return (
            <TransitionGroup component={null}>
              <Transition
                key={key}
                appear={true}
                onEnter={(node, appears) => play(pathname, node, appears)}
                onExit={(node, appears) => exit(node, appears)}
                timeout={{ enter: 100 }}
              >
                <Switch>
                  {/* <MenuBar /> */}
                  <Route exact path="/" component={MainHome} />
                  {/* <Route exact path="/main" component={NewHome} /> */}
                  <PrivateRoute exact path="/home" component={NewHome} />
                  <AuthRoute exact path="/login" component={Login} />
                  <AuthRoute exact path="/register" component={Register} />
                  <PrivateRoute exact path="/posts/:postId" component={SinglePost} />
                </Switch>
              </Transition>
            </TransitionGroup>
          )
        }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
