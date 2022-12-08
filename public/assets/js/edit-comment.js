// This code dynamically generates HTML content
// so that the comment editor interface is available
// without the need to reload the page.
//
// Thus, there are several methods defined.

const show_edits = async (e) => {
  e.preventDefault();
  const link_box = e.target.parentElement;
  const comment_box = link_box.parentElement;
  const comment_content = comment_box.querySelector('.comment-content').textContent.trim();
  const view_ui = comment_box.querySelectorAll('.comment-content,.comment-signature,.edit,.delete');
  view_ui.forEach((el,i) => el.setAttribute('style','display:none;'));
  const edit_box = document.createElement('textarea');
  edit_box.setAttribute('class','form-control mb-2 edit-box');
  edit_box.textContent = comment_content;
  comment_box.prepend(edit_box);
  const cancel = document.createElement('a');
  cancel.setAttribute('class','pe-2 link-dark cancel');
  cancel.setAttribute('data-comment-id',e.target.getAttribute('data-comment-id'));
  cancel.setAttribute('href','');
  cancel.textContent = 'cancel';
  cancel.addEventListener('click',cancel_edits);
  link_box.append(cancel);
  const save = document.createElement('a');
  save.setAttribute('class','link-dark save');
  save.setAttribute('data-comment-id',e.target.getAttribute('data-comment-id'));
  save.setAttribute('href','');
  save.textContent = 'save';
  save.addEventListener('click',save_edits);
  link_box.append(save);
}

const cancel_edits = (e) => {
  e.preventDefault();
  const link_box = e.target.parentElement;
  const comment_box = link_box.parentElement;
  comment_box.querySelector('.edit-box').remove();
  link_box.querySelector('.cancel').remove();
  link_box.querySelector('.save').remove();
  const view_ui = comment_box.querySelectorAll('.comment-content,.comment-signature,.edit,.delete');
  view_ui.forEach((el,i) => el.setAttribute('style',''));
}

const save_edits = async (e) => {
  e.preventDefault();
  const save_id = e.target.getAttribute('data-comment-id');
  const form_data = {
    content: e.target.parentElement.parentElement.querySelector('.edit-box').value.trim()
  }
  const response = await fetch('/api/comments/'+save_id, {
    method: 'PUT',
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
    const response_json = await response.json();
    alert(`${response.status}: ${response.statusText}\n${response_json.message}`);
  }
}

const edits = document.querySelectorAll('.edit');
edits.forEach((el,i) => el.addEventListener('click',show_edits));