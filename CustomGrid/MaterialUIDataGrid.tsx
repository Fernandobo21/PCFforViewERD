import * as React from 'react';
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';

export class MaterialUIDataGrid extends React.Component<{}> {
  private _rows:any;
  private _columns:ColDef[];
  constructor(props:any) {
    super(props);
    this._generateColumns(props.keyCRM, props.columnsCRM);
    this._generateRows(props.keyCRM, props.valueCRM);
  } 
  public render() {
    return (<div style={{width: '1500px', height: '400px'}}><DataGrid rows={this._rows} columns={this._columns} pageSize={5} checkboxSelection /></div>);
  } 
  public _generateColumns(keyCRM:any, columnsCRM:any)
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
  public _generateRows(keyCRM:any, valueCRM:any)
  {
    this._rows = [];
    keyCRM.map((value: string, index: number) => {
       this._rows.push(
         {
           id: value,
           lastName: "Bo " + index,
           firstName: "Fernando " + index,
           age: index
         }
       );
     });
  }
};
export default MaterialUIDataGrid;
