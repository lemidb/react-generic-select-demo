import React from 'react';
import ReactMarkdown from 'react-markdown';

// The markdown string for the npm version badge
const badgeMarkdown = `[![npm version](https://img.shields.io/npm/v/react-generic-select)](https://www.npmjs.com/package/react-generic-select)`;

const BadgeComponent: React.FC = () => {
  return (
    <div>
      <ReactMarkdown>
        {badgeMarkdown}
      </ReactMarkdown>
    </div>
  );
};

export default BadgeComponent;