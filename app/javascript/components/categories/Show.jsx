import React from "react";

class Show extends React.Component {
  render() {
    const { category, articles } = this.props;
    return (
      <div>
        <p>{category.name}</p>
        {articles.map((article) => (
          <div>
            <p>{article.title}</p>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Show;
