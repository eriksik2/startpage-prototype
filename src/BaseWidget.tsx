import { styled } from "@linaria/react";
import React from "react";
import WidgetData from "./WidgetData";


const StyledBaseWidget = styled.div`
    border: 1px solid #000000;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
    width: 300px;
    height: 300px;
    color: #000000;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    
`;


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
        return <StyledBaseWidget>
            {this.state.isEditing
                ? this.renderEditor()
                : this.renderDisplay()
            }
            {this.state.isEditing
                ? null
                : <button onClick={() => this.setState({ isEditing: true })}>Edit</button>
            }
        </StyledBaseWidget>;
    }
}