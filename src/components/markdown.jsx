import React from 'react';
import Markdown from 'react-markdown';
import breaks from 'remark-breaks';

export default props => <Markdown {...props} plugins={[breaks]} />;
