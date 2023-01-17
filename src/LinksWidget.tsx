import React from "react";

export type Link = {
    name: string,
    url: string,
};

type PropsType = {
    name: string,
    links: Link[],
};

export class LinksWidget extends React.Component<PropsType> {

    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return <div>
            <h1>{this.props.name}</h1>
            <ul>
                {this.props.links.map((link: Link) => {
                    return <li key={link.name}>
                        <a href={link.url}>{
                            link.name
                        }</a>
                    </li>;
                })}
            </ul>
        </div>;
    }
}