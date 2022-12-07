const helpers = {
  build_post_edit_box: (title, cancel_string, cancel_function, submit_string, submit_function) => {
    const edit_box = document.createElement('div');
    edit_box.setAttribute('class','p-3 mb-3 bg-light border border-dark border-2 rounded edit-box');
    const title_element = document.createElement('h5');
    title_element.textContent = title;
    title_element.setAttribute('class','pb-2 fw-bold');
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
    cancel_button.textContent = cancel_string;
    cancel_button.addEventListener('click',cancel_function);
    button_box.append(cancel_button);
    const submit_button = document.createElement('button');
    submit_button.setAttribute('class','ms-1 btn btn-dark');
    submit_button.textContent = submit_string;
    submit_button.addEventListener('click',submit_function);
    button_box.append(submit_button);
    const err_box = document.createElement('p');
    err_box.setAttribute('class','text-danger m-0 pt-2');
    err_box.setAttribute('id','err');
    edit_box.append(title_element,title_box_label,title_box,content_box_label,content_box,button_box,err_box);
    return edit_box;
  }
}