import { Map } from 'ol';

import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';

import { ImageWMS } from 'ol/source'
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import React, { useEffect, useRef, useState } from 'react';

function GeoMap() {

    // const mapRef = useRef(null);
    // const [mapObj, setMapObj] = useState({});

    // const geo = {
    //     url : 'http://localhost:8080/geoserver/testGeoserver/wms?',
    //     params : {
    //         LAYERS: 'testGeoserver:gadm40_bdg'    
    //     },
    //     serverType: 'geoserver'
    // }

    // const wmsSource = new ImageWMS({
    //     url: geo.url,
    //     params : geo.params,
    //     ratio: 1,
    //     serverType: geo.serverType
    // });



    // const wmsLayer = new ImageLayer({
    //     source: wmsSource,
    // });

    // const layers = [
    //     new TileLayer({
    //         source: new OSM(),
    //     }),
    //     wmsLayer
    // ];


    // const map = new Map({
    //     layers: layers,
    //     target: mapRef.current, // 하위 요소 중 id 가 map 인 element가 있어야함.
    //     view: new View({
    //         center:[0,0],
    //         zoom: 2,
    //     }),
    // });



    // useEffect(() => {

    //     if(mapRef && !mapObj){
    //         setMapObj(map);
    //     }

    //     return() => map.setTarget(undefined);
    //   }, [mapObj]);

    // return (
    //     <div ref={mapRef} style={{ width: '100%', height: '500px' }}/>
    // );

    const mapRef = useRef();

    useEffect(() => {

        const geo = {
            // url: 'http://localhost:8080/geoserver/testGeoserver/wms?',
            url: 'http://demo.sphinfo.co.kr:18080/geoserver/testGeoserver/wms?',
            params: {
                LAYERS: 'testGeoserver:gadm40_bdg'
            },
            serverType: 'geoserver'
        }

        const wmsSource = new ImageWMS({
            url: geo.url,
            params: geo.params,
            ratio: 1,
            serverType: geo.serverType
        });


        const layers = [
            new TileLayer({
                source: new OSM(),
            }),
            new ImageLayer({
                source: wmsSource,
            })
        ];



        const geoMap = new Map({
            target: mapRef.current,
            layers: layers,
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
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

export default GeoMap;
