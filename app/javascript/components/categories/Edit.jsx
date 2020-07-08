import React from "react";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category,
      errors: "",
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ category: { ...this.state.category, [name]: value } });
  };

  onSubmit = (event) => {
    event.preventDefault();
    fetch(`/categories/${this.state.category.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify({ category: this.state.category }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.notice) {
          window.location.href = "/categories";
        }
        if (data.errors) {
          this.setState({ errors: data.errors });
        }
      });
  };

  render() {
    let { errors } = this.state;

    return (
      <div className="container my-5">
        <div className="d-flex my-3 justify-content-center">
          <div className="col-8">
            <a href={`/categories`} className="py-3 text-success">
              Go back to Categories
            </a>
            <h5 className=" text-center my-3">Create Category</h5>
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
                  placeholder="Enter category name"
                  value={this.state.category.name}
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

export default Edit;
