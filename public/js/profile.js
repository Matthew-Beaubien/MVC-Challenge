const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-desc').value.trim();
  
    const user_id = document.querySelector('#user-id').value;
  
    if (title && content) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, content, user_id }), 
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const buttonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const action = event.target.getAttribute('data-action');
  
      if (action === 'delete') {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          location.reload();
        } else {
          alert('Failed to delete post');
        }
      } else if (action === 'edit') {
        document.location.href = `/edit-post/${id}`;
      }
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.post-list')
    .addEventListener('click', buttonHandler);
  
  document
    .querySelector('#edit-post-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const title = document.querySelector('#edit-post-title').value.trim();
      const content = document.querySelector('#edit-post-content').value.trim();
  
      const postId = window.location.pathname.split('/').pop();
  
      if (title && content) {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          document.location.replace(`/post/${postId}`);
        } else {
          alert('Failed to update post');
        }
      }
    });