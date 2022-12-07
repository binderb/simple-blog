const save_updates = async (e) => {
  e.preventDefault();
  const form_data = {
    title: document.querySelector('#title-box').value.trim(),
    content: document.querySelector('#content-box').value.trim()
  }
  const update_id = e.target.getAttribute('data-post-id');
  const response = await fetch('/api/posts/'+update_id, {
    method: 'PUT',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(form_data)
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else if (response.status == 404) {
    document.location.replace('/404');
  } else {
    const response_json = await response.json();
    alert(`${response.status}: ${response.statusText}\n${response_json.message}`);
  }
}

document.querySelector('#update').addEventListener('click',save_updates);