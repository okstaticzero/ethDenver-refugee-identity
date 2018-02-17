import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ripple from '../assets/images/ripple.svg';
import { connect } from 'react-redux';
import { fetchTodos, createTodo, toggleComplete, deleteTodo } from '../todos/TodoActions';
import Loader from '../Loader'
import './Todos.css';
import {
  List,
  Card,
  Checkbox,
  TextField,
  Button,
  ListItem,
} from 'react-md';

export class ListTodos extends Component {
  constructor(props) {
    super(props);
    this.state = { newTodo: '', account: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentDidMount(e) {
    const account = this.props.match.params.account;
    this.setState({ account: account });
    this.props.fetchTodos(account);
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.newTodo === '') return;
    this.props.createTodo(this.state.newTodo, this.state.account, this.props.account);
    this.setState({ newTodo: '' });
  };

  toggleComplete(id) {
    const account = this.state.account;
    this.props.toggleComplete(account, id, this.props.account);
  };

  deleteTodo(id) {
    const account = this.state.account;
    this.props.deleteTodo(account, id, this.props.account);
  }

  render() {
    return (
      <div className="Todo-list">
        <Card className="Todos-card">
          <h4 data-account={this.props.match.params.account}>Account: {this.props.user.name}</h4>
          <List>
            {this.props.todos.todoList.map((todo, index) => (
              <ListItem
                key={todo.timestamp}
                leftAvatar={<Checkbox
                  id={index}
                  name="list-control-primary"
                  aria-label="left"
                  defaultChecked={todo.complete}
                  onChange={(todo, e) =>
                    this.toggleComplete(Number(e.target.id))
                  }
                />}
                rightIcon={<i className="fa fa-trash-o"
                  aria-hidden="true"
                  id={todo.timestamp}
                  onClick={
                    (e) => this.deleteTodo(Number(e.target.id))
                  }
                ></i>}
                primaryText={todo.title}
              />
            ))}
          </List>
          <div>
            <form onSubmit={this.handleSubmit}>
              <TextField
                id="floating-center-title"
                label="Enter Todo"
                lineDirection="center"
                placeholder="Hello World"
                className="md-cell md-cell--bottom"
                value={this.state.newTodo}
                onChange={name => this.setState({ newTodo: name })}
              />
              {this.props.loading ? (
                <Loader />
              ) : (
                  <Button type="submit" raised primary swapTheming>
                    Add Todo
                </Button>
                )}
            </form>
          </div>
        </Card>
      </div>
    );
  }
}

ListTodos.propTypes = {
  createTodo: PropTypes.func,
  fetchTodos: PropTypes.func,
  toggleComplete: PropTypes.func,
  deleteTodo: PropTypes.func,
  match: PropTypes.object,
  loading: PropTypes.bool,
  todos: PropTypes.object,
  account: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    todos: state.todos,
    account: state.accounts.account,
    loading: state.loadingState.loading,
    user: state.accounts.currentUser
  };
}

export default connect(mapStateToProps, {
  fetchTodos,
  createTodo,
  toggleComplete,
  deleteTodo
})(ListTodos);

