import React from 'react';

export default class PrintTodos extends React.Component {

    showItems = () => {
        let items = this.props.todos;
        let results = [];
        for (let index = 0; index < items.length; index++) {
            let item = items[index];
            let dateCheck = item.date;
            var date = dateCheck.getDate();
            var month = dateCheck.getMonth(); //Be careful! January is 0 not 1
            var year = dateCheck.getFullYear();

            var dateString = date + "-" + (month + 1) + "-" + year;

            if (!(item.strikeThrough)) {
                results.push(<li className='listItems'>
                    {item.todoText}
                    <text>{dateString}</text>
                    <button
                        //type1 return of this type of onclick is function when we want to pass the argument in the 
                        //function otherwise we can use the type 2
                        onClick={(e) => { this.props.cancelTodo(item.id) }}
                        //type2 onClick={this.props.cancelTodo(item,index)} --> return of this is type object
                        key={item.id}>Delete
                        </button>

                </li>);
            } else {
                results.push(<li className='listItems' style={{ textDecoration: 'line-through' }}>
                    {item.todoText}
                    <text>{dateString}</text>
                    <button
                        //type1 return of this type of onclick is function when we want to pass the argument in the 
                        //function otherwise we can use the type 2
                        onClick={(e) => { this.props.cancelTodo(item.id) }}
                        //type2 onClick={this.props.cancelTodo(item,index)} --> return of this is type object
                        key={item.id}>Delete
                        </button>

                </li>);
            }

        }
        //console.log("[PrintTodos :]", results);
        return results;

    }

    render() {
        const list = this.props.todos;

        if (!list) {
            console.log('list is null');
            return null;
        }

        if (list.length === 0) {
            return <h2>No todo in list, add one.</h2>
        }

        return <ul style={{ listStyle: "none" }}>
            {this.showItems()}
        </ul>
    }
}