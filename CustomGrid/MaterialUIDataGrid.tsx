import * as React from 'react';
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';

export class MaterialUIDataGrid extends React.Component<{}> {
  private _rows:any;
  private _columns:ColDef[];
  constructor(props:any) {
    super(props);
    this._generateColumns(props.keyCRM, props.columnsCRM);
  }
  public render() {
    this._generateRows();
    
    return (<div style={{width: '1500px', height: '400px'}}><DataGrid rows={this._rows} columns={this._columns} pageSize={5} checkboxSelection /></div>);
  } 
  public _generateColumns(keyCRM:[], columnsCRM:[])
  {
    // keyCRM.map((value: string, index: number) => {
    //   this._columns.push(
    //     {
    //       field: value,
    //       headerName: columnsCRM[index],
    //       width: 70
    //     }
    //   );
    // });
    this._columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'firstName', headerName: 'First name', width: 130 },
      { field: 'lastName', headerName: 'Last name', width: 130 },
      {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
      },
      {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: ValueGetterParams) =>
          `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
      },
    ];
  }
  public _generateRows()
  {
    this._rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
  }
};
export default MaterialUIDataGrid;
