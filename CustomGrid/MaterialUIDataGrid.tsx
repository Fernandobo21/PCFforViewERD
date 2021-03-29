import * as React from 'react';
import { DataGrid, ColDef, CellParams} from '@material-ui/data-grid';

export class MaterialUIDataGrid extends React.Component<{}> {
  private _rows:any;
  private _columns:ColDef[];
  constructor(props:any) {
    super(props);
    this._generateColumns(props.columnsCRM, props.typeCRM, props.namesColumnsCRM);
    this._generateRows(props.valueCRM);
  } 
  public render() {
    return (<div style={{width: '99%', height: '99%'}}><DataGrid rows={this._rows} columns={this._columns} pageSize={5} checkboxSelection rowHeight={25} onCellClick={this.onCellClickEventHandler}/></div>);
  } 
  public _generateColumns(columnsCRM:any, typeCRM:any, columnsDisplayNameCRM:any)
  {
    this._columns = [];
    columnsCRM.map((value: string, index: number) => {
      this._columns.push(
        {
          field: value,
          headerName: this.capitalizeFirstLetter(columnsDisplayNameCRM[index]),
          width: 130,
          type: typeCRM[index]
        }
      );
    });
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
  public onCellClickEventHandler(params:CellParams)
  {
    alert("Selected: " + params.row.id);
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
           lastname: value.lastName,
           firstname: value.firstName,
           new_age: value.age
         }
       );
     });
  }
};
export default MaterialUIDataGrid;
