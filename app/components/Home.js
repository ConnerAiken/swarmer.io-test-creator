// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
import routes from '../constants/routes.json';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
       login: {
          email: "john.smith@gmail.com",
          password: "**********"
       }
    }
  }

  handleEmailChange(e) {
    const login = this.state.login; 
    login.email = e.target.value; 
    this.setState({login})
    console.log(this.state);
  }

  handlePasswordChange(e) { 
    const login = this.state.login; 
    login.password = e.target.value; 
    this.setState({login})
  }

  render() {
    return ( 
      <Container className={styles.container} data-tid="container">
        <Row>
          <Col xs={{size: 10, offset: 1}} sm={{size: 6, offset: 3}} md={{size: 4, offset: 4}} lg={{size: 4, offset: 4}}> 
            <h1>Login to Swarmer</h1>
            <a href="https://swarmer.io/">If you do not have an account, create one here.</a>
            <hr/>   
            <Form> 
              <FormGroup>
                <Label for="email">Email</Label>
                <Input value={this.state.login.email} onChange={this.handleEmailChange} placeholder="john.smith@gmail.com"   type="email" name="email" id="email"/>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input value={this.state.login.password} onChange={this.handlePasswordChange} placeholder="**********" type="password" name="password" id="password"/>
              </FormGroup> 
              <Link to={routes.CREATOR}><Button>Get Started</Button></Link>
            </Form>
          </Col>
        </Row>
      </Container> 
    );
  }
}
