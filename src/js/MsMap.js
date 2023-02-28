import { Map } from 'ol';

import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection'
import { ImageWMS } from 'ol/source'
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import React, { useEffect, useRef, useState } from 'react';

function MsMap() {

    const mapRef = useRef();

    useEffect(() => {
        const geo = {
            //url: 'http://127.0.0.1/cgi-bin/mapserv.exe',
            url : 'http://demo.sphinfo.co.kr:8123/cgi-bin/mapserv.exe',
            params: {
                'SERVICE': 'WMS',
                'REQUEST': 'GetMap',
                'FORMAT': 'image/png',
                'VERSION': '1.1.1',
                'MAP': 'C:/ms4w/apps/local-demo/local.map',
                'LAYERS': ['gadm40_bdg']
            },
            serverType: 'mapserver'
        }

        const wmsSource = new ImageWMS({
            url: geo.url,
            params: geo.params,
            serverType: geo.serverType,
        });


        const wmsLayer = new ImageLayer({
            source: wmsSource
        });

        const layers = [
            new TileLayer({
                source: new OSM(),
            }),
            wmsLayer
        ];


        const geoMap = new Map({
            target: mapRef.current,
            layers: layers,
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
            projection: new Projection({
                code: 'EPSG:4326',
                units: 'm'
            })
        });

        return () => {
            geoMap.dispose();
        };
    }, []);

    return (
        <div>
            <div ref={mapRef} style={{ width: "100%", height: "800px", float: "left" }} />
        </div>
    )
}

export default MsMap;
