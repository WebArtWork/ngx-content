import { Component } from "@angular/core";
import { FormService } from "src/app/modules/form/form.service";
import {
	ContentService,
	Content,
} from "../../services/content.service";
import { AlertService, CoreService, ModalService, StoreService } from "wacom";
import { TranslateService } from "src/app/modules/translate/translate.service";
import { FormInterface } from "src/app/modules/form/interfaces/form.interface";
import { ContentsCreateComponent } from "./contents-create/contents-create.component";
import { UserService } from "src/app/core";
import { Store, StoreService as _StoreService } from "src/app/modules/store/services/store.service";

@Component({
	templateUrl: "./contents.component.html",
	styleUrls: ["./contents.component.scss"],
})
export class ContentsComponent {
	columns = ['enabled', 'top', "name", "description"];

	form: FormInterface = this._form.getForm("contents", {
		formId: "contents",
		title: "Contents",
		components: [
			{
				name: 'Photo',
				key: 'thumb',
				fields: [
					{
						name: 'Label',
						value: 'Header picture'
					}
				]
			},
			{
				name: 'Text',
				key: 'url',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill url'
					},
					{
						name: 'Label',
						value: 'Url'
					}
				]
			},
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill title'
					},
					{
						name: 'Label',
						value: 'Title'
					}
				]
			},
			{
				name: 'Text',
				key: 'description',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill description'
					},
					{
						name: 'Label',
						value: 'Description'
					}
				]
			},
			{
				name: 'Text',
				key: 'content',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill content'
					},
					{
						name: 'Label',
						value: 'Content'
					}
				]
			},
			{
				name: 'Select',
				key: 'stores',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill product tag'
					},
					{
						name: 'Label',
						value: 'Tag'
					},
					{
						name: 'Multiple',
						value: true
					},
					{
						name: 'Items',
						value: this._ss.stores
					}
				]
			}
		],
	});

	config = {
		create: () => {
			this._form.modal<Content>(this.form, {
				label: "Create",
				click: (created: unknown, close: () => void) => {
					if (this.store) {
						(created as Content).stores = [this.store];
					}
					this._cs.create(created as Content);
					close();
				},
			});
		},
		update: (doc: Content) => {
			this._form
				.modal<Content>(this.form, [], doc)
				.then((updated: Content) => {
					this._core.copy(updated, doc);
					this._cs.save(doc);
				});
		},
		delete: (doc: Content) => {
			this._alert.question({
				text: this._translate.translate(
					"Common.Are you sure you want to delete this cservice?"
				),
				buttons: [
					{
						text: this._translate.translate("Common.No"),
					},
					{
						text: this._translate.translate("Common.Yes"),
						callback: () => {
							this._cs.delete(doc);
						},
					},
				],
			});
		},
		headerButtons: [
			this._us.role('admin') || this._us.role('agent')
				? {
					icon: 'add_circle',
					click: () => {
						this._modal.show({
							component: ContentsCreateComponent,
							store: this.store
						});
					}
				}
				: null
		]
	};

	contents: Content[] = [];
	setContents() {
		this.contents.splice(0, this.contents.length);
		for (const content of this._cs.contents) {
			content.stores = content.stores || [];
			if (this.store) {
				if (content.stores.includes(this.store)) {
					this.contents.push(content);
				}
			} else {
				this.contents.push(content);
			}
		}
	}

	update(content: Content) {
		this._cs.update(content);
	}

	get stores(): Store[] {
		return this._ss.stores;
	}
	store: string;
	setStore(store: string) {
		this.store = store;
		this._store.set('store', store);
		this.setContents();
	}

	constructor(
		private _cs: ContentService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _modal: ModalService,
		private _us: UserService,
		private _store: StoreService,
		private _ss: _StoreService
	) { }
}
