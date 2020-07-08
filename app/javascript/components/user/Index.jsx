import React from "react";

class Index extends React.Component {
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
        if (data.notice) {
          window.location.href = `/articles/`;
        }
        if (data.errors) {
          alert("delete failed");
        }
      });
  };

  render() {
    let { users, current_user, logged_in } = this.props;
    return (
      <div className="container py-5 list-unstyled">
        <h5 className=" text-center my-3">List of Bloggers</h5>
        {users.map((user, index) => (
          <div className="d-flex align-items-baseline mt-5" key={index}>
            <h5>{index + 1}.</h5>
            <div className="ml-3">
              <h5>
                <a href={`/users/${user.id}`} className="fs-2">
                  {user.name}
                </a>
              </h5>
              <div className="d-flex mt-2">
                <li>
                  <a href={`/users/${user.id}`} className="pr-3 text-success">
                    View Profile
                  </a>
                </li>
                {logged_in &&
                (current_user.id == user.id || current_user.admin) ? (
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
          </div>
        ))}
      </div>
    );
  }
}

export default Index;
