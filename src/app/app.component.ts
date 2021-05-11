import { Component, ViewChild } from '@angular/core';
import { DiagramComponent, NodeModel, ConnectorModel, LinearGradientModel } from '@syncfusion/ej2-angular-diagrams';
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
    this.diagram.add(this.node);
    this.isChanged=true;
  }

  public addConnector() {
    this.diagram.add(this.connectors);
    this.isChanged=true;
  }

  valuechange($event:any) {
    var nodeList: NodeDataModel[] = [];
    var connectorList: ConnectorDataModel[] = [];
    this.diagram.nodes.forEach((element) => {
      const nodeData: NodeDataModel = {
        id: element.id,
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
        sourceId: element.sourceID,
        destinationId: element.targetID,
      };
      connectorList.push(connectorData);
    });

    this.DiagramData = {
      nodes: nodeList,
      connectors: connectorList,
    };
    console.log(this.DiagramData);
  }
}