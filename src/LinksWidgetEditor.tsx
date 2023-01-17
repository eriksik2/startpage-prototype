import React from "react";

type StateType = {
    name: string,
    links: Link[],
};

class LinksWidgetEditor extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: "",
            links: [],
        };
    }
}

export default LinksWidgetEditor;