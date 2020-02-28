import React from 'react';
import { Component } from 'react';
import CodeHostNavigation from '../Navigation/codehost';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class CodeHostLayout extends Component<{}, LayoutProps>{
    public render() {
        return(
            <div>
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-3">
                        <CodeHostNavigation />
                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-9">
                        { this.props.children }
                    </div>
                </div>
            </div>
    )}
}
