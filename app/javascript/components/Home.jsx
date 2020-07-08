import React from "react";
import { func } from "prop-types";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: this.props.current_user,
      logged_in: this.props.logged_in,
    };
  }

  handleDelete = () => {
    fetch("/logout", {
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
          this.setState({ logged_in: false });
          window.location.href = "/";
        }
      });
  };
  render() {
    let { current_user, logged_in } = this.state;
    return (
      <div className="container">
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="/">
            Blog
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/users">
                  Bloggers
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Articles
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item" href="/articles">
                    View Articles
                  </a>
                  {logged_in ? (
                    <a className="dropdown-item" href="/articles/new">
                      Create Article
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item" href="/categories">
                    Categories
                  </a>
                  {logged_in && current_user.admin ? (
                    <a className="dropdown-item" href="/categories/new">
                      Create Categories
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </li>
              {logged_in ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href={`/users/${current_user.id}`}>
                      {current_user.name}
                      <span>{current_user.admin ? "(admin)" : ""}</span>
                    </a>
                  </li>
                  <li className="nav-item" onClick={this.handleDelete}>
                    <a className="nav-link" href="">
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/signup">
                      Signup
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Home;
