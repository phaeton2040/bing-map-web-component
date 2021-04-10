/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface BingMap {
        "mapHeight": string;
        "mapKey": string;
        "mapOptions": any;
        "mapWidth": string;
    }
}
declare global {
    interface HTMLBingMapElement extends Components.BingMap, HTMLStencilElement {
    }
    var HTMLBingMapElement: {
        prototype: HTMLBingMapElement;
        new (): HTMLBingMapElement;
    };
    interface HTMLElementTagNameMap {
        "bing-map": HTMLBingMapElement;
    }
}
declare namespace LocalJSX {
    interface BingMap {
        "mapHeight"?: string;
        "mapKey"?: string;
        "mapOptions"?: any;
        "mapWidth"?: string;
        "onMapReady"?: (event: CustomEvent<any>) => void;
    }
    interface IntrinsicElements {
        "bing-map": BingMap;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "bing-map": LocalJSX.BingMap & JSXBase.HTMLAttributes<HTMLBingMapElement>;
        }
    }
}
