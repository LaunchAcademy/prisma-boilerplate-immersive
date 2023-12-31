import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import "../assets/scss/main.scss";
import getCurrentUser from "../services/getCurrentUser";

import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import AlbumDetails from "./albums/AlbumDetails";
import AlbumsList from "./albums/AlbumList";
import NewAlbumForm from "./albums/NewAlbumForm";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import SongsList from "./songs/SongsList";
import TopBar from "./layout/TopBar";
import UserMessage from "./messages/UserMessage";
import UserProfile from "./users/UserProfile";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={AlbumsList} />
        <Route exact path="/albums" component={AlbumsList} />
        <AuthenticatedRoute
          exact={true}
          path="/albums/new"
          component={NewAlbumForm}
          user={currentUser}
        />
        <Route exact path="/albums/:id">
          <AlbumDetails user={currentUser} />
        </Route>
        <Route exact path="/songs" component={SongsList} />

        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />

        <AuthenticatedRoute
          exact={true}
          path="/users/:id/messages"
          component={UserMessage}
          user={currentUser}
        />
        <AuthenticatedRoute
          exact={true}
          path="/users/:id"
          component={UserProfile}
          user={currentUser}
        />
      </Switch>
    </Router>
  );
};

export default hot(App);
