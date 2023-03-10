import { styled } from "@linaria/react";
import React from "react";

const StyledLinksWidget = styled.div`
    font-size: 0.8em;

    ul {
        padding: 0px;
        margin: 0px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
    }

    h1 {
        margin: 0px;
        padding: 0px;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
    }

    a {
        text-decoration: none;
        color: white;
    }

    a:visited {
        text-decoration: none;
        color: white;
    }
`;

export type Link = {
    name: string,
    url: string,
};

export type LinksWidgetPropsType = {
    name: string,
    links: Link[],
};

export class LinksWidget extends React.Component<LinksWidgetPropsType> {

    render() {
        return <StyledLinksWidget>
            <h1>{this.props.name}</h1>
            <ul>
                {this.props.links.map((link: Link) => {
                    return <SingleLink link={link}/>;
                })}
            </ul>
        </StyledLinksWidget>;
    }
}

const StyledSingleLink = styled.li`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    img {
        margin-bottom: 5px;
    }


    a {
        text-decoration: none;
        color: #000000;
    }

    a:visited {
        text-decoration: none;
        color: #000000;
    }

`;

class SingleLink extends React.Component<{ link: Link }> {
    render() {
        return <a href={this.props.link.url}>
            <StyledSingleLink key={this.props.link.url}>
                <img height="34" width="34" alt="" src={`http://www.google.com/s2/favicons?domain=${this.props.link.url}`} />
                {this.props.link.name}
            </StyledSingleLink>
        </a>;
    }
}