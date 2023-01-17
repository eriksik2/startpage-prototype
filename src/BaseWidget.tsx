import React from "react";
import WidgetData from "./WidgetData";




type BaseWidgetPropsType = {
    data: WidgetData,
};

type BaseWidgetStateType = {
    isEditing: boolean,
    data: WidgetData,
};

export class BaseWidget extends React.Component<BaseWidgetPropsType, BaseWidgetStateType> {
    constructor(props: BaseWidgetPropsType) {
        super(props);
        this.state = {
            isEditing: false,
            data: props.data,
        };
    }

    renderEditor() {
        return React.createElement<any>(
            this.state.data.getEditorComponent(),
            {
                data: this.state.data.props,
                onSubmit: (data: any) => {
                    this.setState({
                        isEditing: false,
                        data: new WidgetData(
                            this.state.data.type,
                            data,
                        ),
                    });
                },
            },
        );
    }

    renderDisplay() {
        return React.createElement<any>(
            this.state.data.getDisplayComponent(),
            this.state.data.props,
        )
    }

    public render() {
        return <div>
            <button onClick={() => this.setState({ isEditing: true })}>Edit</button>
            {this.state.isEditing
                ? this.renderEditor()
                : this.renderDisplay()
            }
        </div>;
    }
}