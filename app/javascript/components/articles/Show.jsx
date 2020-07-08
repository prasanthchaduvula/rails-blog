import React from "react";

class Show extends React.Component {
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
    const { article, user, logged_in, current_user } = this.props;
    return (
      <div className="container my-5 list-unstyled">
        <div className="d-flex my-5 justify-content-center">
          <div className="col-8">
            <h3>{article.title}</h3>
            <div className="d-flex mt-3">
              <li>
                <a href={`/users/${user.id}`} className="pr-3 text-info">
                  <span>wriiten by: </span>
                  {user.name}
                </a>
              </li>
              {logged_in &&
              (current_user.id == article.user_id || current_user.admin) ? (
                <div className="d-flex ">
                  <li>
                    <a
                      href={`/articles/${article.id}/edit`}
                      className="pr-3 text-warning"
                    >
                      Edit
                    </a>
                  </li>
                  <li onClick={(e) => this.handleDelete(e, article.id)}>
                    <a href="" className="pr-3 text-danger">
                      Delete
                    </a>
                  </li>
                </div>
              ) : (
                ""
              )}
            </div>
            <p className="pt-3">{article.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
