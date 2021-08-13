import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as $ from "jquery";
import * as Bootstrap from "bootstrap";

export class AdvancedAccountSearch implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private localNotifyOutputChanged: () => void;
	/**
	 * HTML Elements
	 */
	private context: ComponentFramework.Context<IInputs>;
	private container: HTMLDivElement;
	private label: HTMLLabelElement;
	private buttonContainer: HTMLDivElement;
	private button: HTMLButtonElement;
	private inputElement: HTMLInputElement;
	private datalistElement: HTMLDataListElement;

	/**
	 * Private Variables
	 */
	private id: string;
	private _value: string;
	private _searchDeff: string;
	private _optionsHTMLArray: Array<string>;

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
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
	{
		// Add control initialization code
		this.localNotifyOutputChanged = notifyOutputChanged;
		this.context = context;
		// @ts-ignore
		this._searchDeff = context.parameters.searchDeff.raw;

		// @ts-ignore
		this.id = context.parameters.value.attributes?.LogicalName;

		this.container = document.createElement("div");
		this.container.className = "ms-SearchBox";
		this.container.setAttribute("style", "width:100%");

		this.label = document.createElement("label");
		this.label.className = "ms-SearchBox-label";
		this.label.innerHTML = "<i class='ms-SearchBox-icon ms-Icon ms-Icon--Search'></i>";

		this.buttonContainer = document.createElement("div");
        this.buttonContainer.className = "ms-CommandButton ms-SearchBox-clear ms-CommandButton--noLabel"
        this.buttonContainer.setAttribute("style", "display:block");

		this.button = document.createElement("button");
        this.button.className = "ms-CommandButton-button"
        this.button.innerHTML = '<span class="ms-CommandButton-icon"><i class="ms-Icon ms-Icon--Search"></i></span><span class="ms-CommandButton-label"></span> ';
		this.button.addEventListener("click", this.onSearchPress.bind(this));

		this.inputElement = document.createElement("input");
		this.inputElement.id = "input_data";
        this.inputElement.name = "autocomplete_data";
        this.inputElement.placeholder = "Search using text...";
        this.inputElement.autocomplete = "off";
        this.inputElement.className = "ms-SearchBox-field"
        this.inputElement.setAttribute("list", "list_data");
        this.inputElement.setAttribute("style", "width:100%");
		this.inputElement.setAttribute("data-list-focus","true");
		// Get initial values from field.
        // @ts-ignore
        this.inputElement.value = this.context.parameters.value.formatted;

        // Add an eventlistner the element and bind it to a  function.
        this.inputElement.addEventListener("keydown", this.hadleKeyEvents.bind(this));

		// creating HTML elements for data list 
        this.datalistElement = document.createElement("datalist");
		this.datalistElement.addEventListener("selectionchange", this.onSelect.bind(this));
        this.datalistElement.id = "list_data";

        var optionsHTML = "";

        //@ts-ignore 
        this.datalistElement.innerHTML = optionsHTML;		

		this.buttonContainer.appendChild(this.button);
		this.container.appendChild(this.label);
		this.container.appendChild(this.buttonContainer);
		this.container.appendChild(this.inputElement);

		this.container.appendChild(this.datalistElement);
		container.appendChild(this.container);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		//alert(this._value);
		const result: IOutputs = {
			value: this._value
		};
		return result;
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

	public onSearchPress(evt: Event) {
        console.log("Clear Fields")

        //this.searchForData();
        //this.localNotifyOutputChanged();
		var value = $('#input_data').val();
        //alert($('#list_data [value="' + value + '"]').data('value'));

		//this.getOutputs().value. = value;
		//@ts-ignore 
		this._value = $('#list_data [value="' + value + '"]').data('value') as string;
		this.localNotifyOutputChanged();
    }

	public onSelect(evt: Event) {
		var value = $('#input_data').val();
		//alert(value);

		alert($('#list_data [value="' + value + '"]').data('value'));
		//@ts-ignore 
		this._value = $('#list_data [value="' + value + '"]').data('value') as string;
		this.localNotifyOutputChanged();
		
    }

	public hadleKeyEvents(evt: KeyboardEvent) {
        if (evt.key === "Enter") {
			this.searchForData();
        }
    }

	public async searchForData() {
		debugger;
		this.datalistElement.innerHTML = "";
		let input = (this.inputElement.value as any) as string;
		if(input.length > 2) {
			debugger;
			this._optionsHTMLArray = [];
			let jsonData = JSON.parse(this._searchDeff);
			for(let iIndex = 0; iIndex < jsonData.data.length; iIndex++) {
				let data = JSON.stringify(jsonData.data[iIndex]);
				await this.seachCRM(input,data);
			}

			this.datalistElement.innerHTML = this._optionsHTMLArray.join("");
			// let fetchXML = "<fetch top='20' ><entity name='contact' ><attribute name='contactid' /><attribute name='fullname' /><attribute name='emailaddress1' /><filter><condition attribute='emailaddress1' operator='like' value='" + input + "%' /></filter></entity></fetch>";
			// //let test = 'hello'
			// this.context.webAPI.retrieveMultipleRecords("contact","?fetchXml=" + fetchXML).then(
			// 	(response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
			// 		debugger;
			// 		for(let iIndex = 0; iIndex < response.entities.length; iIndex++){
			// 			let contact = response.entities[iIndex];

			// 			let option = '<option data-value="' + contact.contactid +'|contact|' + contact.fullname + '" value="' + contact.fullname + '">' + contact.emailaddress1 + ' Contact: ' + contact.fullname + '</option>'
			// 			optionsHTMLArray.push(option);
			// 		}

			// 		this.datalistElement.innerHTML = optionsHTMLArray.join("");
			// 	},
			// 	(errorResponse) => {
			// 		debugger;
			// 		alert(errorResponse);
			// 	}
			// );
			// for (var i = 0; i < response.items.length; i++) {
			// 	// Build the values for the AutoComplete Array and Add ID for after select use.
			// 	var lastTradingName = ((response.items[i].tradingNames.length > 0) ? this.titleCase(response.items[i].tradingNames[0].name) : this.titleCase(response.items[i].entityName));
			/* let strText = "ONE";
			let option = '<option data-value="' + strText +'|contact" value="' + strText + '">Other: ' + strText + ', T/A: ' + strText + '</option>'
			//alert(option);
			optionsHTMLArray.push(option);

			strText = "TWO";
			option = '<option data-value="' + strText +'|contact" value="' + strText + '">Other: ' + strText + ', T/A: ' + strText + '</option>'
			//alert(option);
			optionsHTMLArray.push(option);

			strText = "THREE";
			option = '<option data-value="' + strText +'|contact" value="' + strText + '">Other: ' + strText + ', T/A: ' + strText + '</option>'
			//alert(option);
			optionsHTMLArray.push(option);

			strText = "FOUR";
			option = '<option data-value="' + strText +'|contact" value="' + strText + '">Other: ' + strText + ', T/A: ' + strText + '</option>' */
			//alert(option);
			//optionsHTMLArray.push(option);
			//}
			//alert(optionsHTMLArray.join(""));
						
		}
	} // public searchForData()

	public async seachCRM(input: string, entity: string) {
		
		let entityDetails = JSON.parse(entity);

		let fetchXML = "<fetch top='20' ><entity name='" + entityDetails.entity + "' ><attribute name='" + entityDetails.idfield + "' /><attribute name='" + entityDetails.searchfield + "' />";
		for(let iIndex = 0; iIndex < entityDetails.displayfields.length; iIndex++) {
			fetchXML += "<attribute name='" + entityDetails.displayfields[iIndex] + "' />";
		}
		fetchXML += "<filter><condition attribute='" + entityDetails.searchfield + "' operator='like' value='" + input + "%' /></filter></entity></fetch>";

		//let test = 'hello'
		await this.context.webAPI.retrieveMultipleRecords(entityDetails.entity,"?fetchXml=" + fetchXML).then(
			(response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
				debugger;
				for(let iIndex = 0; iIndex < response.entities.length; iIndex++){
					let data = response.entities[iIndex];

					let option = '<option data-value="' + data[entityDetails.idfield] +'|' + entityDetails.entity + '|' + data[entityDetails.entityvaluename] + '" value="' + data[entityDetails.searchfield] + '">';

					option += entityDetails.resultdisplay + " : " + data[entityDetails.entityvaluename];
					for(let iIndex = 0; iIndex < entityDetails.displayfields.length; iIndex++) {
						option += ', ' + data[entityDetails.displayfields[iIndex]];						
					}
					option += '</option>';

					this._optionsHTMLArray.push(option);
				}				
			},
			(errorResponse) => {
				debugger;
				alert(errorResponse);
			}
		);
	} // public async seachCRM(entity: string)
}
