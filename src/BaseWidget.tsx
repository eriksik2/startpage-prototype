import { styled } from "@linaria/react";
import React from "react";
import { BsGearFill } from "react-icons/bs";
import WidgetData from "./WidgetData";

const hideEditButton = false;

const StyledBaseWidget = styled.div`
    padding: 10px;
    margin: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

`;

const StyledWidgetHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`;

const StyledWidgetBody = styled.div`

    .widgetBody {
        transition: all 0.5s ease;
    }

    .widgetBody.editing {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }
`;

const StyledEditorContainer = styled.div`
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(38, 38, 44, 1);
`;

const StyledDisplayContainer = styled.div`

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
                onChange: (data: any) => {
                    this.setState({
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
            <StyledWidgetHeader>
                {hideEditButton
                    ? null
                    : <BsGearFill onClick={() => this.setState({ isEditing: true })}/>
                }
            </StyledWidgetHeader>
            <StyledWidgetBody>
                <div className={"widgetBody " + (this.state.isEditing ? "editing" : "")}>
                    {this.state.isEditing
                        ? <StyledEditorContainer>
                            {this.renderEditor()}
                        </StyledEditorContainer>
                        : <div></div>
                    }
                </div>
                <StyledDisplayContainer>
                    {this.renderDisplay()}
                </StyledDisplayContainer>
            </StyledWidgetBody>
        </StyledBaseWidget>;
    }
}