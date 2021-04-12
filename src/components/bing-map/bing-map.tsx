import { Component, Prop, h, EventEmitter, Event } from '@stencil/core';
import { MapService } from '../../services/map.service';

@Component({
  tag: 'bing-map',
  styleUrl: 'bing-map.css',
  shadow: true,
})
export class BingMap {
  
  @Prop() mapWidth: string;

  @Prop() mapHeight: string;

  @Prop() mapKey: string;

  @Prop() mapOptions: any;

  @Event() mapReady: EventEmitter<any>;

  private root: HTMLHtmlElement;
  private head: HTMLHeadElement;
  private mapElem: any;
  private mapService: MapService;

  constructor() {
    this.mapService = new MapService(this.fireEvent.bind(this));
  }

  fireEvent(args) {
    this.mapReady.emit(args);
  }

  componentDidLoad() {
    this.mapService.init({
      key: this.mapKey,
      head: this.head,
      root: this.root,
      mapElem: this.mapElem,
      mapOptions: this.mapOptions
    });
  }

  render() {
    return <html ref={(el) => this.root = el} style={{ display: 'none' }}>
      <head ref={(el) => this.head = el}></head>
      <body style={{ margin: '0', padding: '0'}}>
        <div id="map" ref={(el) => this.mapElem = el} style={{width: this.mapWidth, height: this.mapHeight}}></div>
      </body>
    </html>
  }
}
