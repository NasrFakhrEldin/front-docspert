import React from 'react';

const PageContent = ({ page }) => {
  const content = page.results[0]
  return (
    <div className="page-frame">
      {page.count ? (
        <div>
          <h2>Page {content.number}</h2>
          <p>{content.content}</p>
        </div>
      ) : (
        <p>No pages yet</p>
      )}
    </div>
  );
};

export default PageContent;
