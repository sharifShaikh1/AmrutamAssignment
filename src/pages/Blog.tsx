import React from 'react'

const Blog: React.FC = () => {
  return (
    <div className="page blog">
      <section className="section">
        <h2>Blog</h2>
        <p>Latest articles and updates from the team.</p>
        <div className="posts">
          {[1,2,3].map((n)=> (
            <article key={n} className="card post">
              <h4>Post title {n}</h4>
              <p>Short excerpt to encourage clicking through.</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Blog
