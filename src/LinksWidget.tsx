import React from "react";

export type Link = {
    name: string,
    url: string,
};

export type LinksWidgetPropsType = {
    name: string,
    links: Link[],
};

export class LinksWidget extends React.Component<LinksWidgetPropsType> {
    constructor(props: LinksWidgetPropsType) {
        super(props);
    }

    render() {
        return <div>
            <h1>{this.props.name}</h1>
            <ul>
                {this.props.links.map((link: Link) => {
                    return <li key={link.url}>
                        <a href={link.url}>{
                            link.name
                        }</a>
                    </li>;
                })}
            </ul>
        </div>;
    }
}