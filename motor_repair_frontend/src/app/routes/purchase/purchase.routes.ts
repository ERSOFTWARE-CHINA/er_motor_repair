import { PurchaseComponent } from './purchase.component';
import { PurchaseListComponent } from './list/list.component';
import { PurchaseFormComponent } from './form/form.component';

export const PurchaseRoutes = [{
	path: '',
	component: PurchaseComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: PurchaseListComponent },
		{ path: 'form', component: PurchaseFormComponent },
	]
}];