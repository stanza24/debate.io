import {lazy} from 'react';

export default lazy(
    () =>
        import(
            /* webpackChunkName: "UnauthorizedChunk" */
            /* webpackMode: "lazy" */
            'Core/CoreSettings/CoreAuthSettings/Routers/UnauthorizedRoute'
        )
);
