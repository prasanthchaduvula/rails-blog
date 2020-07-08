import React from "react";
import API from "../../utils/API";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      user: { name: "", email: "", password: "" },
      errors: "",
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  onSubmit = (event) => {
    event.preventDefault();
    // API.postNewTask({
    //   user: this.state.user,
    // })
    //   .then(() => {
    //     window.location.href = "/";
    //   })
    //   .catch((error) => {
    //     if (error.text) {
    //       error.text().then((err) => {
    //         console.error(err);
    //       });
    //     }
    //   });
    fetch("/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify({ user: this.state.user }),
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
    let { user, errors } = this.state;
    return (
      <div className="container my-5">
        <div className="d-flex my-3 justify-content-center">
          <div className="col-8">
            <h5 className=" text-center">Sign Up</h5>
            <div className="my-3">
              {errors
                ? errors.map((msg, index) => (
                    <li
                      className=" list-group-item list-group-item-danger text-center"
                      key={index}
                    >
                      {msg}
                    </li>
                  ))
                : ""}
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter name"
                  value={user.name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={user.email}
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
                  value={user.password}
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

export default Signup;
