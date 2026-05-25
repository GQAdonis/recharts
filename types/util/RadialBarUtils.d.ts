import * as React from 'react';
import { RadialBarDataItem, RadialBarProps } from '../polar/RadialBar';
export declare const defaultRadialBarShape: React.FC<import("..").SectorProps>;
export declare function parseCornerRadius(cornerRadius: string | number | undefined): number | undefined;
export interface RadialBarSectorProps extends RadialBarDataItem {
    index: number;
    isActive: boolean;
}
type RadialBarSectorComponentProps = RadialBarSectorProps & {
    option: Exclude<RadialBarProps['shape'], undefined> | RadialBarProps['activeShape'];
};
export declare function RadialBarSector({ option, ...shapeProps }: RadialBarSectorComponentProps): React.JSX.Element;
export {};
