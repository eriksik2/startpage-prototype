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
        const links = this.state.links;
        links.push({ name: name, url: url });
        this.setState({ links });
    }

    render() {
        return <div>
            Widget name: 
            <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
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
        </div>
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
            Name:
            <input type="text" value={this.props.link.name} onChange={this.handleNameChange}/>
            Url:
            <input type="text" value={this.props.link.url} onChange={this.handleUrlChange}/>
            <button onClick={this.props.onLinkRemove}>Remove</button>
        </div>;
    }
}