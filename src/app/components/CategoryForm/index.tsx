import * as React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {CategoryModel} from "app/models";

export namespace CategoryForm {
  export interface Props {
    categories: CategoryModel[]
  }

  export interface State {
    modal: boolean;
  }
}

export class CategoryForm extends React.Component<CategoryForm.Props, CategoryForm.State> {
  constructor(props: CategoryForm.Props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div>
        <div className="col-md-8">
          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>№ п/п</th>
                <th>Наименование</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td></td>
              <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div><button className="btn btn-primary" onClick={this.toggle}>Новая категория</button></div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>Товар</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="categoryName">Наименование</label>
                <input type="text" className="form-control" id="categoryName" />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Добавить</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Отмена</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
