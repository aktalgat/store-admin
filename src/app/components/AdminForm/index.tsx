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
              <th>№ п/п</th>
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
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>Товар</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="productName">Наименование</label>
                <input type="text" className="form-control" id="productName" placeholder="Хлеб" />
              </div>
              <div className="form-group">
                <label htmlFor="productName">Описание</label>
                <textarea className="form-control" id="productName" />
              </div>
              <div className="form-group">
                <label htmlFor="productName">Краткое описание</label>
                <textarea className="form-control" id="productName" />
              </div>
              <div className="form-group">
                <label htmlFor="productName">Дополнительная информация</label>
                <textarea className="form-control" id="productName" />
              </div>
              <div className="form-group">
                <label htmlFor="productName">Значок</label>
                <input type="text" className="form-control" id="productName" />
              </div>
              <div className="form-group">
                <label htmlFor="productName">Цена</label>
                <input type="text" className="form-control" id="productName" />
              </div>
              <div className="form-group">
                <label htmlFor="productName">Старая цена</label>
                <input type="text" className="form-control" id="productName" />
              </div>
              <div className="form-group">
                <label htmlFor="productName">Звезды</label>
                <input type="text" className="form-control" id="productName" />
              </div>
              <div className="form-group">
                <label htmlFor="productName">Изображения</label>
                <input type="file" className="form-control-file" id="productName"  />
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
