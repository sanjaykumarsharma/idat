import {Component, OnInit, OnDestroy} from '@angular/core';
import { TagService } from '../service/tag.service';
import { Tag } from '../model/tag.model';
import {Message} from 'primeng/components/common/api';
import {Subscription} from 'rxjs';
import 'rxjs/add/operator/finally';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {

    tags: Tag[];
    selectedTag: Tag;
    tagForDialog: Tag;
    displayDialog: boolean;
    msgs: Message[] = [];

    get$: Subscription;
    add$: Subscription;
    edit$: Subscription;
    delete$: Subscription;

    addForm = true;

    constructor(private tagService: TagService) {
    }

    ngOnInit(): void {
        this.get$ = this.tagService.getTags().subscribe(
            tags => this.tags = tags,
            error => this.showError(error)
        );

        console.log(this.tags);
    }

    ngOnDestroy() {
        this.get$.unsubscribe();
        this.add$.unsubscribe();
        this.edit$.unsubscribe();
        this.delete$.unsubscribe();
    }

    add() {
        // create an empty tag
        this.tagForDialog = {
            id: null, tag: null
        };
        this.addForm=true;
        this.displayDialog = true;
        console.log(this.tagForDialog);
    }

    edit() {
        if (this.selectedTag == null) {
            return;
        }
        this.addForm=false;
        // create a clone of the selected tag
        this.tagForDialog = Object.assign({}, this.selectedTag);

        this.displayDialog = true;
    }

    remove() {
        if (this.selectedTag == null) {
            return;
        }

        console.log(this.selectedTag); 

        this.delete$ = this.tagService.deleteTag(this.selectedTag.id)
            .finally(() => {
                this.tagForDialog = null;
                this.selectedTag = null;
            })
            .subscribe(
                () => {
                    this.tags = this.tags.filter(
                        (element: Tag) => element.id !== this.selectedTag.id);
                    this.showSuccess('Tag was successfully removed');
                },
                error => this.showError(error)
            );
    }

    save() {
        console.log(this.addForm);
        if (this.addForm === true) {
            console.log('calling create');
            // create
            this.add$ = this.tagService.createTag(this.tagForDialog)
                .finally(() => {
                    this.tagForDialog = null;
                    this.selectedTag = null;
                    this.displayDialog = false;
                })
                .subscribe(
                    (tag: Tag) => {
                        this.tags = [...this.tags, tag];
                        this.showSuccess('Tag was successfully created');
                    },
                    error => this.showError(error)
                );
        } else if(this.addForm === false) {
            // update
            this.edit$ = this.tagService.updateTag(this.tagForDialog)
                .finally(() => {
                    this.tagForDialog = null;
                    this.displayDialog = false;
                })
                .subscribe(
                    () => {
                        this.tags.some((element: Tag, index: number) => {
                            if (element.id === this.tagForDialog.id) {
                                this.tags[index] = Object.assign({}, this.tagForDialog);
                                this.tags = [...this.tags];
                                this.selectedTag = this.tags[index];
                                return true;
                            }
                        });
                        this.showSuccess('Tag was successfully updated');
                    },
                    error => this.showError(error)
                );
            
        }
    }

    private showError(errMsg: string) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Sorry, an error occurred', detail: errMsg});
    }

    private showSuccess(successMsg: string) {
        this.msgs = [];
        this.msgs.push({severity: 'success', detail: successMsg});
    }


}
