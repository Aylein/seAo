const React = require("react");

class User extends React.Component{
    render(){
        return <div>
            <div>this is the user index</div>
            {this.props.list.map((va, i) => <div key={i}><span>{va.name}</span> => <span>{va.id}</span></div>)}
        </div>;
    }
};

User.defaultProps = {
    list: []
};

module.exports = User;