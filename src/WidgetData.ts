
class WidgetData {
    type: string;
    props: any;

    constructor(widgetType: string, props: any) {
        this.type = widgetType;
        this.props = props;
    }

    static fromJson(json: any): WidgetData {
        return new WidgetData(json.type, json.props);
    }

    toJson(): any {
        return {
            type: this.type,
            props: this.props,
        };
    }
}

export default WidgetData;