import React from "react";
import { LinksWidget } from "./LinksWidget";
import { LinksWidgetEditor } from "./LinksWidgetEditor";

export type WidgetEditorProps<T extends React.ComponentType<any>> = {
    data?: React.ComponentProps<T>,
    onSubmit?: (data: React.ComponentProps<T>) => void,
};

type WidgetPair<T extends React.ComponentType<any>> = {
    display: React.ComponentType<React.ComponentProps<T>>,
    editor: React.ComponentType<WidgetEditorProps<T>>,
};
const widgets = [
    {
        display: LinksWidget,
        editor: LinksWidgetEditor,
    },
] satisfies WidgetPair<any>[];

class WidgetData<T extends React.ComponentType<any> = React.ComponentType<any>> {
    type: string;
    props: any;
    display: React.ComponentType<React.ComponentProps<T>>;
    editor: React.ComponentType<WidgetEditorProps<T>>;

    constructor(widgetType: string, props: any) {
        if (!widgets.find((w) => w.display.name === widgetType)) {
            throw new Error(`Widget type ${widgetType} not found`);
        }
        this.type = widgetType;
        this.props = props;
        this.display = widgets.find((w) => w.display.name === this.type)!.display as React.ComponentType<React.ComponentProps<T>>;
        this.editor = widgets.find((w) => w.display.name === this.type)!.editor as React.ComponentType<WidgetEditorProps<T>>;
    }

    getDisplayComponent(): React.ComponentType<React.ComponentProps<T>> {
        return this.display;
    }

    getEditorComponent(): React.ComponentType<WidgetEditorProps<T>> {
        return this.editor;
    }

    static fromJson(json: any): WidgetData {
        return new WidgetData(json.type, json.props);
    }

    toJson(): any {
        return {
            type: this.type,
            props: this.props,
        };
    }
}

export default WidgetData;