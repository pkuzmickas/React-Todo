import React from 'react';
import PrintTodos from './PrintTodos';
import Calendar from 'react-calendar';

export default class TodoForm extends React.Component {

    static uuid = 1;

    constructor() {
        super();

        this.state = {
            // stores the value of currently typed todo value
            // in input box
            todo: '',
            // stores the list of todos that we have created till
            // now
            todoList: [],
            filter: 'all',
            date: null

        }
    }


    updateTodoValue = (e) => {
        this.setState({ todo: e.target.value });
    }

    handleAddTodo = (e) => {
        e.preventDefault();

        // // obtain the current list from memory
        // let list = this.state.todoList;
        // if(!(this.state.todo)){
        //     return alert('Please enter TODO to add first!!!');
        // }
        // // add current todo to list
        // list.push(this.state.todo);
        // console.log(this.state.todo);
        // // update list in memory
        // this.setState({
        //     todoList: list,
        //     todo: '' // also clear the value of todo in input box
        // });

        let obj = {};

        obj["todoText"] = this.state.todo;
        obj["strikeThrough"] = false;
        obj["id"] = TodoForm.uuid++;
        if (this.state.date) {
            obj["date"] = this.state.date;
        } else {
            obj["date"] = new Date();
        }
        console.log("obj is :", obj);
        //due to this i was not getting object of arrays
        // if you do todoArray = []
        // and then push data into it - there will always be only one element in it
        // because it is empty.you do a push first
        // and then set reference of state.todoList to this array
        // however, if we do todoarray = state.todolist first, we get the reference of old array
        // and then add our data to it
        // let todoArray = [];
        let todoArray = this.state.todoList;
        todoArray.push(obj);
        console.log("List of todos :", todoArray);
        this.setState({ todoList: todoArray, todo: '' }, () =>
            console.log("todoList for now is:", this.state.todoList));

    }

    onChange = (date) => {

        this.setState({ date: date })
    }

    showAll = (e) => {
        this.setState({ filter: 'all' });
    }

    showCompleted = (e) => {
        this.setState({ filter: 'complete' });
    }

    showOpen = (e) => {
        this.setState({ filter: 'open' });
    }

    markAllComplete = (e) => {
         let tasks = this.state.todoList;
        // for(let i = 0 ; i< tasks.length ; i++){
        //     let task = tasks[i];
        //     task["strikeThrough"] = true;
        // }
        tasks.map( task => task.strikeThrough = true);
       this.setState({
        todoList : tasks
       })
    }

    markAllOpen = (e) => {
         let tasks = this.state.todoList;
        // for(let i = 0 ; i< tasks.length ; i++){
        //     let task = tasks[i];
        //     task["strikeThrough"] = false;
        // }
        tasks.map( task => task.strikeThrough = false);
       this.setState({
        todoList : tasks
       })
      
    }

    cancelTodo = (id) => {
        // console.log("item to be removed passed from [PrintTodos] :", index);
        // let items = this.state.todoList;
        // console.log("Items before splicing :", this.state.todoList);
        //  var newTodo = this.state.todoList.splice(index,1);
        //  console.log("Item after splicing :", this.state.todoList);
        let iterate = this.state.todoList;
        for (let j = 0; j < iterate.length; j++) {
            let item = iterate[j];
            if (item["id"] === id) {
                console.log("Item matched is : ", item["id"])
                item["strikeThrough"] = true
            }
        }
        this.setState({
            todoList: iterate,
            todo: '' // also clear the value of todo in input box
        }, () => { console.log("Checking boolean after strikethru : ", this.state.todoList) });
    }

    render() {
        const array = this.state.todoList;
        const filter = this.state.filter;

        let renderArray;
        switch (filter) {
            case 'all':
                renderArray = array;
                break;

            case 'open':
                renderArray = array.filter(function (x) { return x.strikeThrough === false });
                break;

            case 'complete':
                renderArray = array.filter(x => x.strikeThrough === true);
                break;
        }

        return <div>
            <form style={{ display: 'inline-block' }}>
                <input type='text'
                    onChange={this.updateTodoValue}
                    placeholder='type your todo here'
                    value={this.state.todo}
                >
                </input>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                />
                <button onClick={this.handleAddTodo}>Submit</button>
            </form>
            <PrintTodos todos={renderArray} cancelTodo={this.cancelTodo} />
            <footer>
                <div>
                    <button onClick={this.showAll}>All</button>
                    <button onClick={this.showOpen}>Open</button>
                    <button onClick={this.showCompleted}>Completed</button>
                </div>
                <div>
                    <button onClick={this.markAllComplete}>Mark All Complete</button>
                    <button onClick={this.markAllOpen}>Mark All Open</button>
                </div>
            </footer>
        </div>
    }
}