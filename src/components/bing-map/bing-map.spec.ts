import { MapService } from '../../services/map.service';

const mockServiceInitSpy = jest.fn();

jest.mock('../../services/map.service', () => {
  return {
    MapService: jest.fn().mockImplementation(() => {
      return {
        init: mockServiceInitSpy
      }
    })
  }
});

import { newSpecPage } from '@stencil/core/testing';
import { BingMap } from './bing-map';

it('should render my component', async () => {
  const page = await newSpecPage({
    components: [BingMap],
    html: `<bing-map map-key="Your Key" map-options='{
      "showMapTypeSelector": true,
      "center": [ 53.91170120239257, 27.45739936828614 ],
      "zoom": 15,
      "mapTypeId": "road",
      "navigationBarMode": "square"
    }'></bing-map>`,
  });
  page.rootInstance.componentDidLoad();
  expect(mockServiceInitSpy).toHaveBeenCalled();
});
