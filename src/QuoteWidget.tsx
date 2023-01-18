import React from "react";
import { css } from "@linaria/core"
import { styled } from "@linaria/react"

const StyledQuoteWidget = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
    font-size: 1.5em;
    text-align: center;
    font-style: italic;
    padding: 1em 2em;
`

type QuoteWidgetStateType = {
    quote: string | null,
};

export class QuoteWidget extends React.Component<{}, QuoteWidgetStateType> {
    constructor(props: {}) {
        super(props);
        this.state = {
            quote: null,
        };
    }

    componentDidMount() {
        fetch("https://api.quotable.io/random")
            .then((response) => response.json())
            .then((data) => {
                this.setState({ quote: data.content });
            });
    }

    render() {
        return (
            <StyledQuoteWidget>
                {this.state.quote == null 
                    ? "" 
                    : this.state.quote
                }
            </StyledQuoteWidget>
        )
    }
}
