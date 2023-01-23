import { styled } from "@linaria/react";
import React from "react";
import { BsGearFill } from "react-icons/bs";
import { IsEditModeContext } from "./App";
import WidgetData from "./WidgetData";


const StyledBaseWidget = styled.div`
    padding: 10px;
    margin: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    div.background.edit-mode {
        background-color: rgba(255, 255, 255, 0.186);
        background-size: 40px 40px;
        background-image:
            linear-gradient(to right, #6f6f6fa5 1px, transparent 1px),
            linear-gradient(to bottom, #6f6f6fa5 1px, transparent 1px);
    }

`;

const StyledWidgetHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    background-color: rgba(255, 255, 255, 0.467);
    border-color: rgba(255, 255, 255, 0.821);

    padding: 2px;
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
        
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
    }

    renderEditor() {
        if(this.state.data.getEditorComponent() === null) {
            return null;
        }
        return React.createElement<any>(
            this.state.data.getEditorComponent()!,
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

    handleDragStart(e: React.DragEvent<HTMLDivElement>) {
        e.dataTransfer.setData("text/plain", JSON.stringify(this.state.data));
    }


    handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        const data = WidgetData.fromJson(JSON.parse(e.dataTransfer.getData("text/plain")));
        this.setState({
            data: data,
        });
        e.dataTransfer.clearData();
        e.dataTransfer.setData("text/plain", JSON.stringify(this.state.data));
    }
    

    public render() {
        return <IsEditModeContext.Consumer>
            {isEditMode => (
                <StyledBaseWidget
                    draggable={isEditMode}
                    onDrop={this.handleDrop}
                    onDragEnter={this.handleDragEnter}
                    onDragOver={this.handleDragOver}
                    onDragStart={this.handleDragStart}
                >
                    {isEditMode
                        ? <StyledWidgetHeader>
                            {this.state.data.getEditorComponent() !== null
                                ? <BsGearFill onClick={() => this.setState({ isEditing: true })}/>
                                : <BsGearFill style={{color: "transparent"}}/>
                            }
                        </StyledWidgetHeader>
                        : null
                    }
                    <div className={"background " + (isEditMode ? "edit-mode" : "")}>
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
                    </div>
                </StyledBaseWidget>
            )}
        </IsEditModeContext.Consumer>;
    }
}