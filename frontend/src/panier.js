import React from 'react';
import Carte from './carte.js';
import { connect } from 'react-redux';
import './panier.css'
import {
  Header,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import Navbar from './Navbar.js'

class Panier extends React.Component{
constructor(props){
super(props)
this.state = { visible: false,
count: 0 }
}


  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })
 
   handleClick = (card) =>(e)=> {
   const action = { type: "TOGGLE_FAVORITE", value: card }
    this.props.dispatch(action)
   }

render () {
     const { visible } = this.state
    return(
<div>
<div className="img">
 
 <img src='/img/panierr.png' onClick={this.handleShowClick} style={{width: '50px', height: '50px' }} />
  <span className="badge">{this.props.cartProducts.length}</span>
</div>
        <Sidebar.Pushable as={Segment}>
        <Sidebar
            as={Menu}
            animation='overlay'
            direction='right'
            inverted
             onHide={this.handleSidebarHide}
            vertical
            visible={visible}
          >
          <h2 className="ui header">
  <i className="large icons">
    <i aria-hidden="true" className="yellow shopping bag  icon"></i> 
  </i>
  Bag
</h2>
            {this.props.cartProducts.map((card) => (
   <div className="comment"  key={card.id} style={{margin : '8px'  }}>
    <div className="mavatar">
      <img src={card.img} style={{width: '50px', height: '60px'  }}  />
    </div>
    <div className="content">
      <a className="author">{card.title}</a>
      <div className="close" onClick={this.handleClick(card)}><i aria-hidden="true" className="close icon"></i></div>
      <div className="text"> <h4>$ {card.prix}</h4></div>
      <div className="actions"><h5 style={{color: 'green' }}>{card.detail}</h5></div>
    </div>
  </div>
  ))}
  <div className="priced">
  <div className="ui raised segments">
  <div className="ui very padded segment"><h3>SUBTOTAL   ::::      $ {this.props.price} </h3></div>
  <div className="ui segment">Check out</div>
  <div className="ui segment"></div>
</div>
</div>
          </Sidebar>

          <Sidebar.Pusher>
          <Navbar/>
              <Carte/>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
 
</div>
    )
}

}
 const mapStateToProps = (state) => {
  return {
    cartProducts: state.cartProducts,
    price: state.price
  }
}
export default connect(mapStateToProps)(Panier)

