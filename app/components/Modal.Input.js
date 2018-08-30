
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

class InputModal extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      modal: this.props.open == undefined ? false : this.props.open,
      value: ""
    };

    this.toggle = this.toggle.bind(this);
    this.setInput = this.setInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  setInput(e) {
    this.setState({
        value: e.target.value
    });
  }

  handleSubmit() {
    this.props.handleBaseUrlSubmit(this.state.value);
    this.setState({
      modal: false
    });
  }

  render() { 
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            {this.props.body}<br/>
            <Input type="text" value={this.state.value} onChange={this.setInput}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default InputModal;