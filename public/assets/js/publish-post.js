const show_new_post = async (e) => {
  e.preventDefault();
  e.target.setAttribute('disabled','true');
  const post_container = document.querySelector('#post_container');
  const edit_box = document.createElement('div');
  edit_box.setAttribute('class','p-3 mb-3 bg-light border border-dark border-2 rounded edit-box');
  const title_box_label = document.createElement('p');
  title_box_label.textContent = 'Title:';
  title_box_label.setAttribute('class','fw-bold');
  const title_box = document.createElement('input');
  title_box.setAttribute('type','text');
  title_box.setAttribute('class','form-control mb-3');
  title_box.setAttribute('id','title-box');
  const content_box_label = document.createElement('p');
  content_box_label.textContent = 'Content:';
  content_box_label.setAttribute('class','fw-bold');
  const content_box = document.createElement('textarea');
  content_box.setAttribute('class','form-control mb-3');
  content_box.setAttribute('id','content-box');
  const button_box = document.createElement('div');
  const cancel_button = document.createElement('button');
  cancel_button.setAttribute('class','me-1 btn btn-secondary');
  cancel_button.textContent = "Cancel";
  cancel_button.addEventListener('click',cancel_new_post);
  button_box.append(cancel_button);
  const submit_button = document.createElement('button');
  submit_button.setAttribute('class','ms-1 btn btn-dark');
  submit_button.textContent = "Publish";
  submit_button.addEventListener('click',save_new_post);
  button_box.append(submit_button);
  const err_box = document.createElement('p');
  err_box.setAttribute('class','text-danger m-0 pt-2');
  err_box.setAttribute('id','err');
  edit_box.append(title_box_label,title_box,content_box_label,content_box,button_box,err_box);
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