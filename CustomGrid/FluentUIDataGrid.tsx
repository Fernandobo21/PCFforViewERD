import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: '16px',
  },
  fileIconCell: {
    textAlign: 'center',
    selectors: {
      '&:before': {
        content: '.',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
        width: '0px',
      },
    },
  },
  fileIconImg: {
    verticalAlign: 'middle',
    maxHeight: '16px',
    maxWidth: '16px',
  },
  controlWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectionDetails: {
    marginBottom: '15px',
  },
});
const controlStyles = {
  root: {
    margin: '0 30px 20px 0',
    maxWidth: '300px',
  },
};

export interface IDetailsListDocumentsExampleState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails: string;
  isModalSelection: boolean;
  announcedMessage?: string;
}

export interface IDocument {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

export class DetailsListDocumentsExample extends React.Component<{}, IDetailsListDocumentsExampleState> {
  private _selection: Selection;
  private _allItems: IDocument[];
  private _props:any;
  constructor(props:any) {
    super(props);
    this._props = props;
    debugger;
    this._allItems = _generateDocuments(props.valueCRM);
    var i:number = 0;
    
    // for(let columnName of props.columnsCRM)
    // {
    //   this._allColumns.push({
    //     key: 'column' + i++,
    //     name: columnName,
    //     className: classNames.fileIconCell,
    //     iconClassName: classNames.fileIconHeaderIcon,
    //     ariaLabel: 'Column operations for File type, Press to sort on File type',
    //     iconName: 'Page',
    //     isIconOnly: true,
    //     fieldName: 'name',
    //     minWidth: 16,
    //     maxWidth: 16,
    //     onColumnClick: this._onColumnClick,
    //     onRender: (item: IDocument) => (
    //       <TooltipHost content={`${item.fileType} file`}>
    //         <img src={item.iconName} className={classNames.fileIconImg} alt={`${item.fileType} file icon`} />
    //       </TooltipHost>
    //     )
    //   });
    // }
    let columns = this._getColumns(this._props.valueCRM, this._props.columnsCRM);
    
    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
        });
      },
    });

    this.state = {
      items: this._allItems,
      columns: columns,
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: true,
      announcedMessage: undefined,
    };
  }

  public render() {
    const { columns, items, selectionDetails, announcedMessage } = this.state;
    this._getColumns(this._props.valueCRM, this._props.columnsCRM);
    return (
      <Fabric>
        <div className={classNames.controlWrapper}>
          <TextField label="Filter by name:" onChange={this._onChangeText} styles={controlStyles} />
          <Announced message={`Number of items after filter applied: ${items.length}.`} />
        </div>
          <MarqueeSelection selection={this._selection}>
            <DetailsList
              items={items}
              compact={true}
              //columns={columns}
              columns={this._getColumns(this._props.valueCRM, this._props.columnsCRM)}
              selectionMode={SelectionMode.multiple}
              getKey={this._getKey}
              setKey="multiple"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              onItemInvoked={this._onItemInvoked}
              enterModalSelectionOnTouch={true}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              checkButtonAriaLabel="Row checkbox"
            />
          </MarqueeSelection>
          <div className={classNames.selectionDetails}>{selectionDetails}</div>
          <Announced message={selectionDetails} />
          {announcedMessage ? <Announced message={announcedMessage} /> : undefined}
      </Fabric>
    );
  }
  public componentDidUpdate(previousProps: any, previousState: IDetailsListDocumentsExampleState) {
    if (previousState.isModalSelection !== this.state.isModalSelection && !this.state.isModalSelection) {
      this._selection.setAllSelected(false);
    }
  }
  private _getKey(item: any, index?: number): string {
    return item.key;
  }
  private _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text?: string): void => {
    this.setState({
      items: text ? this._allItems.filter(i => i.firstName.toLowerCase().indexOf(text) > -1) : this._allItems,
    });
  };
  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.id}`);
  }
  private _getColumns(valueCRM:any, columnsCRM:any): IColumn[]{
    return [
      {
        key: valueCRM[0].id,
        name: capitalizeFirstLetter(columnsCRM[0]),
        fieldName: 'name',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
              return <span>{item.firstName}</span>;
        },
        data: 'string',
        isPadded: true,
      },
      {
        key: valueCRM[1].id,
        name: capitalizeFirstLetter(columnsCRM[1]),
        fieldName: 'modifiedBy',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.lastName}</span>;
        },
        isPadded: true,
      },
      {
        key: valueCRM[2].id,
        name: capitalizeFirstLetter(columnsCRM[2]),
        fieldName: 'fileSizeRaw',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'number',
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.age}</span>;
        },
      },
    ];
  }
  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();
    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as IDocument).firstName;
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, items } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        this.setState({
          announcedMessage: `${currColumn.name} is sorted ${
            currColumn.isSortedDescending ? 'descending' : 'ascending'
          }`,
        });
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);
    this.setState({
      columns: newColumns,
      items: newItems,
    });
  };
}
export default DetailsListDocumentsExample;
function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}
function capitalizeFirstLetter(value:string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function _generateDocuments(valueCRM:any) {
  const items: IDocument[] = [];
    valueCRM.map((value:any, index: number) => {
        items.push({
          id: value.id,
          firstName: value.firstName,
          lastName: value.lastName,
          age: value.age
        });
    });
  return items;
}
