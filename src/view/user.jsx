import React from "react";

class User extends React.Component{
    constructor(){
        super();
        this.fnClick = this.fnClick.bind(this);
    }

    render(){
        return <div>
            <div>Hello {this.props.params.user || "User"}</div>
            <div><a href="javascript: void(0);" onClick={this.fnClick}>toOver</a></div>
        </div>;
    }

    fnClick(){
        this.context.router.push("/over");
    }
}

User.contextTypes = {
    router: React.PropTypes.object
};

export default User; 