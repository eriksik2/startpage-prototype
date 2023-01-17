import React from "react";
import { Link } from "./LinksWidget";

type StateType = {
    name: string,
    links: Link[],
};

export class LinksWidgetEditor extends React.Component<{}, StateType> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: "",
            links: [],
        };
    }

    render() {
        return <div></div>
    }
}