import {SearchBarComponent} from './search-bar/search-bar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TableViewComponent } from './table-view/table-view.component';
import { ModalComponent } from './modal/modal.component';

export const componentContainer: any[] = [
    SearchBarComponent,
    PaginationComponent,
    TableViewComponent,
    ModalComponent
];

export * from './search-bar/search-bar.component';
export * from './pagination/pagination.component';
export * from './table-view/table-view.component';
export * from './modal/modal.component';