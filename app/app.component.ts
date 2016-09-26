import { Component }       from '@angular/core';
import { CommonModule }    from '@angular/common';
import { OnInit }          from '@angular/core';

import { NewsService } from './services/news.service';

@Component({
    selector: 'my-app',
    templateUrl: '/app/app.component.html'
})
export class AppComponent implements OnInit {
    private loading = true;
    private blocked: boolean = false;
    private news: any[] = [];
    private id: number = 0;
    private pairs: number = 10;
    private cards: number = this.pairs * 2;
    private isItemSelected = false;
    private selectedItem: any;
    private pairsFound: number;

    constructor( private newsService: NewsService ) {
        this.pairsFound = 0;
    }

    ngOnInit() {
        this.newsService.getNews().subscribe(
            result => {
                this.addToNewsArray(result);
                this.loading = false;
            },
            error => {
                console.error(error);
            },
            () => this.news = this.shuffleArray(this.news)
        );
    }

    private addToNewsArray(item: any) {
        if (item && this.news.length < this.cards ) {
            let imageItem = Object.assign({}, item);
            imageItem['image'] = true;
            let headlineItem = Object.assign({}, item);
            headlineItem['image'] = false;
            this.news.push(imageItem, headlineItem);
        }
    }

    private shuffleArray(array: any[]) {
        let i = 0, j = 0, temp: any = null;
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    private onItemClick(item: any) {
        if (!this.blocked && item !== this.selectedItem) {
            this.blocked = true;
            this.flipItem(item);
            if ( this.isItemSelected ) {
                let result = this.checkMatch(item);
                if ( result ) {
                    this.disablePair(item, this.selectedItem);
                    this.foundMatch();
                    this.reset();
                    this.blocked = false;
                } else {
                    setTimeout(() => {
                        this.flipPair(item, this.selectedItem);
                        this.reset();
                        this.blocked = false;
                    }, 2500);
                }
            } else {
                this.selectedItem = item;
                this.isItemSelected = true;
                this.blocked = false;
            }
        console.log('flipped');
        }
    }

    private checkMatch(item: any): boolean {
        if ( this.selectedItem.image === !item.image && this.selectedItem.title === item.title) {
            return true;
        } else {
            return false;
        }
    }

    private foundMatch() {
        ++this.pairsFound;
        if ( this.pairsFound === this.pairs )
            this.final();
    }

    private disablePair(first: any, second: any) {
        first.disabled = true;
        second.disabled = true;
    }

    private flipPair(first: any, second: any) {
        first.flip = false;
        second.flip = false;
    }

    private flipItem(item: any) {

        item.flip = !item.flip;
    }

    private reset() {
        this.selectedItem = null;
        this.isItemSelected = false;
    }

    private final() {
        let reload = confirm("Great! You got every news-picture pair!");
        if (reload)
            window.location.reload();
    }

}

