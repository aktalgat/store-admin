import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CategoryModel } from 'app/models';

export namespace CategoryForm {
  export interface Props {
    categories: CategoryModel[];

    addCategory: any;
    updateCategory: any;
  }

  export interface State {
    modal: boolean;

    category: CategoryModel;
  }
}

export class CategoryForm extends React.Component<CategoryForm.Props, CategoryForm.State> {
  constructor(props: CategoryForm.Props) {
    super(props);
    this.state = {
      category: this.createEmptyCategory(),
      modal: false
    };
  }

  clearState = () => {
    this.setState({ category: this.createEmptyCategory() });
  };

  createEmptyCategory = (): CategoryModel => {
    return { id: 0, name: ''}
  };

  toggle = () => {
    if (!this.state.modal) {
      this.clearState();
    }
    this.setState({
      modal: !this.state.modal
    });
  };

  getList = () => {
    let list: any[] = [];
    this.props.categories.forEach((item, index) => {
      list.push(
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td className="action-td"><div className="action-div">
            <span onClick={() => this.handleEditClick(item)}><i className="fas fa-pen"/></span>
            <span><i className="fas fa-trash"/></span>
          </div></td>
        </tr>
      );
    });
    return list;
  };

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newCategory = { ...this.state.category };
    newCategory.name = e.target.value;
    this.setState({ category: newCategory });
  };

  handleAddClick = () => {
    if (this.state.category.id == 0) {
      this.props.addCategory(this.state.category);
    } else {
      this.props.updateCategory(this.state.category);
    }
    this.clearState();
  };

  handleEditClick = (category: CategoryModel) => {
    this.setState({ category: category, modal: true });
  };

  render() {
    const emptyList = this.getList().length == 0 ? <tr><td colSpan={3} align="center">
      <FormattedMessage id="noRecords" defaultMessage="No records" /></td></tr> : null;

    return (
      <div>
        <div className="col-md-8">
          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th><FormattedMessage id="itemNumber" defaultMessage="#" /></th>
                <th><FormattedMessage id="nomination" defaultMessage="Name" /></th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {this.getList()}
              {emptyList}
            </tbody>
          </table>
        </div>
        <div><button className="btn btn-primary" onClick={this.toggle}>
          <FormattedMessage id="newCategory" defaultMessage="New category" />
        </button></div>

        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>
            <FormattedMessage id="category" defaultMessage="Category" />
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="categoryName"><FormattedMessage id="nomination" defaultMessage="Name" /></label>
                <input type="text" className="form-control" id="categoryName" defaultValue={this.state.category.name}
                       onChange={this.handleNameChange} />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {this.toggle(); this.handleAddClick()}}>
              <FormattedMessage id={this.state.category.id == 0 ? "add" : "edit"}
                                defaultMessage={this.state.category.id == 0 ? "Add" : "Edit"} />
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
