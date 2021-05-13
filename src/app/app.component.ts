import { Component, ViewChild } from '@angular/core';
import { DiagramComponent, NodeModel, ConnectorModel, LinearGradientModel, PointPortModel } from '@syncfusion/ej2-angular-diagrams';
import { ConnectorDataModel, DiagramDataModel, NodeDataModel } from './models/diagramData.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent{
  public isChanged:boolean=false;
  public DiagramData: DiagramDataModel;

  @ViewChild('diagram')
  public diagram: DiagramComponent;
  title = 'diagramDemo';

  public linearGradient: LinearGradientModel = {
    x1: 0,
    y1: 0,
    x2: 50,
    y2: 50,
    stops: [
      {
        color: 'white',
        offset: 0,
      },
      {
        color: '#6BA5D7',
        offset: 100,
      },
    ],
    type: 'Linear',
  };

  public node: NodeModel = {
    offsetX: 50,
    offsetY: 50,
    width: 100,
    height: 100,
    borderWidth: 10,
    style: {
      fill: '#000000',
      strokeColor: 'black',
      gradient: this.linearGradient,
    },
  };

  public connectors : ConnectorModel = {
    style: {
      strokeColor: '#6BA5D7',
      fill: '#6BA5D7',
      strokeWidth: 2,
    },
    targetDecorator: {
      style: {
        fill: '#6BA5D7',
        strokeColor: '#6BA5D7',
      },
    },
    sourcePoint: {
      x: 10,
      y: 10,
    },
    targetPoint: {
      x: 90,
      y: 90,
    },
  };

  public addNode() {
    this.node.ports = getPorts(this.node);
    this.diagram.add(this.node);
  }

  public addConnector() {
    this.diagram.add(this.connectors);
  }

  public showValues(){
    this.isChanged=true;
    console.log(this.DiagramData);
  }
  
  public valueChange($event:any) {
    setTimeout(() => {
      var nodeList: NodeDataModel[] = [];
    var connectorList: ConnectorDataModel[] = [];
    this.diagram.nodes.forEach((element) => {
      const nodeData: NodeDataModel = {
        id: element.id,
        name: element.annotations[0] ? element.annotations[0].content : '',
        height: element.height,
        width: element.width,
        offsetX: element.offsetX,
        offsetY: element.offsetY,
      };
      nodeList.push(nodeData);
    });

    this.diagram.connectors.forEach((element) => {
      const connectorData: ConnectorDataModel = {
        id: element.id,
        name: element.annotations[0] ? element.annotations[0].content : '',
        sourceId: element.sourceID,
        inputPort: element.sourcePortID,
        destinationId: element.targetID,
        outputPort: element.targetPortID
      };
      connectorList.push(connectorData);
    });

    this.DiagramData = {
      nodes: nodeList,
      connectors: connectorList,
    };
    // console.log(this.DiagramData);
    }, 0.1);
  }
}

function getPorts(obj: NodeModel): PointPortModel[] {
  let ports: PointPortModel[] = [
    { id: 'port1', shape: 'Circle', offset: { x: 0, y: 0.5 } },
    { id: 'port2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
    { id: 'port3', shape: 'Circle', offset: { x: 1, y: 0.5 } },
    { id: 'port4', shape: 'Circle', offset: { x: 0.5, y: 0 } }
  ];
  return ports;
}