import {Spin} from 'antd';
import type {SpinProps} from 'antd/lib/spin';
import type {FunctionComponent} from 'react';

export const AppLoader: FunctionComponent<SpinProps> = (props) => (
    <div className="w100 h100 flex-center-item" data-testid="app-loader">
        <Spin {...props} />
    </div>
);
