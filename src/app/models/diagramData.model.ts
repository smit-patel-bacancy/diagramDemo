export interface DiagramDataModel {
    nodes?:NodeDataModel[];
    connectors?:ConnectorDataModel[];
}

export interface NodeDataModel {
    id: string;
    name ?: string;
    offsetX : number;
    offsetY : number;
    height : number;
    width : number;
    borderWidth ?: number;
    // style ?: {}
}

export interface ConnectorDataModel {
    id: string;
    name ?: string;
    sourceId : string;
    destinationId : string;
    inputPort : string;
    outputPort : string
    // style ?: {};
    // targetDecorator ?: {};
    // sourcePoint ?: {};
    // targetPoint ?: {}
}