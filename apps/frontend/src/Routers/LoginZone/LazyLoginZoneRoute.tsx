import {lazy} from 'react';

export default lazy(
    () =>
        import(
            /* webpackChunkName: "LoginZoneRouteChunk" */
            /* webpackMode: "lazy" */
            'Routers/LoginZone/LoginZoneRoute'
            )
);
