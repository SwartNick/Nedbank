import { setFlagsFromString } from "v8";

export class SearchEntitiesHelper {
    private m_mainString: string;    

    constructor() {

    }

    public SetString(jsonstr: string) {
        this.m_mainString = jsonstr;        
    }

    public Entitiy() : string {
        return JSON.parse(this.m_mainString).e;
    }

    public IDField() : string {
        return JSON.parse(this.m_mainString).id;
    }

    public EntityValueName() : string {
        return JSON.parse(this.m_mainString).evn;
    }

    public ResultDisplay() : string {
        return JSON.parse(this.m_mainString).rd;
    }

    public SearchField() : string {
        return JSON.parse(this.m_mainString).sf;
    }

    public DisplayFields() : Array<string> {
        return JSON.parse(this.m_mainString).df;
    }
}