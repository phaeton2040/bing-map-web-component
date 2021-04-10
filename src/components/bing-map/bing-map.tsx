import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';
import { parseMapOptions } from '../../utils/utils';

declare var document;
declare var Microsoft;

const BING_MAP_URL = `https://www.bing.com/api/maps/mapcontrol?callback=bingMapReady`

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
  private map: any;
  private mapElem: any;

  componentDidLoad() {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = `${BING_MAP_URL}&key=${this.mapKey}`;

    this.head.appendChild(script);

    (window as any).bingMapReady = () => {
      this.initMap();
    };
  }

  private initMap() {
    try {
      this.mapOptions = parseMapOptions(JSON.parse(this.mapOptions));
      this.map = new Microsoft.Maps.Map(this.mapElem, this.mapOptions);
  
      const linkArray = Array.from(document.querySelectorAll('link[type="text/css"]')) as HTMLLinkElement[];
  
      linkArray.filter((element: HTMLLinkElement) => {
        return element.href.includes('bing');
      }).forEach((element: HTMLLinkElement) => {
        this.head.appendChild(element);
      });
  
      this.mapReady.emit(this.map);
      this.root.style.display = 'block';
    } catch (err) {
      this.mapReady.emit({
        error: err
      })
    }
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
