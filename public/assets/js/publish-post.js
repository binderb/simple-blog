const show_new_post = async (e) => {
  e.preventDefault();
  e.target.setAttribute('disabled','true');
  const post_container = document.querySelector('#post_container');
  const edit_box = helpers.build_post_edit_box("New Post","Cancel",cancel_new_post,"Publish",save_new_post);
  post_container.prepend(edit_box);
}

const cancel_new_post = (e) => {
  e.preventDefault();
  const edit_box = document.querySelector('.edit-box');
  edit_box.remove();
  const new_post_button = document.querySelector('#new_post');
  new_post_button.removeAttribute('disabled');
}

const save_new_post = async (e) => {
  e.preventDefault();
  const form_data = {
    title: document.querySelector('#title-box').value.trim(),
    content: document.querySelector('#content-box').value.trim()
  }
  const response = await fetch('/api/posts/', {
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

document.querySelector('#new_post').addEventListener('click',show_new_post);