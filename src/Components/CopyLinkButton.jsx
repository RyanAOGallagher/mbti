import React from 'react';

function CopyLinkButton() {
  const linkToCopy = 'https://example.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        // You can handle the success case
        alert('Link copied to clipboard!');
      })
      .catch(err => {
        // You can handle the error case
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
