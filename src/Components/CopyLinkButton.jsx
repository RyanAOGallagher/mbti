import React from 'react';

function CopyLinkButton() {
  const linkToCopy = 'https://example.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <button onClick={copyToClipboard}>
      Copy Link
    </button>
  );
}

export default CopyLinkButton;
