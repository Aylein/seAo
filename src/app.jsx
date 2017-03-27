import React from "react";
import {Link} from "react-router";

class App extends React.Component{
    constructor(){
        super();
    }

    render(){
        return <div>
            <div>Hello World ! Hello React !</div>
            <div>
                <Link to="/user">User</Link><br />
                <Link to="/over">Over</Link>
            </div>
            {this.props.children}
        </div>
    }
}

export default App;