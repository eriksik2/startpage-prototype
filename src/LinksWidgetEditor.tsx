import React from "react";
import { Link, LinksWidgetPropsType } from "./LinksWidget";
import { css } from '@linaria/core';
import { styled } from '@linaria/react';


const WidgetEditorBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .flexSquare {
        width: 100%;
        flex: none;
    }
    

    input.name {
        color: white;
        margin: 0px;
        margin-bottom: 5px;
        padding: 0px;
        border: 0;
        border-bottom: 1px solid #000000;
        background-color: transparent;
        font-size: 24px;
        font-weight: bold;
    }
    input.name.small {
        color: white;
        font-size: 16px;
    }
    input.name:focus {
        color: white;
        outline: none;
    }

    .listItem {
        color: white;
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        input.name {
            color: white;
            width: 100%;
        }
    }
`;

type StateType = {
    name: string,
    links: Link[],
};

type PropsType = {
    data?: LinksWidgetPropsType,
    onSubmit?: (data: LinksWidgetPropsType) => void,
};

export class LinksWidgetEditor extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);
        this.state = {
            name: props.data?.name ?? "New Widget",
            links: props.data?.links ?? [],
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
            <div className="flexSquare">
                <input
                    className="name"
                    placeholder="Widget name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                />
                <br />
                {this.state.links.map((link: Link, index: number) => 
                    <LinksWidgetEditorLink
                        key={link.url}
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
            </div>
            <div className="flexSquare">
                <form onSubmit={this.handleAddLink}>
                    <input type="text" name="url"/>
                    <input type="submit" value="Add link"/>
                </form>
                <button onClick={() => this.props.onSubmit?.({
                    name: this.state.name,
                    links: this.state.links,
                })}>Save</button>
            </div>
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
        return <div className="listItem">
            <input className="name small" type="text" value={this.props.link.name} onChange={this.handleNameChange}/>
            <input type="text" value={this.props.link.url} onChange={this.handleUrlChange}/>
            <button onClick={this.props.onLinkRemove}>Remove</button>
        </div>;
    }
}