import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import nest from 'recompose/nest';

export default Component =>
	nest(props => <Router>{props.children}</Router>, Component);
