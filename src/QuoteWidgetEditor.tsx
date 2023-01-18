import { styled } from "@linaria/react";
import React from "react";
import { QuoteWidget } from "./QuoteWidget";
import { WidgetEditorProps } from "./WidgetData";

type PropsType = WidgetEditorProps<typeof QuoteWidget>;

type StateType = {
    data: React.ComponentProps<typeof QuoteWidget>,
}

export class QuoteWidgetEditor extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);
        this.state = {
            data: {
                useCustomQuote: this.props.data?.useCustomQuote ?? false,
                customQuote: this.props.data?.customQuote ?? "",
                customAuthor: this.props.data?.customAuthor ?? "",
                showAuthor: this.props.data?.showAuthor ?? true,
                textFont: this.props.data?.textFont ?? "Montserrat",
                textSize: this.props.data?.textSize ?? 1,
            },
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleSelectValue = this.handleSelectValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleToggle(item: string, e: React.ChangeEvent<HTMLInputElement>) {
        const newData = {
            ...this.state.data,
            [item]: e.target.checked,
        };
        this.setState({
            data: newData,
        });
        if (this.props.onChange) {
            this.props.onChange(newData);
        }
    }

    handleChangeValue(item: string, e: React.ChangeEvent<HTMLInputElement>) {
        const newData = {
            ...this.state.data,
            [item]: e.target.value,
        };
        this.setState({
            data: newData,
        });
        if (this.props.onChange) {
            this.props.onChange(newData);
        }
    }

    handleSelectValue(item: string, e: React.ChangeEvent<HTMLSelectElement>) {
        const newData = {
            ...this.state.data,
            [item]: e.target.value,
        };
        this.setState({
            data: newData,
        });
        if (this.props.onChange) {
            this.props.onChange(newData);
        }
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.data);
        }
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="customQuote">Use custom quote</label>
                <input type="checkbox" name="customQuote" checked={this.state.data.useCustomQuote} onChange={e => this.handleToggle("useCustomQuote", e)} />
                <br />
                {this.state.data.useCustomQuote
                    ? <div>
                        <label htmlFor="quote">Quote</label>
                        <input type="text" name="quote" value={this.state.data.customQuote} onChange={e => this.handleChangeValue("customQuote", e)} />
                        <br />
                        {this.state.data.showAuthor
                            ? <div>
                                <label htmlFor="author">Author</label>
                                <input type="text" name="author" value={this.state.data.customAuthor} onChange={e => this.handleChangeValue("customAuthor", e)} />
                            </div>
                            : null
                        }
                    </div>
                    : null
                }
                <label htmlFor="showAuthor">Show author</label>
                <input type="checkbox" name="showAuthor" checked={this.state.data.showAuthor} onChange={e => this.handleToggle("showAuthor", e)} />
                <br />
                <label htmlFor="textSize">Text size</label>
                <input type="number" name="textSize" value={this.state.data.textSize} onChange={e => this.handleChangeValue("textSize", e)} />
                <br />
                <label htmlFor="textFont">Font</label>
                <select name="textFont" value={this.state.data.textFont} onChange={e => this.handleSelectValue("textFont", e)}>
                    <option value="Montserrat">Montserrat</option>
                    <option value="serif">Serif</option>
                    <option value="sans-serif">Sans-serif</option>
                    <option value="monospace">Monospace</option>
                </select>
                <br />
                <input type="submit" value="Save" />
            </form>
        </div>
    }
}