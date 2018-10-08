import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export namespace AdminForm {
  export interface Props {

  }

  export interface State {
    modal: boolean;
  }
}

export class AdminForm extends React.Component<AdminForm.Props, AdminForm.State> {
  constructor(props: AdminForm.Props) {
    super(props);
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  };

  render() {
    return (
      <div className="container text-center">
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Наименование</th>
              <th>Описание</th>
              <th>Краткое описание</th>
              <th>Дополнительная информация</th>
              <th>Значок</th>
              <th>Цена</th>
              <th>Старая цена</th>
              <th>Звезды</th>
              <th>Изображения</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div><button className="btn btn-primary" onClick={this.toggle}>Новый товар</button></div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
