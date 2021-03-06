import React, {Component} from 'react';
import axios from 'axios';

export default class ClassInput extends Component{
    state = {
        title: '',
        subject: '',
        };

    componentDidMount(){
        axios.get('http://localhost:4000/classes/'+this.props.match.params.id)
        .then(res=>
            this.setState({
                title: res.data.title,
                subject: res.data.subject 
            })
        )
    }

    handleChange = event => {
        
        const { name, value } = event.target;

        this.setState({
            [name] : value
        });
    }

    

    handleSubmit=event=>{
        event.preventDefault();

        const clas = {
            title: this.state.title,
            subject: this.state.subject,
        }

        //debugger
        axios.patch('http://localhost:4000/classes/'+this.props.match.params.id, clas)
        .then(res=>{
            console.log(res);
            console.log(res.data);
            window.location.href="/";
        })
    }



    render(){
    return (
        <div className="container">
     <form onSubmit={e=> this.handleSubmit(e)}>
         <label>ClassName:</label>
             <input value={this.state.title} type="text" name="title" onChange={this.handleChange} />
         <label>Subject:</label>
             <input value={this.state.subject} type="text" name="subject" onChange={this.handleChange}/>
         <button type="submit">Update Class</button>
     </form>
     </div>
    )
    }

} 