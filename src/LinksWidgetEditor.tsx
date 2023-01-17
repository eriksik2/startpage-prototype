import React from "react";
import { Link } from "./LinksWidget";
import { css } from '@linaria/core';
import { styled } from '@linaria/react';


const WidgetEditorBox = styled.div`
    border: 1px solid #000000;
    padding: 10px;
    padding-top: 0px;
    background-color: #ffffff;

    input.name {
        margin: 5px;
        padding: 0px;
        border: 0;
        border-bottom: 1px solid #000000;
        background-color: transparent;
        font-size: 24px;
        font-weight: bold;
    }
    input.name.small {
        font-size: 16px;
    }
    input.name:focus {
        outline: none;
    }
`;

type StateType = {
    name: string,
    links: Link[],
};

export class LinksWidgetEditor extends React.Component<{}, StateType> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: "New Widget",
            links: [],
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddLink = this.handleAddLink.bind(this);
    }

    handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ name: event.target.value });
    }

    handleAddLink(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const url = data.get("url") as string;
        const name = new RegExp("^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:.\/\n\?]+)(?:\..+)").exec(url)?.[1] ?? url;
        const capName = name.charAt(0).toUpperCase() + name.slice(1);
        const fmtUrl = (url.startsWith("http") || url.startsWith("https")) ? url : "https://" + url;
        const links = this.state.links;
        links.push({ name: capName, url: fmtUrl });
        this.setState({ links });
    }

    render() {
        return <WidgetEditorBox>
            <input
                className="name"
                placeholder="Widget name"
                value={this.state.name}
                onChange={this.handleNameChange}
            />
            <br />
            {this.state.links.map((link: Link, index: number) => 
                <LinksWidgetEditorLink
                    link={link}
                    onLinkChange={(link: Link) => {
                        const links = this.state.links;
                        links[index] = link;
                        this.setState({ links });
                    }}
                    onLinkRemove={() => {
                        const links = this.state.links;
                        links.splice(index, 1);
                        this.setState({ links });
                    }}
                />
            )}
            <form onSubmit={this.handleAddLink}>
                <input type="text" name="url"/>
                <input type="submit" value="Add link"/>
            </form>
        </WidgetEditorBox>
    }
}

type LinksWidgetEditorLinkPropsType = {
    link: Link,
    onLinkChange: (link: Link) => void,
    onLinkRemove: () => void,
};

class LinksWidgetEditorLink extends React.Component<LinksWidgetEditorLinkPropsType, {}> {
    constructor(props: LinksWidgetEditorLinkPropsType) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.onLinkChange({
            name: event.target.value,
            url: this.props.link.url,
        });
    }

    handleUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.onLinkChange({
            name: this.props.link.name,
            url: event.target.value,
        });
    }

    render() {
        return <div>
            <input className="name small" type="text" value={this.props.link.name} onChange={this.handleNameChange}/>
            <input type="text" value={this.props.link.url} onChange={this.handleUrlChange}/>
            <button onClick={this.props.onLinkRemove}>Remove</button>
        </div>;
    }
}