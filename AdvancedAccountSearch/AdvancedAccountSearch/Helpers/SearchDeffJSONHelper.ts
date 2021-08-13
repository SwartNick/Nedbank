import { setFlagsFromString } from "v8";

export class SearchDeffJSONHelper {
    private m_mainString: string;
    private m_entities: Array<string>;

    constructor() {

    }

    public SetString(jsonstr: string) {
        this.m_mainString = jsonstr;
        this.m_entities = [];

        let jsonData = JSON.parse(this.m_mainString);
        for(let iIndex = 0; iIndex < jsonData.data.length; iIndex++) {
            let data = JSON.stringify(jsonData.data[iIndex]);
            this.m_entities.push(data);
        }
    }

    public Entities() : Array<string> {
        return this.m_entities;
    }
}