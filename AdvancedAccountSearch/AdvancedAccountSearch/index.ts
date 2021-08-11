import {IInputs, IOutputs} from "./generated/ManifestTypes";

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
        this.inputElement.name = "autocomplete_" + this.id
        this.inputElement.placeholder = "Search using Account Number...";
        this.inputElement.autocomplete = "off";
        this.inputElement.className = "ms-SearchBox-field"
        this.inputElement.setAttribute("list", "list_" + this.id);
        this.inputElement.setAttribute("style", "width:100%");
		this.inputElement.setAttribute("data-list-focus","true");
		// Get initial values from field.
        // @ts-ignore
        this.inputElement.value = this.context.parameters.value.formatted;

        // Add an eventlistner the element and bind it to a  function.
        this.inputElement.addEventListener("keydown", this.hadleKeyEvents.bind(this));

		// creating HTML elements for data list 
        this.datalistElement = document.createElement("datalist");
        this.datalistElement.id = "list_" + this.id;

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
		return {};
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

        this.searchForData();
        //this.localNotifyOutputChanged();
    }

	public hadleKeyEvents(evt: KeyboardEvent) {

        // Connect to an API and get the suggesstion as user key presses and update dropdown.		
        //
        if (evt.key === "Enter") {
			this.searchForData();
        //     let query = "entities?search-term=" + encodeURIComponent(input) + "&page-size=20";
        //     let options = {
        //         host: 'api.business.govt.nz/services/v4/nzbn/',
        //         path: query,
        //         headers: {
        //             'accept': 'application/json',
        //             'authorization': "Bearer " + this._nzbnToken
        //         }
        //     }
        //     const https = require('https');

        //     https.get(options, (resp: any) => {
        //         let data = '';
        //         // A chunk of data has been recieved.
        //         resp.on('data', (chunk: any) => {
        //             data += chunk;
        //         });
        //         // The whole response has been received. Print out the result.
        //         resp.on('end', () => {
        //             var response = JSON.parse(data);
        //             console.log(response);
        //             var optionsHTML = "";
        //             var optionsHTMLArray = new Array();
        //             for (var i = 0; i < response.items.length; i++) {
        //                 // Build the values for the AutoComplete Array and Add ID for after select use.
        //                 var lastTradingName = ((response.items[i].tradingNames.length > 0) ? this.titleCase(response.items[i].tradingNames[0].name) : this.titleCase(response.items[i].entityName));

        //                 optionsHTMLArray.push('<option value="');
        //                 optionsHTMLArray.push(this.titleCase(response.items[i].entityName) + ". NZBN: " + response.items[i].nzbn);
        //                 optionsHTMLArray.push('">  Status: ' + response.items[i].entityStatusDescription + ', T/A: ' + lastTradingName + '</option>');
        //             }
        //             this.datalistElement.innerHTML = optionsHTMLArray.join("");
        //             this.localNotifyOutputChanged
        //         });

        //     }).on("error", (err: { message: string; }) => {
        //         console.log("Error: " + err.message);
        //     });
        }
        // else {
        //     this.getDetails(this.inputElement.value)
        // }
    }

	public searchForData() {
		//this.datalistElement.innerHTML = "";
		let input = (this.inputElement.value as any) as string;
		if(input.length > 0) {
			//alert(input);

			var optionsHTML = "";
			var optionsHTMLArray = new Array();
			// for (var i = 0; i < response.items.length; i++) {
			// 	// Build the values for the AutoComplete Array and Add ID for after select use.
			// 	var lastTradingName = ((response.items[i].tradingNames.length > 0) ? this.titleCase(response.items[i].tradingNames[0].name) : this.titleCase(response.items[i].entityName));
			let strText = "ONE";
			let option = '<option value="' + strText + '">Other: ' + strText + ', T/A: ' + strText + '</option>'
			//alert(option);
			optionsHTMLArray.push(option);

			strText = "TWO";
			option = '<option value="' + strText + '">Other: ' + strText + ', T/A: ' + strText + '</option>'
			//alert(option);
			optionsHTMLArray.push(option);

			strText = "THREE";
			option = '<option value="' + strText + '">Other: ' + strText + ', T/A: ' + strText + '</option>'
			//alert(option);
			optionsHTMLArray.push(option);

			strText = "FOUR";
			option = '<option value="' + strText + '">Other: ' + strText + ', T/A: ' + strText + '</option>'
			//alert(option);
			optionsHTMLArray.push(option);
			//}
			//alert(optionsHTMLArray.join(""));
			this.datalistElement.innerHTML = optionsHTMLArray.join("");
			this.localNotifyOutputChanged
		}
	}
}
