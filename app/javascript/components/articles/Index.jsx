import React from "react";

class Index extends React.Component {
  handleDelete = (e, id) => {
    e.preventDefault();
    fetch(`/articles/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.notice) {
          window.location.href = `/articles/`;
        }
        if (data.errors) {
          alert("delete failed");
        }
      });
  };

  render() {
    let { articles } = this.props;
    return (
      <div className="container py-5 list-unstyled">
        {articles.map(({ article, name, current_user, logged_in }, index) => (
          <div className="d-flex align-items-baseline mt-5">
            <h5>{index + 1}.</h5>
            <div className="ml-3">
              <h5 key={article.id}>
                <a href={`/articles/${article.id}`} className="fs-2">
                  {article.title}
                </a>
              </h5>
              <div className="d-flex mt-2">
                <li>
                  <a
                    href={`/users/${article.user_id}`}
                    className="pr-3 text-info"
                  >
                    <span>wriiten by: </span>
                    {name}
                  </a>
                </li>
                <li>
                  <a
                    href={`/articles/${article.id}`}
                    className="pr-3 text-success"
                  >
                    Show
                  </a>
                </li>
                {logged_in &&
                (current_user.id == article.user_id || current_user.admin) ? (
                  <div className="d-flex ">
                    <li key={article.id}>
                      <a
                        href={`/articles/${article.id}/edit`}
                        className="pr-3 text-warning"
                      >
                        Edit
                      </a>
                    </li>
                    <li
                      key={article.id}
                      onClick={(e) => this.handleDelete(e, article.id)}
                    >
                      <a href="" className="pr-3 text-danger">
                        Delete
                      </a>
                    </li>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Index;
