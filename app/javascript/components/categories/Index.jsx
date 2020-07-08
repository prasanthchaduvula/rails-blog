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
      <div>
        {categories.map((category) => (
          <li className="nav-item" key={category.id}>
            <a className="nav-link" href={`/categories/${category.id}`}>
              {category.name}
            </a>
          </li>
        ))}
      </div>
    );
  }
}

export default Index;
