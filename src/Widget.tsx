import React from "react";
import { LinksWidget } from "./LinksWidget";
import WidgetData from "./WidgetData";

type PropsType = {
    data: WidgetData,
};

class Widget extends React.Component<PropsType> {

    constructor(props: PropsType) {
        super(props);
    }

    render() {
        switch (this.props.data.type) {
            case "LinksWidget":
                return <LinksWidget {...this.props.data.props} />;
            default:
                return <div>Unknown widget type</div>;
        }
    }
}

export default Widget;