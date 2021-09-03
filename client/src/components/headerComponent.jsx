import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Modal,
    ModalBody,
    ModalHeader,
    Button,
    FormGroup,
    Form,
    Label,
    Input
} from 'reactstrap';
import { baseurl } from '../redux/baseURL';
import Oauth from './facebook';



class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            open:true,
            modalOpen:false

        }
        this.handleLogin=this.handleLogin.bind(this)
    }
    toggle=()=>{
        this.setState({
            open:!this.state.open,
        })
    }
    toggleModal=()=>{
        this.setState({
            modalOpen:!this.state.modalOpen
        })
        console.log(this.state.modalOpen)
    }
    handleLogin(event){
        event.preventDefault();

        this.toggleModal();
        console.log(this.username.value,this.password.value)
        this.props.loginUser({username: this.username.value, password: this.password.value});

    }
    handleLogout=()=>{
        this.props.logoutUser();
    }

 
    
    render(){
        console.log(this.props.userinformation)
        return(
            <div className="">
                <Navbar color="" dark expand="md sm" >
                    <NavbarBrand href="/"> Videocalling Project </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.open} navbar className="navbarflex" >
                        <Nav className="mr-5 "  navbar >
                            <NavItem>
                                <NavLink className="tooltipper" href="/home"> 
                                 <i  className=" fa fa-home"></i>
                                 <span className="tooltiptext"> Home</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="tooltipper" href="/contact"> 
                                <span className="tooltiptext">Contact</span>
                                <i className="fa fa-address-card"></i></NavLink>
                            </NavItem>
                            
                          {/*   <UncontrolledDropdown nav inNavbar> 
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                    Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown> */}
                        </Nav>
                        <Nav navbar className=" ">
                            {this.props.auth.is_auth
                            ?
                            <div className="">
                                <NavItem className=" smalluserimage p-0">
                                    {this.props.userinformation? <Link to="/user" className="">
                                        <img className="userimage " src={baseurl+this.props.userinformation.image} alt="pp"/>
                                    </Link>:
                                    <div className="">
                                        <i className="fa fa-user"></i>
                                    </div> }
                                </NavItem>
                            <span className=" abel username white"> {this.props.auth.userinfo.username} </span>
                            </div>
                            :
                            <div className=""> 
                                <NavItem>
                                        <Link to="/">
                                            <i className="bold notuser fa fa-user-times"></i>
                                        </Link>
                                </NavItem>                            
                            </div>
                            }
                            <NavItem>
                                <NavLink>
                                    {this.props.auth.is_auth?
                                    <Button className=" bg-secondary  ml-3" onClick={this.handleLogout}>Logout  <span className=" fa fa-sign-in fa-lg"></span></Button>
                                    :
                                    <Button className=" bg-warning  ml-3" onClick={this.toggleModal}>Login  <span className=" fa fa-sign-in fa-lg"></span></Button>
                                    }

                                </NavLink>
                            </NavItem>
                           
                        </Nav>
                    </Collapse>
                </Navbar>

                

                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} className="loginmodal">
                    <ModalHeader className="m-1" toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody className="m-4">
                        <Form   onSubmit={ (value)=> this.handleLogin(value)}>
                            <FormGroup>
                                <Label htmlFor="username">Username:</Label>
                                <Input type="text" id="username" name="username" placeholder="username" innerRef={(input)=>this.username=input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password:</Label>
                                <Input type="password" id="password" name="password" placeholder="password" innerRef={(input)=>this.password=input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check> 
                                    <Input type="checkbox" name="rememberme" innerRef={(input)=>this.rememberme=input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" className="btn btn-success m-2">Login</Button>
                        </Form>
                        <h4>dont't have an account? </h4>
                        <Oauth /> 
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export default Header ;