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
    return (
      <div className="w-25  d-flex justify-content-center align-items-center">
        {this.state.errors ? this.state.errors.map((msg) => <p>{msg}</p>) : ""}
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
    );
  }
}

export default Edit;
