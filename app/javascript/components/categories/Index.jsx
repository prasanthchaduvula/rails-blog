import React from "react";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.categories,
    };
  }
  render() {
    let { categories } = this.state;
    return (
      <div className="container my-5 list-unstyled">
        <div className="d-flex my-5 justify-content-center">
          <div className="col-8">
            <h5 className="text-warning">List of Categories</h5>
            {categories.map((category, index) => (
              <div className="d-flex align-items-baseline mt-4" key={index}>
                <h5>{index + 1}.</h5>
                <h5>
                  <a className="fs-2 ml-3" href={`/categories/${category.id}`}>
                    {category.name}
                  </a>
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
