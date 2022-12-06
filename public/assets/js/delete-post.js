const delete_comment = async (e) => {
  e.preventDefault();
  const delete_id = e.target.getAttribute('data-post-id');
  const response = await fetch('/api/posts/'+delete_id, {
    method: 'DELETE'
  });
  if (response.ok) {
    document.location.reload();
  } else if (response.status == 404) {
    document.location.replace('/404');
  } else {
    const response_json = await response.json();
    alert(`${response.status}: ${response.statusText}\n${response_json.message}`);
  }
}

const deletes = document.querySelectorAll('.delete');
deletes.forEach((el,i) => el.addEventListener('click',delete_comment));