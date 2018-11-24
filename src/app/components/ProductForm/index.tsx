import * as React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CategoryModel, ProductImageModel, ProductModel } from 'app/models';

export namespace ProductForm {
  export interface Props {
    products: ProductModel[];
    categories: CategoryModel[];

    addProduct: any;
  }

  export interface State {
    modal: boolean;

    categoryId: number;
    name: string;
    description: string;
    shortDescription: string;
    additionalInfo: string;
    badge: string;
    price: number;
    priceOld: number;
    stars: number;
    productImageList: string[];
  }
}

export class ProductForm extends React.Component<ProductForm.Props, ProductForm.State> {
  constructor(props: ProductForm.Props) {
    super(props);
    this.state = {
      modal: false,
      categoryId: 0,
      name: '',
      description: '',
      shortDescription: '',
      additionalInfo: '',
      badge: '',
      price: 0,
      priceOld: 0,
      stars: 1,
      productImageList: []
    };
  }

  componentWillReceiveProps(nextProps: ProductForm.Props) {
    if (nextProps.categories.length > 0 && this.state.categoryId != nextProps.categories[0].id) {
      this.setState({ categoryId: nextProps.categories[0].id });
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  clearState = () => {
    this.setState({
      categoryId: this.props.categories[0].id,
      name: '',
      description: '',
      shortDescription: '',
      additionalInfo: '',
      badge: '',
      price: 0,
      priceOld: 0,
      stars: 1,
      productImageList: []
    });
  };

  getList = () => {
    let list: any[] = [];
    this.props.products.forEach((item, index) => {
      list.push(
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.categoryId}</td>
          <td>{item.description}</td>
          <td>{item.shortDescription}</td>
          <td>{item.additionalInfo}</td>
          <td>{item.badge}</td>
          <td>{item.price}</td>
          <td>{item.priceOld}</td>
          <td>{item.stars}</td>
          <td>{this.getImgList(item.productImageList)}</td>
        </tr>
      );
    });
    return list;
  };

  getImgList = (imageUrls: ProductImageModel[]) => {
    return imageUrls.map((item) => {
      return <img key={item.id} src={item.url} width={100} height={100} />;
    });
  };

  getCategoryList = () => {
    return this.props.categories.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
  };

  handleAddProduct = () => {
    let product = {
      name: this.state.name,
      categoryId: this.state.categoryId,
      description: this.state.description,
      shortDescription: this.state.shortDescription,
      additionalInfo: this.state.additionalInfo,
      badge: this.state.badge,
      price: this.state.price,
      priceOld: this.state.priceOld,
      stars: this.state.stars,
      productImageList: this.state.productImageList
    };
    this.props.addProduct(product);
    this.clearState();
  };

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  };

  handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ categoryId: +e.target.value });
  };

  handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: e.target.value });
  };

  handleShortDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ shortDescription: e.target.value });
  };

  handleAddInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ additionalInfo: e.target.value });
  };

  handleBadgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ badge: e.target.value });
  };

  handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ price: +e.target.value });
  };

  handlePriceOldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ priceOld: +e.target.value });
  };

  handleStarsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ stars: +e.target.value });
  };

  handleImageListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let list = this.state.productImageList;
    list.push(e.target.value);
    this.setState({ productImageList: list });
  };

  render() {
    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th>№ п/п</th>
              <th>Наименование</th>
              <th>Категория</th>
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
          <tbody>{this.getList()}</tbody>
        </table>

        <div>
          <button className="btn btn-primary" onClick={this.toggle}>
            Новый товар
          </button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>Товар</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="productName">Наименование</label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  onChange={this.handleNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Категория</label>
                <select className="form-control" id="category" onChange={this.handleCategoryChange}>
                  {this.getCategoryList()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="productDesc">Описание</label>
                <textarea
                  className="form-control"
                  id="productDesc"
                  onChange={this.handleDescriptionChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productShortDesc">Краткое описание</label>
                <textarea
                  className="form-control"
                  id="productShortDesc"
                  onChange={this.handleShortDescriptionChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productAddInfo">Дополнительная информация</label>
                <textarea
                  className="form-control"
                  id="productAddInfo"
                  onChange={this.handleAddInfoChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productBadge">Значок</label>
                <input
                  type="text"
                  className="form-control"
                  id="productBadge"
                  onChange={this.handleBadgeChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productPrice">Цена</label>
                <input
                  type="text"
                  className="form-control"
                  id="productPrice"
                  onChange={this.handlePriceChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productOldPrice">Старая цена</label>
                <input
                  type="text"
                  className="form-control"
                  id="productOldPrice"
                  onChange={this.handlePriceOldChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productStars">Звезды</label>
                <select
                  className="form-control"
                  id="productStars"
                  onChange={this.handleStarsChange}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="productImages">Изображения</label>
                <input
                  type="text"
                  className="form-control"
                  id="productImages"
                  onChange={this.handleImageListChange}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                this.toggle();
                this.handleAddProduct();
              }}
            >
              Добавить
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Отмена
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
