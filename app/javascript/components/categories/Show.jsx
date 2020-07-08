import React from "react";

class Show extends React.Component {
  render() {
    const { category } = this.props;
    return (
      <div className="container mt-5">
        <a href={`/categories`} className="p-3 text-success">
          Go back to categories
        </a>
        <br />

        <div className="d-flex justify-content-center">
          <div>
            <h3 className="text-center">{category.name}</h3>
            <a
              href={`/categories/${category.id}/edit`}
              className="p-3 text-success"
            >
              Edit category
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
