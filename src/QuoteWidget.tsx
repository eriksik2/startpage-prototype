import React from "react";
import { styled } from "@linaria/react"

const StyledQuoteWidget = styled.div`
    font-size: min(2vw, 1.5em);
    text-align: center;
    font-style: italic;
    padding: 1em 2em;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledAuthor = styled.div`
    align-self: flex-end;
    font-size: 0.6em;
    font-style: normal;
`

type QuoteWidgetPropsType = {
    useCustomQuote?: boolean,
    customQuote?: string,
    customAuthor?: string,
    showAuthor?: boolean,
    textSize?: number,
    textFont?: string,
};

type QuoteWidgetStateType = {
    fetchedQuote: string | null,
    fetchedAuthor: string | null,
};

export class QuoteWidget extends React.Component<QuoteWidgetPropsType, QuoteWidgetStateType> {
    constructor(props: QuoteWidgetPropsType) {
        super(props);
        this.state = {
            fetchedQuote: null,
            fetchedAuthor: null,
        };
    }

    getQuoteText() {
        if (this.props.useCustomQuote) {
            return this.props.customQuote??"";
        }
        return this.state.fetchedQuote??null;
    }

    getAuthorText() {
        if (this.props.useCustomQuote) {
            return this.props.customAuthor??"";
        }
        return this.state.fetchedAuthor??null;
    }

    componentDidMount() {
        if (this.props.useCustomQuote) {

            return;
        }
        fetch("https://api.quotable.io/random")
            .then((response) => response.json())
            .then((data) => {
                this.setState({ fetchedQuote: data.content, fetchedAuthor: data.author });
            });
    }

    render() {
        const quote = this.getQuoteText();
        const author = this.getAuthorText();
        const textsize = this.props.textSize??1;
        const textfont = this.props.textFont??'inherit';
        return (
            <StyledQuoteWidget style={{fontSize: `${this.props.textSize}em`, fontFamily: this.props.textFont}}>
                {quote == null 
                    ? "" 
                    : quote
                }
                {author == null || !this.props.showAuthor
                    ? ""
                    : <StyledAuthor> - {author}</StyledAuthor>
                }
            </StyledQuoteWidget>
        )
    }
}
