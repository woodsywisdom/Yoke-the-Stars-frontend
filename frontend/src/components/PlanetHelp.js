
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  actionsBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  dashboardBox: {
    display: 'flex',
    height: '100vh',
    paddingTop: '6vh',
  },
  categoryList: {
    paddingTop: "64px",
  },
  drawer: {
    width: "250px",
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  corkBoard: {
    flexGrow: 1,
  }
});

const Help = () => {
  const classes = useStyles();

  return (
    <Card className={classes.helpCard} >
      <CardContent>
        <Typography >How to use: Just start typing!  Every note automatically includes the current session's tag, but you can add existing or new tags by just adding a '#' at the beginning of its name! (Avoid puntuation like apostrophes and commas.  Hyphens are cool though)</Typography>
      </CardContent>
    </Card>
  );
}

export default Help;