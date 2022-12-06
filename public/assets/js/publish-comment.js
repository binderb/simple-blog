const publish_comment = async (e) => {
  e.preventDefault();
  const form_data = {
    post_id: document.querySelector('#comment-form').getAttribute('data-post-id'),
    content: document.querySelector('#content').value.trim()
  }
  const response = await fetch('/api/comments/', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(form_data)
  });
  if (response.ok) {
    document.location.reload();
  } else if (response.status == 404) {
    document.location.replace('/404');
  } else {
    const response_data = await response.json();
    document.querySelector('#err').textContent = response_data.message;
  }
}

document.querySelector('#comment-form').addEventListener('submit',publish_comment);