
declare var Microsoft;

export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const parseMapOptions = (rawOptionsObject: {[key: string]: any}) => {
  const mapOptionsClassMap = {
    center: Microsoft.Maps.Location,
    centerOffset: Microsoft.Maps.Point,
    bounds: Microsoft.Maps.LocationRect,
    maxBounds: Microsoft.Maps.LocationRect
  };
  const mapOptionsEnumMap = {
    labelOverlay: Microsoft.Maps.LabelOverlay,
    mapTypeId: Microsoft.Maps.MapTypeId,
    navigationBarMode: Microsoft.Maps.NavigationBarMode
  }

  const options: Microsoft.Maps.IMapOptions | Microsoft.Maps.IViewOptions = {};

  Object.keys(rawOptionsObject).forEach(key => {
    if (key === 'bounds' || key === 'maxBounds') {
      options[key] = new mapOptionsClassMap[key](
        new Microsoft.Maps.Location(...rawOptionsObject[key][0]), rawOptionsObject[key][1], rawOptionsObject[key][2]
      );

      return;
    }

    if (mapOptionsClassMap[key]) {
      options[key] = new mapOptionsClassMap[key](...rawOptionsObject[key]);
      return;
    }

    if (mapOptionsEnumMap[key]) {
      options[key] = mapOptionsEnumMap[key][rawOptionsObject[key]];
      return;
    }

    options[key] = rawOptionsObject[key];
  });

  console.log(options);
  return options;
}
