import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from "react-redux";
import * as actionTypes from '../store/actions';
import { Card, List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { Remove } from '@material-ui/icons';

class KervKue extends Component {

    handleRemove = (index) => {
        this.props.onRemoveOrder(index)
        console.log(index);
    }
    componentDidMount(){
        const socket = socketIOClient("http://localhost:5001");

        socket.on('order_item', data => {
          this.props.onReceiveOrderItem(data);
        })
    }
    render() {
        return (
            <Card>
                <List>
                    { 
                        Object.keys(this.props.kervKue).filter(element => !isNaN(element)? element: null).map((key, index) => (
                            <ListItem key={index}>
                                <IconButton onClick={() =>this.handleRemove(index)}><Remove/></IconButton>
                                <ListItemText primary={this.props.kervKue[key].drink} />
                                <ListItemText primary={this.props.kervKue[key].bean} />
                                { this.props.kervKue[key].milk&&
                                    <ListItemText primary={this.props.kervKue[key].milk} /> }
                            </ListItem>
                        )) 
                    }
                </List>
            </Card>
        );
    }
}
const mapStateToProps = state => {
    return {
        kervKue: state.kervKue
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onReceiveOrderItem: data => {
            dispatch({type: actionTypes.RECEIVE_ORDER_ITEM, data: data})
        },
        onRemoveOrder: index => {
            dispatch({type: actionTypes.REMOVE_ORDER_ITEM, data: index})
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(KervKue);
  