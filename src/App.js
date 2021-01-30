import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Header  from "./components/header";
import Grid from "@material-ui/core/Grid";
import dashboard from "./pages/dashboard";



function App() {
  const [value, setValue] = useState(0);

  return (
      <BrowserRouter>
        <Grid container direction={"column"}>
          <Grid item>
            <Header value={value} setValue={setValue}/>
          </Grid>
          <Grid item>
            <Switch>
              <Route exact path="/" component={dashboard}/>
              <Route exact path="/home" component={dashboard}/>

            </Switch>
          </Grid>
        </Grid>
      </BrowserRouter>
  );
}

export default App;
