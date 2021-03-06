import React, { Component } from 'react';
import { getUserInfo } from './../../ducks/users';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {}
    }
  }

  componentDidMount() {
    this.props.getUserInfo();
    console.log(this.props.user);
  }

  render() {
    const user = this.props.user;
    return (
      <div className="dashboard">
        <div className='dashHeader'>
          <img src={logo} alt="" />
          <h1 className='dashtitle'>Dashboard</h1>
          <a href={process.env.REACT_APP_LOGOUT}><button><span>Log out</span></button></a>
        </div>
        <div className='selectbar'>
          <div className='selectbox'>
            <Link to='/airlinemgmt'><button><span>Airline Management</span></button></Link>
            <Link to='/customermgmt'>
              <button><span>Customer Management</span></button>
            </Link>
            <Link to='/profitcomparison'>
              <button><span>Profit Comparison</span></button>
            </Link>
          </div>
          <div className='data'>
            <p>Username: {user.id ? user.user_name : null}</p>
            <p>Email: {user.id ? user.email : null}</p>
            <p>ID: {user.id ? user.auth_id : null}</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state from dashboard', state)
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { getUserInfo })(Dashboard);
