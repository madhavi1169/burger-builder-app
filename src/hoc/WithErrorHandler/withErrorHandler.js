import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
const withErrorHandler = (WrappedComponent,axios) =>{
    return  class extends Component{
        state ={
            error : null
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterpector)
            axios.interceptors.response.eject(this.resInterpector)
        }
        componentWillMount(){
            this.reqInterpector = axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req
            },error=>{
            })
            this.resInterpector = axios.interceptors.response.use(res => res,error=>{
                this.setState({error:error})
            })
        }
        errorConfirmedHandler = () =>{
            this.setState({error:null});

        }
        render(){
        return (
            <Aux>
                <Modal show={this.state.error} 
                modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ?this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />

            </Aux>
        );
    }
}
}
export default withErrorHandler;