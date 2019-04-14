import * as React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CategoryModel, ProductImageModel, ProductModel } from 'app/models';
import {FormattedMessage} from "react-intl";

export namespace ProductForm {
  export interface Props {
    products: ProductModel[];
    categories: CategoryModel[];

    addProduct: any;
    updateProduct: any;
  }

  export interface State {
    modal: boolean;

    product: ProductModel
    imageUrl: string;
  }
}

export class ProductForm extends React.Component<ProductForm.Props, ProductForm.State> {
  constructor(props: ProductForm.Props) {
    super(props);
    const product: ProductModel = this.createEmptyProduct();
    this.state = {
      modal: false,
      product: product,

      imageUrl: ''
    };
  }

  createEmptyProduct = (): ProductModel => {
    return { id: 0, categoryId: this.props.categories.length > 0 ? this.props.categories[0].id : 0,
      name: '', description: '', shortDescription: '',
      additionalInfo: '', badge: '', price: 0, priceOld: 0, stars: 1, productImageList: [] };
  };

  componentWillReceiveProps(nextProps: ProductForm.Props) {
    let newProduct = {...this.state.product};
    if (nextProps.categories.length > 0 && newProduct.categoryId != nextProps.categories[0].id) {
      newProduct.categoryId = nextProps.categories[0].id;
      this.setState({ product: newProduct });
    }
  }

  toggle = () => {
    if (!this.state.modal) {
      this.clearState();
    }
    this.setState({
      modal: !this.state.modal
    });
  };

  handleEditClick = (product: ProductModel) => {
    this.setState({ product: product, modal: true });
  };

