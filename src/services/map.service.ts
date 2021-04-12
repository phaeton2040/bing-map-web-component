declare var document;
declare var Microsoft;

const BING_MAP_URL = `https://www.bing.com/api/maps/mapcontrol?callback=bingMapReady`;

export interface IMapInterface {
  key: string;
  head: HTMLHeadElement;
  root: HTMLHtmlElement;
  mapElem: HTMLElement;
  mapOptions: string;

  [key: string]: any;
}

export class MapService {
  private key: string;
  private head: HTMLHeadElement;
  private root: HTMLHtmlElement;
  private mapElem: HTMLElement;
  private mapOptions: string;
  private map: any;
  private callback: (...args) => any;

  private mapOptionsClassMap: any;
  private mapOptionsEnumMap: any;

  constructor(callback: (...args) => any) {
    this.callback = callback;
    (window as any).bingMapReady = () => {
      this.mapOptionsClassMap = {
        center: Microsoft.Maps.Location,
        centerOffset: Microsoft.Maps.Point,
        bounds: Microsoft.Maps.LocationRect,
        maxBounds: Microsoft.Maps.LocationRect
      };
      this.mapOptionsEnumMap = {
        labelOverlay: Microsoft.Maps.LabelOverlay,
        mapTypeId: Microsoft.Maps.MapTypeId,
        navigationBarMode: Microsoft.Maps.NavigationBarMode
      }

      this.initMap();
    };
  }

  public init(options: IMapInterface): void {
    Object.assign(this, options);

    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = `${BING_MAP_URL}&key=${this.key}`;

    this.head.appendChild(script);
  }

  private initMap(): void {
    try {
      const options = this.parseMapOptions();
      this.map = new Microsoft.Maps.Map(this.mapElem, options);
  
      const linkArray = Array.from(document.querySelectorAll('link[type="text/css"]')) as HTMLLinkElement[];
  
      linkArray.filter((element: HTMLLinkElement) => {
        return element.href.includes('bing');
      }).forEach((element: HTMLLinkElement) => {
        this.head.appendChild(element);
      });
  
      this.callback(this.map);
      this.root.style.display = 'block';
    } catch (err) {
      this.callback({
        error: err
      })
    }
  }

  private parseMapOptions() {
    const rawOptionsObject = { ...JSON.parse(this.mapOptions) };
    const options: Microsoft.Maps.IMapOptions | Microsoft.Maps.IViewOptions = {};
  
    Object.keys(this.mapOptions).forEach(key => {
      if (key === 'bounds' || key === 'maxBounds') {
        options[key] = new this.mapOptionsClassMap[key](
          new Microsoft.Maps.Location(...rawOptionsObject[key][0]), rawOptionsObject[key][1], rawOptionsObject[key][2]
        );
  
        return;
      }
  
      if (this.mapOptionsClassMap[key]) {
        options[key] = new this.mapOptionsClassMap[key](...rawOptionsObject[key]);
        return;
      }
  
      if (this.mapOptionsEnumMap[key]) {
        options[key] = this.mapOptionsEnumMap[key][rawOptionsObject[key]];
        return;
      }
  
      options[key] = rawOptionsObject[key];
    });
  
    return options;
  }
}
