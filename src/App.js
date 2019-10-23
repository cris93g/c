import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			textValue: '',
			socket: io(`http://localhost:3001`),
			messages: []
		};
		this.sendChatAction = this.sendChatAction.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
	}
	// componentDidMount() {
	// 	let { socket } = this.state;
	// 	let { messages } = this.state;
	// 	console.log(messages);
	// 	socket.on('chat message', function(msg) {
	// 		messages.push(msg);
	// 	});
	// }
	componentDidUpdate(prevProps, prevState) {
		console.log(prevState.messages.length);
		console.log(this.state.messages.length);
		if (this.state.messages.length == 0 || prevState.messages.length !== this.state.messages.length) {
			let { socket } = this.state;
			let { messages } = this.state;

			socket.on('chat message', function(msg) {
				messages.push(msg);
			});
		}
	}
	componentWillUnmount() {
		this.socket.disconnect();
	}

	// componentDidUpdate(prevState, prevProps) {
	// 	let { socket } = this.state;
	// 	let { messages } = this.state;
	// 	console.log(prevProps.messages.length);
	// 	console.log(this.state.messages.length);
	// 	if (prevProps.messages.length == 0 || prevProps.messages.length !== this.state.messages.length) {
	// 		console.log(messages);
	// 		socket.on('chat message', function(msg) {
	// 			messages.push(msg);
	// 		});
	// 	}
	// }
	changeHandler(e) {
		this.setState({ textValue: e.target.value });
	}
	sendChatAction() {
		let { socket } = this.state;
		socket.emit('chat message', this.state.textValue);
	}

	render() {
		const { textValue } = this.state;
		console.log(textValue);
		console.log(this.state);
		let { messages } = this.state;

		return (
			<div className="App" ref="container" className="thread-container">
				{messages ? (
					messages.map((msg) => {
						return <div>{msg}</div>;
					})
				) : (
					'none'
				)}
				<input onChange={(e) => this.changeHandler(e)} />
				<button onClick={() => this.sendChatAction()}>dsad</button>
			</div>
		);
	}
}

export default App;
