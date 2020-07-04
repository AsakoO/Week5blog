class APIClientMs {
  constructor() {
    this.blogs = [];
  }

  getBlogs() {
    return fetch('http://localhost:3000/blogs').then(response => response.json())
  }

  createBlog(blog) {
    return fetch('http://localhost:3000/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: blog })
    })
  }
  editBlog(blogId, blog) {
    return fetch(`http://localhost:3000/blogs/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({ title: blog })
    })
  }
  deleteBlog(blogId) {
    return fetch(`http://localhost:3000/blogs/${blogId}`, { method: 'DELETE' })
  }
}

export default APIClientMs;
