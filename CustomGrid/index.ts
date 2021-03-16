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
		keyCRM: [],
		columnsCRM: [],
		valueCRM: [],
		typeCRM: []
	};

	/**
	 * Empty constructor.
	 */
	constructor()
	{
	}

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
		this.props = {
			keyCRM: ['19449c33-f214-4365-9739-3f54a7420166', '3a78f665-d31d-444a-b19b-fd72e69d35bf', '56dafe62-14cc-45cc-86c7-74a789283c76', '3d2880c3-7c62-42ea-bb4d-9ecec0607334', '0c566692-79d7-4172-aeaf-9f7fb98429f6', '89a7f0da-1c9c-4583-b395-e4b3afec39b7', '3f25b208-0d70-4913-80b4-0999724fab5a', '1fc52a93-a3e7-4a6a-ad49-009597282c72', 'ac6372fa-f1ca-4748-9051-17e6fc802536', 'f76baa88-98c5-41eb-b253-be669618eeda'],
			valueCRM: [
				{id: '19449c33-f214-4365-9739-3f54a7420166', lastName: 'Bo Gimenez', firstName: 'Fernando', age: 36},
				{id: '3a78f665-d31d-444a-b19b-fd72e69d35bf', lastName: 'Cuesta Vera', firstName: 'Cesar', age: 25},
				{id: '56dafe62-14cc-45cc-86c7-74a789283c76', lastName: 'Rincon Dynamics', firstName: 'El', age: 11}],
			columnsCRM: ['id', 'firstName', 'lastName', 'age'],
			typeCRM: ['string', 'string', 'string', 'number']
			/*
				'string' (default)
				'number'
				'date'
				'dateTime'
			*/
		}
		context.mode.allocatedHeight = 1000;
		context.mode.allocatedWidth = 1000;
		this._context = context;
		this._container = container;
	}
	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		context.mode.allocatedHeight = 1000;
		context.mode.allocatedWidth = 1000;
		
		this.props = {
			keyCRM: ['19449c33-f214-4365-9739-3f54a7420166', '3a78f665-d31d-444a-b19b-fd72e69d35bf', '56dafe62-14cc-45cc-86c7-74a789283c76', '3d2880c3-7c62-42ea-bb4d-9ecec0607334', '0c566692-79d7-4172-aeaf-9f7fb98429f6', '89a7f0da-1c9c-4583-b395-e4b3afec39b7', '3f25b208-0d70-4913-80b4-0999724fab5a', '1fc52a93-a3e7-4a6a-ad49-009597282c72', 'ac6372fa-f1ca-4748-9051-17e6fc802536', 'f76baa88-98c5-41eb-b253-be669618eeda'],
			valueCRM: [
				{id: '19449c33-f214-4365-9739-3f54a7420166', lastName: 'Bo Gimenez', firstName: 'Fernando', age: 36},
				{id: '3a78f665-d31d-444a-b19b-fd72e69d35bf', lastName: 'Cuesta Vera', firstName: 'Cesar', age: 25},
				{id: '56dafe62-14cc-45cc-86c7-74a789283c76', lastName: 'Rincon Dynamics', firstName: 'El', age: 11}],
			columnsCRM: ['id', 'firstName', 'lastName', 'age'],
			typeCRM: ['string', 'string', 'string', 'number']
			/*
				'string' (default)
				'number'
				'date'
				'dateTime'
			*/
		}

		var alertStrings = {​​ confirmButtonLabel: "Yes", text: "This is an alert.", title: "Sample title" }​​; 
		var alertOptions = {​​ height: 120, width: 260 }​​;
		
		for (let currentRecordId of this._context.parameters.sampleDataSet.sortedRecordIds) {
			let currentRecord = this._context.parameters.sampleDataSet.records[currentRecordId];
			debugger;
			let name = currentRecord.getFormattedValue("NameAttribute");
			let number = currentRecord.getValue("NumberAttribute");	
		}
		
		//context.navigation.openAlertDialog(alertStrings, alertOptions).then( function (success) {​​ console.log("Alert dialog closed"); }​​, function (error) {​​ console.log(error.message); }​​ );
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
}
