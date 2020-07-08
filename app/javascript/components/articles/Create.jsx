import React from "react";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.categories,
      article: { title: "", description: "", category_ids: [] },
      errors: "",
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ article: { ...this.state.article, [name]: value } });
  };

  handleOptions = ({ target: { value } }) => {
    if (this.state.article.category_ids.includes(value)) {
      this.setState({
        article: {
          ...this.state.article,
          category_ids: this.state.article.category_ids.filter(
            (id) => id != value
          ),
        },
      });
    } else {
      this.setState({
        article: {
          ...this.state.article,
          category_ids: [...this.state.article.category_ids, value],
        },
      });
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    fetch("/articles", {
      method: "POST",
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
          window.location.href = "/";
        }
        if (data.errors) {
          this.setState({ errors: data.errors });
        }
      });
  };

  render() {
    let { categories, article, errors, category_ids } = this.state;
    return (
      <div className="container">
        {errors ? errors.map((msg) => <p>{msg}</p>) : ""}
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
            value={article.category_ids}
            className="custom-select"
            multiple={true}
            name="category_ids"
            onChange={this.handleOptions}
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

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Create;
