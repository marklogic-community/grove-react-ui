/* mapUtils.js
 *
 * This file includes utility functions for working with a map.
 */

import { fromLonLat } from 'ol/proj';

const mapUtils = {
  convertFacetsToGeoJson: function(facets, facetName) {
    let geoJson = {
      type: 'FeatureCollection',
      features: []
    };

    if (
      facets &&
      facets[facetName] &&
      facets[facetName].boxes &&
      facets[facetName].boxes.length > 0
    ) {
      facets[facetName].boxes.forEach(function(value, index) {
        if (value.count > 0) {
          let lng = (value.w + value.e) / 2;
          let lat = (value.s + value.n) / 2;
          let ptConverted = fromLonLat([lng, lat]);
          geoJson.features.push({
            type: 'Feature',
            id: value.id || 'feature' + index,
            geometry: {
              type: 'Point',
              coordinates: ptConverted
            },
            properties: {
              name: '',
              id: value.id || 'feature' + index,
              layer: 'primary',
              count: value.count,
              uri: value.uri,
              cageName: value.cageName,
              cageCode: value.cageCode
            }
          });
        }
      });
    }

    return geoJson;
  },

  convertPropsToGeoJson: function(props) {
    let geoJson = {
      type: 'FeatureCollection',
      features: []
    };

    let cageMap = {};
    if (props.parts && props.parts.length > 0) {
      props.parts.forEach(function(value, index) {
        if (value.geoPoint && !cageMap[value.cageCode]) {
          cageMap[value.cageCode] = value.cageCode;

          let latLong = value.geoPoint.split(',');
          let ptConverted = fromLonLat([
            parseFloat(latLong[1]),
            parseFloat(latLong[0])
          ]);

          geoJson.features.push({
            type: 'Feature',
            id: value.id || 'feature' + index,
            geometry: {
              type: 'Point',
              coordinates: ptConverted
            },
            properties: {
              name: mapUtils.createSupplierName(value),
              id: value.id || 'feature' + index,
              layer: 'primary',
              cageName: value.cageName,
              cageCode: value.cageCode,
              nomenclature: value.nomenclature,
              partNumber: value.partNumber,
              uri: value.uri
            }
          });
        }
      });
    }

    // When a supplier is provided, it will have a single point to plot.
    if (props.supplier && props.supplier.geoPoint) {
      let latLong = props.supplier.geoPoint.split(' ');
      let ptConverted = fromLonLat([
        parseFloat(latLong[1]),
        parseFloat(latLong[0])
      ]);

      geoJson.features.push({
        type: 'Feature',
        id: props.supplier.id || 'feature-supplier',
        geometry: {
          type: 'Point',
          coordinates: ptConverted
        },
        properties: {
          name: '',
          id: props.supplier.id || 'feature-supplier',
          layer: 'primary',
          cageName: props.supplier.cageName
        }
      });
    }

    return geoJson;
  },

  convertPointsToGeoJson: function(points) {
    let geoJson = {
      type: 'FeatureCollection',
      features: []
    };

    if (points && points.length > 0) {
      points.forEach(function(value, index) {
        let latLong = value.split(',');
        if (latLong.length === 2) {
          let ptConverted = fromLonLat([
            parseFloat(latLong[1]),
            parseFloat(latLong[0])
          ]);

          geoJson.features.push({
            type: 'Feature',
            id: 'component' + index,
            geometry: {
              type: 'Point',
              coordinates: ptConverted
            },
            properties: {
              name: '',
              id: 'component' + index,
              layer: 'component'
            }
          });
        }
      });
    }

    return geoJson;
  },

  convertComponentSuppliersToGeoJson: function(suppliers) {
    let geoJson = {
      type: 'FeatureCollection',
      features: []
    };

    if (suppliers && suppliers.length > 0) {
      suppliers.forEach(function(supplier, index) {
        if (supplier.geoPoint) {
          let latLong = supplier.geoPoint.split(',');
          if (latLong.length === 2) {
            let ptConverted = fromLonLat([
              parseFloat(latLong[1]),
              parseFloat(latLong[0])
            ]);

            geoJson.features.push({
              type: 'Feature',
              id: 'component' + index,
              geometry: {
                type: 'Point',
                coordinates: ptConverted
              },
              properties: {
                name: mapUtils.createSupplierName(supplier),
                id: 'component' + index,
                layer: 'component',
                cageCode: supplier.cageCode
              }
            });
          }
        }
      });
    }

    return geoJson;
  },

  createSupplierName(value) {
    let name = '';
    if (value.cageCode) {
      name += value.cageCode;
    }

    if (value.cageName) {
      name += name.length === 0 ? value.cageName : ' - ' + value.cageName;
    }

    if (name.length === 0) {
      name = 'unknown';
    }

    return name;
  }
};

export default mapUtils;