  clearState = () => {
    this.setState({ product: this.createEmptyProduct() })
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
          <td><div className="action-div">
            <span onClick={() => {this.handleEditClick(item)}}><i className="fas fa-pen"/></span>
            <span><i className="fas fa-trash"/></span></div></td>
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
    if (this.state.product.id == 0) {
      this.props.addProduct(this.state.product);
    } else {
      this.props.updateProduct(this.state.product);
    }
    this.clearState();
  };

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newProduct = { ...this.state.product };
    newProduct.name = e.target.value;
    this.setState({ product: newProduct });
  };

  handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newProduct = { ...this.state.product };
    newProduct.categoryId = +e.target.value;
    this.setState({ product: newProduct });
  };

  handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newProduct = { ...this.state.product };
    newProduct.description = e.target.value;
    this.setState({ product: newProduct });
  };

  handleShortDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newProduct = { ...this.state.product };
    newProduct.shortDescription = e.target.value;
    this.setState({ product: newProduct });
  };

  handleAddInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newProduct = { ...this.state.product };
    newProduct.additionalInfo = e.target.value;
    this.setState({ product: newProduct });
  };

  handleBadgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newProduct = { ...this.state.product };
    newProduct.badge = e.target.value;
    this.setState({ product: newProduct });
  };

  handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newProduct = { ...this.state.product };
    newProduct.price = +e.target.value;
    this.setState({ product: newProduct });
  };

  handlePriceOldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newProduct = { ...this.state.product };
    newProduct.priceOld = +e.target.value;
    this.setState({ product: newProduct });
  };

  handleStarsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newProduct = { ...this.state.product };
    newProduct.stars = +e.target.value;
    this.setState({ product: newProduct });
  };

  handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ imageUrl: e.target.value });
  };

  handleImageAddMore = () => {
    let newProduct = { ...this.state.product };
    let list = newProduct.productImageList;
    list.push({ id: 0, url: this.state.imageUrl });
    newProduct.productImageList = list;
    this.setState({ product: newProduct, imageUrl: '' });
  };

  render() {
    const emptyList = this.getList().length == 0 ? <tr><td colSpan={12} align="center">
      <FormattedMessage id="noRecords" defaultMessage="No records" /></td></tr> : null;

    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th><FormattedMessage id="itemNumber" defaultMessage="#" /></th>
              <th><FormattedMessage id="nomination" defaultMessage="Name" /></th>
              <th><FormattedMessage id="category" defaultMessage="Category" /></th>
              <th><FormattedMessage id="description" defaultMessage="Description" /></th>
              <th><FormattedMessage id="shortDescription" defaultMessage="Short description" /></th>
              <th><FormattedMessage id="extraInfo" defaultMessage="Extra information" /></th>
              <th><FormattedMessage id="badge" defaultMessage="Badge" /></th>
              <th><FormattedMessage id="price" defaultMessage="Price" /></th>
              <th><FormattedMessage id="oldPrice" defaultMessage="Old price" /></th>
              <th><FormattedMessage id="stars" defaultMessage="Stars" /></th>
              <th><FormattedMessage id="images" defaultMessage="Images" /></th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.getList()}
            {emptyList}
          </tbody>
        </table>

        <div>
          <button className="btn btn-primary" onClick={this.toggle}>
            <FormattedMessage id="newProduct" defaultMessage="New product" />
          </button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}><FormattedMessage id="product" defaultMessage="Product" /></ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="productName"><FormattedMessage id="nomination" defaultMessage="Name" /></label>
                <input type="text" className="form-control" id="productName" defaultValue={this.state.product.name}
                       onChange={this.handleNameChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="category"><FormattedMessage id="category" defaultMessage="Category" /></label>
                <select className="form-control" id="category" defaultValue={this.state.product.categoryId.toString()}
                        onChange={this.handleCategoryChange}>
                  {this.getCategoryList()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="productDesc"><FormattedMessage id="description" defaultMessage="Description" /></label>
                <textarea className="form-control" id="productDesc" defaultValue={this.state.product.description}
                          onChange={this.handleDescriptionChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="productShortDesc">
                  <FormattedMessage id="shortDescription" defaultMessage="Short description" />
                </label>
                <textarea className="form-control" id="productShortDesc" defaultValue={this.state.product.shortDescription}
                          onChange={this.handleShortDescriptionChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="productAddInfo">
                  <FormattedMessage id="extraInfo" defaultMessage="Extra information" />
                </label>
                <textarea className="form-control" id="productAddInfo" defaultValue={this.state.product.additionalInfo}
                          onChange={this.handleAddInfoChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="productBadge"><FormattedMessage id="badge" defaultMessage="Badge" /></label>
                <input type="text" className="form-control" id="productBadge" defaultValue={this.state.product.badge}
                       onChange={this.handleBadgeChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="productPrice"><FormattedMessage id="price" defaultMessage="Price" /></label>
                <input type="text" className="form-control" id="productPrice" defaultValue={this.state.product.price.toString()}
                       onChange={this.handlePriceChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="productOldPrice"><FormattedMessage id="oldPrice" defaultMessage="Old price" /></label>
                <input type="text" className="form-control" id="productOldPrice" defaultValue={this.state.product.priceOld.toString()}
                       onChange={this.handlePriceOldChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="productStars"><FormattedMessage id="stars" defaultMessage="Stars" /></label>
                <select className="form-control" id="productStars" defaultValue={this.state.product.stars.toString()}
                        onChange={this.handleStarsChange}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="productImages"><FormattedMessage id="images" defaultMessage="Images" /></label>
                <input type="text" className="form-control" id="productImages" value={this.state.imageUrl}
                       onChange={this.handleImageUrlChange}/>
              </div>
              <div className="form-group">
                <Button color="primary" type="button" onClick={this.handleImageAddMore}>
                  <FormattedMessage id="add" defaultMessage="Add" />
                </Button>
              </div>
              <div>
                {this.getImgList(this.state.product.productImageList)}
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { this.toggle(); this.handleAddProduct(); } }>
              <FormattedMessage id={this.state.product.id == 0 ? "add" : "edit"}
                                defaultMessage={this.state.product.id == 0 ? "Add" : "Edit"} />
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              <FormattedMessage id="cancel" defaultMessage="Cancel" />
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
