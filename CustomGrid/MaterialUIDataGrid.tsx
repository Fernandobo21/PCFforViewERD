import * as React from 'react';
import { DataGrid, ColDef} from '@material-ui/data-grid';

export class MaterialUIDataGrid extends React.Component<{}> {
  private _rows:any;
  private _columns:ColDef[];
  constructor(props:any) {
    super(props);
    this._generateColumns(props.columnsCRM, props.typeCRM);
    this._generateRows(props.valueCRM);
  } 
  public render() {
    return (<div style={{width: '1500px', height: '400px'}}><DataGrid rows={this._rows} columns={this._columns} pageSize={5} checkboxSelection /></div>);
  } 
  public _generateColumns(columnsCRM:any, typeCRM:any)
  {
    this._columns = [];
    columnsCRM.map((value: string, index: number) => {
      this._columns.push(
        {
          field: value,
          headerName: this.capitalizeFirstLetter(value),
          width: 130,
          type: typeCRM[index]
        }
      );
    });
    // this._columns = [
    //   { field: 'id', headerName: 'ID', width: 70 },
    //   { field: 'firstName', headerName: 'First name', width: 130 },
    //   { field: 'lastName', headerName: 'Last name', width: 130 },
    //   {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 90,
    //   },
    //   {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: ValueGetterParams) =>
    //       `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    //   },
    // ];
  }
  public capitalizeFirstLetter(value:string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  public _generateRows(valueCRM:any)
  {
    this._rows = [];
    valueCRM.map((value:any, index: number) => {
       this._rows.push(
         {
           id: value.id,
           lastName: value.lastName,
           firstName: value.firstName,
           age: value.age
         }
       );
     });
  }
};
export default MaterialUIDataGrid;
