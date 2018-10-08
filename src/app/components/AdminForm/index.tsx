import * as React from 'react';

export class AdminForm extends React.Component {
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
        <div><button className="btn btn-primary">Новый товар</button></div>
      </div>
    );
  }
}
