import { styled } from "@linaria/react";
import React from "react";
import { DateTimeWidget } from "./DateTimeWidget";
import { DateTimeWidgetEditor } from "./DateTimeWidgetEditor";
import { LinksWidget } from "./LinksWidget";
import { LinksWidgetEditor } from "./LinksWidgetEditor";
import { QuoteWidget } from "./QuoteWidget";
import { QuoteWidgetEditor } from "./QuoteWidgetEditor";
import { TimerWidget } from "./TimerWidget";
import { WeatherWidget } from "./WeatherWidget";
import { WeatherWidgetEditor } from "./WeatherWidgetEditor";


export type WidgetEditorProps<T extends React.ComponentType<any>> = {
    data?: React.ComponentProps<T>,
    onSubmit?: (data: React.ComponentProps<T>) => void,
    onChange?: (data: React.ComponentProps<T>) => void,
};

type WidgetPair<T extends React.ComponentType<any>> = {
    display: React.ComponentType<React.ComponentProps<T>>,
    editor?: React.ComponentType<WidgetEditorProps<T>>,
};
const widgets = [
    {
        display: LinksWidget,
        editor: LinksWidgetEditor,
    },
    {
        display: DateTimeWidget,
        editor: DateTimeWidgetEditor,
    },
    {
        display: QuoteWidget,
        editor: QuoteWidgetEditor,
    },
    {
        display: WeatherWidget,
        editor: WeatherWidgetEditor,
    },
    {
        display: TimerWidget,
    }
] satisfies WidgetPair<any>[];

class WidgetData<T extends React.ComponentType<any> = React.ComponentType<any>> {
    type: string;
    props: any;
    display: React.ComponentType<React.ComponentProps<T>>;
    editor: React.ComponentType<WidgetEditorProps<T>> | null;

    constructor(widgetType: string, props: any) {
        if (!widgets.find((w) => w.display.name === widgetType)) {
            throw new Error(`Widget type ${widgetType} not found`);
        }
        this.type = widgetType;
        this.props = props;
        this.display = widgets.find((w) => w.display.name === this.type)!.display as React.ComponentType<React.ComponentProps<T>>;
        const editor = widgets.find((w) => w.display.name === this.type)!.editor;
        this.editor = (editor == undefined ? null : editor) as React.ComponentType<WidgetEditorProps<T>> | null;
    }

    static of<P>(comp: React.ComponentType<P>, props: P): WidgetData<React.ComponentType<P>> {
        return new WidgetData(comp.name, props);
    }

    getDisplayComponent(): React.ComponentType<React.ComponentProps<T>> {
        return this.display;
    }

    getEditorComponent(): React.ComponentType<WidgetEditorProps<T>> | null {
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