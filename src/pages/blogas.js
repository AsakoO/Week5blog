import APIClientMs from '../services/APIClientMs';
import './blogas.css';

class BlogList {
  constructor() {
    this.list = document.querySelector('#blog-list ul');
    this.form = document.forms['add-blog'];
    this.addInput = document.forms['add-blog'].querySelector('input[type="text"]');
    this.APIClientMs = new APIClientMs();
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    this.list.addEventListener('click', this.onDeleteButtonClick.bind(this));
    this.list.addEventListener('click', this.onEditButtonClick.bind(this));
    this.form.addEventListener('submit', this.onSubmit.bind(this));
  }

  onDeleteButtonClick(e) {
    if (e.target.className == 'delete') {
      const blogId = e.target.dataset.id;
      this.APIClientMs.deleteBlog(blogId);
      this.render();
    }
  }

  async onEditButtonClick(e) {
    if (e.target.className == 'edit') {
      const blogId = e.target.dataset.id;
      const { value } = this.addInput;
      await this.APIClientMs.editBlog(blogId, value);
      this.render();
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    const { value } = this.addInput;
    await this.APIClientMs.createBlog(value);
    this.render();
  }


  async render() {
    const blogs = await this.APIClientMs.getBlogs();
    let lis = '';
    blogs.forEach((blog) => lis += `<li><span class="name">${blog.title}</span><span class="delete" data-id=${blog.id}>delete</span><span class="edit" data-id=${blog.id}>edit</span></li>`);
    this.list.innerHTML = lis;
  }
}

const blogList = new BlogList();
