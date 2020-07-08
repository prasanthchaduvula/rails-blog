import React from "react";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.categories,
      article: props.article,
      errors: "",
    };
  }

  handleChange = ({ target: { name, value, options } }) => {
    this.setState({ article: { ...this.state.article, [name]: value } });
  };

  onSubmit = (event) => {
    event.preventDefault();
    fetch(`/articles/${this.state.article.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify({ article: this.state.article }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.notice) {
          window.location.href = `/articles/${this.state.article.id}`;
        }
        if (data.errors) {
          this.setState({ errors: data.errors });
        }
      });
  };

  render() {
    let { categories, article, errors, category_ids } = this.state;
    return (
      <div className="container my-5">
        <div className="d-flex my-3 justify-content-center">
          <div className="col-8">
            <a href={`/articles/${article.id}`} className="py-3 text-success">
              Go back to article
            </a>
            <h5 className=" text-warning">Edit Article</h5>
            <div className="my-3">
              {errors
                ? errors.map((msg) => (
                    <li className=" list-group-item list-group-item-danger text-center">
                      {msg}
                    </li>
                  ))
                : ""}
            </div>

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter title"
                  value={article.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="description"
                  placeholder="Enter description"
                  value={article.description}
                  onChange={this.handleChange}
                ></textarea>
              </div>
              <select
                value={category_ids}
                className="custom-select"
                multiple={true}
                name="category_ids"
                onChange={this.handleChange}
              >
                <option>Select category</option>
                {categories.map((category) => (
                  <>
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  </>
                ))}
              </select>

              <button type="submit" className="btn btn-primary mt-3">
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
