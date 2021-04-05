import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;
import MaterialUIDataGrid, * as MaterialGridReplacement from './MaterialUIDataGrid';
import FluentUIDataGrid, * as FluentUIGridReplacement from './FluentUIDataGrid';

export class CustomGrid implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _container: HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;
	private props:any = {
		columnsCRM: [],
		namesColumnsCRM: [],
		valueCRM: [],
		typeCRM: []
	};
	/**
	 * Empty constructor.
	 */
	constructor()
	{}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */      
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._container = container;
		this._context = context;
		this.props = {
			valueCRM: [],
			namesColumnsCRM: [],
			columnsCRM: [],
			typeCRM: ['string','string','string','number']
			/*
				'string'
				'number'
				'date'
				'dateTime'
			*/
		}
		this.fillColumns(this._context.parameters.sampleDataSet.columns);
		this.fillValues(this._context.parameters.sampleDataSet);
		this.renderView(this._context.parameters.gridSelect.raw);
	}
	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this.props = {
			valueCRM: [],
			namesColumnsCRM: [],
			columnsCRM: [],
			typeCRM: ['string', 'string', 'string', 'number']
			/*
				'string' (default)
				'number'
				'date'
				'dateTime'
			*/
		}
		this.fillColumns(this._context.parameters.sampleDataSet.columns);
		this.fillValues(this._context.parameters.sampleDataSet);
		this.renderView(this._context.parameters.gridSelect.raw);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		this.props = null;
		ReactDOM.unmountComponentAtNode(this._container);
	}

	public renderView(selectedGrid: string)
	{
		switch(selectedGrid)
		{
			case "FluentUI":
				return ReactDOM.render(
					React.createElement(
						FluentUIDataGrid,
						this.props
					),
					this._container
				);
			case "MaterialUI":
				return ReactDOM.render(
					React.createElement(
						MaterialUIDataGrid,
						this.props
					),
					this._container
				);			
		}
	}
	private fillColumns(columns:DataSetInterfaces.Column[])
	{
		columns.map((column: DataSetInterfaces.Column) => {
			if (!column.isHidden) this.props.columnsCRM.push(column.name);
			this.props.namesColumnsCRM.push(column.displayName);
		});
	}
	private fillValues(dataset:ComponentFramework.PropertyTypes.DataSet)
	{
		for (let currentRecordId of dataset.sortedRecordIds) {
			let currentRecord = dataset.records[currentRecordId];
			if(currentRecord.getFormattedValue(this.props.columnsCRM[1]) != null) {
				this.props.valueCRM.push(
					{
						id: currentRecordId,
						firstName: (currentRecord.getFormattedValue(this.props.columnsCRM[0]) != null) ? currentRecord.getFormattedValue(this.props.columnsCRM[0]) : "",
						lastName: (currentRecord.getFormattedValue(this.props.columnsCRM[1]) != null) ? currentRecord.getFormattedValue(this.props.columnsCRM[1]) : "",
						age: (currentRecord.getFormattedValue(this.props.columnsCRM[2]) != null) ? currentRecord.getFormattedValue(this.props.columnsCRM[2]) : 0
					});
			}
		}
	}
}
