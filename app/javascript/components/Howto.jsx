import React from "react";

class Howto extends React.Component {
  constructor() {
    super();
    this.state = {
      credentials: [
        {
          signinas: "Sign In as Admin",
          email: "admin@example.com",
          password: "password",
        },
        {
          signinas: "Sign In as User",
          email: "test@example.com",
          password: "password",
        },
      ],
    };
  }

  render() {
    let { credentials } = this.state;
    return (
      <div className="container py-5 list-unstyled">
        <h5 className=" text-center my-3">Credentials to test app</h5>
        {credentials.map((credential, index) => (
          <div className="d-flex align-items-baseline mt-5" key={index}>
            <h5>{index + 1}.</h5>
            <div className="ml-3">
              <h5>{credential.signinas}</h5>
              <div className="d-flex mt-2">
                <li className="pr-3 text-info">
                  {`email: ${credential.email}`}
                </li>
                <li className="pr-3 text-info">
                  {`password ${credential.password}`}
                </li>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Howto;
