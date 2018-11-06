import * as React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ProductModel } from 'app/models';

export namespace ProductForm {
  export interface Props {
    products: ProductModel[];
  }

  export interface State {
    modal: boolean;
  }
}

export class ProductForm extends React.Component<ProductForm.Props, ProductForm.State> {
  constructor(props: ProductForm.Props) {
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
                <input type="text" className="form-control" id="productName" />
              </div>
              <div className="form-group">
                <label htmlFor="productDesc">Описание</label>
                <textarea className="form-control" id="productDesc" />
              </div>
              <div className="form-group">
                <label htmlFor="productShortDesc">Краткое описание</label>
                <textarea className="form-control" id="productShortDesc" />
              </div>
              <div className="form-group">
                <label htmlFor="productAddInfo">Дополнительная информация</label>
                <textarea className="form-control" id="productAddInfo" />
              </div>
              <div className="form-group">
                <label htmlFor="productBadge">Значок</label>
                <input type="text" className="form-control" id="productBadge" />
              </div>
              <div className="form-group">
                <label htmlFor="productPrice">Цена</label>
                <input type="text" className="form-control" id="productPrice" />
              </div>
              <div className="form-group">
                <label htmlFor="productOldPrice">Старая цена</label>
                <input type="text" className="form-control" id="productOldPrice" />
              </div>
              <div className="form-group">
                <label htmlFor="productStars">Звезды</label>
                <select className="form-control" id="productStars">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="productImages">Изображения</label>
                <input type="file" className="form-control-file" id="productImages" />
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
