import React from "react";

class Show extends React.Component {
  handleDelete = (e, id) => {
    e.preventDefault();
    fetch(`/users/${id}`, {
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
    const { articles, user, logged_in, current_user } = this.props;
    return (
      <div className="container py-5 list-unstyled">
        <h5 className="mt-5">Profile page</h5>
        <div className="d-flex align-items-baseline mt-2">
          <h4>
            <a href={`/users/${user.id}`} className="fs-2 pr-3">
              {user.name}
            </a>
          </h4>
          <div className="d-flex mt-2">
            {logged_in && (current_user.id == user.id || current_user.admin) ? (
              <div className="d-flex ">
                <li>
                  <a
                    href={`/users/${user.id}/edit`}
                    className="pr-3 text-warning"
                  >
                    Edit Profile
                  </a>
                </li>
                <li onClick={(e) => this.handleDelete(e, user.id)}>
                  <a href="" className="pr-3 text-danger">
                    Delete Profile
                  </a>
                </li>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {articles.map((article, index) => (
          <div className="d-flex align-items-baseline mt-5" key={index}>
            <h5>{index + 1}.</h5>
            <div className="ml-3">
              <h5>
                <a href={`/articles/${article.id}`} className="fs-2">
                  {article.title}
                </a>
              </h5>
              <div className="d-flex mt-2">
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
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Show;
