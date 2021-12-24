import React, { Component } from "react";
import axios from "axios";


class Puntos extends Component {constructor(props) {
  super(props);
  this.state = {
    viewCompleted: false,
    todoList: [],
    modal: false,
    activeItem: {
      title: "",
      description: "",
      completed: false,
    },
  };
}

componentDidMount() {
  this.refreshList();

}

refreshList = () => {
  axios
    .get("/api/puntos/")
    .then((res) => this.setState({ todoList: res.data }))
    .catch((err) => console.log(err));
};


renderItems = () => {
  const newItems = this.state.todoList;
  return newItems.map((item) => (
    <li
      key={item.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span
        className={`todo-title mr-2`}
        title={item.direccion}
      >
        {item.nombre}
      </span>

    </li>
  ));
};

render() {
  return (
    <main className="container">
      <h1 className="text-uppercase text-center my-4">Puntos Ziru's Pizza</h1>
      <div security="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <ul className="list-group list-group-flush border-top-0">
              {this.renderItems()}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
}

export default Puntos;