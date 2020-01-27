import * as React from 'react';
import Navigation from './Navigation/index';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, { }> {
    public render() {
        return (
        <div className="App">
            <Navigation />
            <div className='container-fluid'>
                <div className="row">
                    <div className='col-sm-12'>
                        { this.props.children }
                    </div>
                </div>
            </div>
        </div>
    )}
}
