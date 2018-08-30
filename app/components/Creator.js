// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem, Container, Row, Col, Input } from 'reactstrap';
import styles from './Creator.css';
import InputModal from "./Modal.Input";
import routes from '../constants/routes.json';
import toastr from "toastr"; 
const { BrowserWindow } = require('electron').remote; 
var ipc = require('electron').remote.ipcMain;

type Props = {
  increment: () => void,
  incrementIfOdd: () => void,
  incrementAsync: () => void,
  decrement: () => void,
  creator: number
};

export default class Creator extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);  

    this.handleRecordChange = this.handleRecordChange.bind(this);
    this.handleBaseUrlSubmit = this.handleBaseUrlSubmit.bind(this);
    this.handleBaseUrlChange = this.handleBaseUrlChange.bind(this);   

    this.state = {
       baseUrl: "",
       baseUrlModalActive: false,
       curSelector: null,
       guest: null,
       recording: false,
       detecting: true,
       selectors: [],
       step: 1,
       page: 1,
       status: 0
    };


    
    ipc.on('selectorUpdate', (_, eleDetails) => {
      if(!this.state.detecting) return;

      console.log("==========================");
      console.log("Element has been hovered over");
      console.log("Tag: "+eleDetails.tag);
      console.log("Class: "+eleDetails.class);
      console.log("Id: "+eleDetails.id);
      console.log("==========================");
      this.setState({curSelector: eleDetails});
    })

  }

  
componentWillMount(){
  document.addEventListener("keydown", this.handleKeyDown.bind(this));
}
componentWillUnmount() { 
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
}

  handleKeyDown = (event) => {
    var ESCAPE_KEY = 27;
    var F4 = 115;
    var F3 = 114;

      switch( event.keyCode ) {
        case F4:
            this.setState({detecting: !this.state.detecting})
            break;
        case F3:
            const selectors = this.state.selectors;
            selectors.push(this.state.curSelector);
            this.setState({selectors})
            break;
          default: 
              break;
      }
  }
  handleRecordChange() { 
      if(!this.state.baseUrl) { 
        toastr.info("Please set a base URL before starting the recording session.");
        this.setState({baseUrlModalActive: true});
        return;
      } 
      this.setState({recording: !this.state.recording});

      const guest = new BrowserWindow({width: 1450, height: 1200, kiosk: false, darkTheme: true, vibrancy: true, webPreferences : {nodeIntegration: true, nodeIntegrationInWorker: true}});  
      guest.webContents.executeJavaScript(`window.onmouseover = function(e) { require('electron').ipcRenderer.send('selectorUpdate', {tag: String(e.target.tagName), class: String(e.target.className), id: String(e.target.id)} )}`);
      guest.loadURL(this.state.baseUrl); 
      this.setState({guest});  
  }
 
  handleBaseUrlSubmit(val) {
    console.log(val);
    this.setState({baseUrl: val})
  }

  handleBaseUrlChange() {
    this.setState({baseUrlModalActive: true});
  }
 
  render() {
    const {
      increment,
      incrementIfOdd,
      incrementAsync,
      decrement,
      creator
    } = this.props;
    return (
      <div className={styles.homeWrapper}>
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}><Button><i className="fa fa-arrow-left" /> Go Back</Button></Link> 
        </div>
        <div className={styles.testOverview}>
        <Container className="h-100">
          <Row className="h-25"> 
            <Col xs={{size: 12}} sm={{size: 12}} md={{size: 12}} lg={{size: 12}}> 
              <p>After pressing the record button, select the elements you want to interact with. Press F4 to pause the selector detection or F3 to save the selector (coming soon).</p>
            </Col>
          </Row>
          <Row className="h-50">
            <Col xs={{size: 6}} sm={{size: 6}} md={{size: 4}} lg={{size: 4}}> 
              <h4>Actions</h4>
              <Button onClick={this.handleRecordChange} disabled={this.state.baseUrl ? false : true} color={this.state.recording ? "success" : "danger"}>{this.state.recording ? "Stop" : "Start"} Recording</Button><br/>
              <Button onClick={this.handleBaseUrlChange} color="warning">Set URL</Button> 
            </Col>
            <Col xs={{size: 6}} sm={{size: 6}} md={{size: 4}} lg={{size: 4}}> 
              <h4>Current Element</h4>
              <pre style={{color: 'white'}}>
                {JSON.stringify(this.state.curSelector, null, 2)}
              </pre>
              <h4>Selected Elements</h4>
              <pre style={{color: 'white'}}>
                {JSON.stringify(this.state.selectors, null, 2)}
              </pre>
              <ListGroup>
                <ListGroupItem>Cras justo odio</ListGroupItem> 
              </ListGroup>
            </Col>
          </Row>
          <Row className="h-25"> 
            <Col xs={{size: 6}} sm={{size: 6}} md={{size: 6}} lg={{size: 6}} style={{textAlign: 'left'}}> 
                <Button className="align-bottom" color="warning" disabled>Previous Page</Button>
            </Col>  
            <Col xs={{size: 6}} sm={{size: 6}} md={{size: 6}} lg={{size: 6}} style={{textAlign: 'right'}}> 
                <Button className="align-bottom" color="success" disabled>Next Page</Button>
            </Col>  
          </Row> 
        </Container>
        </div>
        {this.state.baseUrlModalActive ? <InputModal handleBaseUrlSubmit={this.handleBaseUrlSubmit} title={"Enter Application URL"} body={"Please enter the full URL of the application to be tested."} open={this.state.baseUrlModalActive}/> : null }
      </div>
    );
  }
}
