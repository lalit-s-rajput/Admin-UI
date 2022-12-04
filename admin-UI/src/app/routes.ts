import {AppComponent} from './app.component';
import {Route} from '@angular/router';
import * as fromContainers from './results/containers';
export const allRoutes: Route[] = [
    {
        path:'',
        component:AppComponent,
        children:[
            {
                path:'',
                component:fromContainers.ResultsContainerComponent
            }
        ]
    }
];