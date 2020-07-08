import React from "react";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      session: { email: "", password: "" },
      errors: "",
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ session: { ...this.state.session, [name]: value } });
  };

  onSubmit = (event) => {
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify({ session: this.state.session }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.notice) {
          window.location.href = "/";
        }
        if (data.errors) {
          this.setState({ errors: data.errors });
        }
      });
  };

  render() {
    let { session, errors } = this.state;
    return (
      <div className="container my-5">
        <div className="d-flex my-3 justify-content-center">
          <div className="col-8">
            <h5 className=" text-warning">Sign In</h5>
            <div className="my-3">
              {errors ? (
                <li className=" list-group-item list-group-item-danger text-center">
                  {errors}
                </li>
              ) : (
                ""
              )}
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={session.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={session.password}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
