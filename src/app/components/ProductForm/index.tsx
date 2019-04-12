import * as React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CategoryModel, ProductImageModel, ProductModel } from 'app/models';
import {FormattedMessage} from "react-intl";

export namespace ProductForm {
  export interface Props {
    products: ProductModel[];
    categories: CategoryModel[];

    addProduct: any;
    editProduct: any;
  }

  export interface State {
    modal: boolean;

    productId: number;
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
    imageUrl: string;
  }
}

export class ProductForm extends React.Component<ProductForm.Props, ProductForm.State> {
  constructor(props: ProductForm.Props) {
    super(props);
    this.state = {
      productId: 0,
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
      productImageList: [],
      imageUrl: ''
    };
  }

  componentWillReceiveProps(nextProps: ProductForm.Props) {
    if (nextProps.categories.length > 0 && this.state.categoryId != nextProps.categories[0].id) {
      this.setState({ categoryId: nextProps.categories[0].id });
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
    this.setState({
      productId: product.id ? product.id : 0,
      categoryId: product.categoryId,
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription,
      additionalInfo: product.additionalInfo,
      badge: product.badge,
      price: product.price,
      priceOld: product.priceOld,
      stars: product.stars,
      productImageList: product.productImageList.map(item => item.url),
      imageUrl: '',
      modal: true
    });
  };

  clearState = () => {
    this.setState({
      productId: 0,
      categoryId: this.props.categories[0].id,
      name: '',
      description: '',
      shortDescription: '',
      additionalInfo: '',
      badge: '',
      price: 0,
      priceOld: 0,
      stars: 1,
      productImageList: [],
      imageUrl: ''
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

  getImgListString = (imageUrls: string[]) => {
    return imageUrls.map((item, index) => {
      return <img key={index} src={item} width={100} height={100} />;
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
      id: this.state.productId,
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
    if (this.state.productId == 0) {
      this.props.addProduct(product);
    } else {
      this.props.editProduct(product);
    }
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

  handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ imageUrl: e.target.value });
  };

  handleImageAddMore = () => {
    let list = this.state.productImageList;
    list.push(this.state.imageUrl);
    this.setState({ productImageList: list, imageUrl: '' });
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
                <input type="text" className="form-control" id="productName" defaultValue={this.state.name}
                       onChange={this.handleNameChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="category"><FormattedMessage id="category" defaultMessage="Category" /></label>
                <select className="form-control" id="category" defaultValue={this.state.categoryId.toString()}
                        onChange={this.handleCategoryChange}>
                  {this.getCategoryList()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="productDesc"><FormattedMessage id="description" defaultMessage="Description" /></label>
                <textarea className="form-control" id="productDesc" defaultValue={this.state.description}
                          onChange={this.handleDescriptionChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="productShortDesc">
                  <FormattedMessage id="shortDescription" defaultMessage="Short description" />
                </label>
                <textarea className="form-control" id="productShortDesc" defaultValue={this.state.shortDescription}
                          onChange={this.handleShortDescriptionChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="productAddInfo">
                  <FormattedMessage id="extraInfo" defaultMessage="Extra information" />
                </label>
                <textarea className="form-control" id="productAddInfo" defaultValue={this.state.additionalInfo}
                          onChange={this.handleAddInfoChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="productBadge"><FormattedMessage id="badge" defaultMessage="Badge" /></label>
                <input type="text" className="form-control" id="productBadge" defaultValue={this.state.badge}
                       onChange={this.handleBadgeChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="productPrice"><FormattedMessage id="price" defaultMessage="Price" /></label>
                <input type="text" className="form-control" id="productPrice" defaultValue={this.state.price.toString()}
                       onChange={this.handlePriceChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="productOldPrice"><FormattedMessage id="oldPrice" defaultMessage="Old price" /></label>
                <input type="text" className="form-control" id="productOldPrice" defaultValue={this.state.priceOld.toString()}
                       onChange={this.handlePriceOldChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="productStars"><FormattedMessage id="stars" defaultMessage="Stars" /></label>
                <select className="form-control" id="productStars" defaultValue={this.state.stars.toString()}
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
                {this.getImgListString(this.state.productImageList)}
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { this.toggle(); this.handleAddProduct(); } }>
              <FormattedMessage id={this.state.productId == 0 ? "add" : "edit"}
                                defaultMessage={this.state.productId == 0 ? "Add" : "Edit"} />
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
