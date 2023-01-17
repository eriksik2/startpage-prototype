import React from "react";
import { css } from "@linaria/core"
import { styled } from "@linaria/react"

export class QuoteWidget extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <p>An apple a day means 7 apples a week.</p>
        )
    }
}
