import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import plansAPI from '../../services/plan-service';
import Moment from 'react-moment';
import BackNav from '../../components/BackNav';

class Plan extends Component {
  state = {
    plan: {},
    user: {},
    isJoined: false,
    isOwner: false,
    loading: true,
  }

  componentDidMount(){
    plansAPI.getOnePlan(this.props.match.params.id)
    .then((data) => {
      console.log('PLAN DETAIL',data);
      this.setState({plan: data.plan, user: data.fullUser, isJoined: data.isJoined, isOwner: data.isOwner, loading: false,})
      console.log(this.state.user.status)
    })
    .catch(error => console.log(error))
  }

  handleSubmitVale = (event) => {
    event.preventDefault();
    plansAPI.valePlan(this.props.match.params.id)
    .then(({data}) => {
      this.setState({ plan: data.plan, isJoined: true
      })
    })
    .catch(error => console.log(error))
  }

  handleSubmitLeave = (event) => {
 
    event.preventDefault();
    console.log(this.props.match.params.id);
    plansAPI.leavePlan(this.props.match.params.id)
    .then(({data}) => {
      this.setState({ plan: data.plan, isJoined: false
      })
    })
    .catch(error => console.log(error))
  }

  handleSubmitDelete = (event) => {

    event.preventDefault();
    console.log(this.props.match.params.id);
    plansAPI.leavePlan(this.props.match.params.id)
    .then(({data}) => {
      this.setState({ plan: data.plan, isOwner: false
      })
    })
    .catch(error => console.log(error))
  }


  render() {
    const {plan} = this.state
    return (
    <>
    <BackNav />
    <div className="form-wrapper" id="plan-detail">
        <div className="card-grid" id="plan-detail">
          <h3 className="title">{plan.title}</h3>
          <p className="description">{plan.description}</p>
          <p className="date">
          <Moment format="D MMM" style={{paddingRight: 10}}>
              {plan.date}
          </Moment>
          <Moment format="hh:mm">
              {plan.date}
          </Moment>
          </p>
          <p className="category">{plan.category}</p>
          <p className="attendees">&#128101;{plan.counter}</p>
        </div>

      
      {this.state.user.status==='created' ? 
          <form>
            <div className="form-buttons" id="signup">

              <button className="btn btn-signup" type="submit">
                              <Link to='/user/onboarding'>      
                Vale!
                              </Link>

                </button>
            </div>
          </form>   
      :
        
        !plan.isOwner ? 
        (!this.state.isJoined ?
          <form onSubmit={this.handleSubmitVale}>
            <div className="form-buttons" id="signup">
              <button className="btn btn-signup" type="submit">Vale!</button>
            </div>
          </form>   
          :
          <form onSubmit={this.handleSubmitLeave}>
            <div className="form-buttons" id="signup">
              <button className="btn btn-signup" type="submit">Leave</button>
            </div>
          </form> 
        ):
        <form onSubmit={this.handleSubmitDelete}>
          <div className="form-buttons" id="signup">
            <button className="delete btn btn-signup" type="submit">Delete</button>
            </div>
          </form> 
        }
    </div>
    </>
    )}
}

export default Plan;