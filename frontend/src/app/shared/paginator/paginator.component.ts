import { Component , EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IPagination } from 'src/app/core/models/paginator';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { MatDividerModule } from '@angular/material/divider';

const material = [
  MatPaginatorModule,
  MatIconModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule
]

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, ...material],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() count!: number;
	@Input() pageSize = 10;
	@Input() maxPages = 10;
	@Input() typeOfData='';

	currentPageNumber = 0;
	startPageNumber = 0;
	lastPageNumber = 0;
	midPage!: number;
	paginationDetails: IPagination = {};
	@Output() pageDetails = new EventEmitter<any>();

	constructor(private utility : UtilityService) {

	}
	ngOnInit(): void {
		// alert(this.count)
		this.lastPageNumber = Math.ceil(this.count / this.pageSize) - 1;
		this.currentPageNumber = this.startPageNumber;
		this.midPage = Math.floor(this.maxPages / 2);
		if (this.count <= 40) {
			this.maxPages = Math.ceil(this.count / this.pageSize);
		}
	}
	ngOnChanges() {
		this.utility.totalCount.subscribe((res: any) => {
			this.lastPageNumber = Math.ceil(this.count / this.pageSize) - 1;
			this.startPageNumber = 0;
			this.midPage = Math.floor(this.maxPages / 2);
			if (this.count <= 40) {
				this.maxPages = Math.ceil(this.count / this.pageSize);
			} else {
				this.maxPages = 5;
			}
		})
	}

	updateCurrentPageNumber(pageNumber: number) {
		if (pageNumber <= this.lastPageNumber) {
			this.currentPageNumber = pageNumber;
		}
		this.paginationDetails.pageNumber = this.currentPageNumber;
		this.paginationDetails.pageSize = this.pageSize;
		this.pageDetails.emit(this.paginationDetails);
	}

	previousPage() {
		if (this.currentPageNumber > this.startPageNumber) {
			this.currentPageNumber--;
		}
		this.paginationDetails.pageNumber = this.currentPageNumber;
		this.paginationDetails.pageSize = this.pageSize;
		this.pageDetails.emit(this.paginationDetails);
	}

	nextPage() {
		if (this.currentPageNumber < this.lastPageNumber) {
			this.currentPageNumber+=1;
		}
		this.paginationDetails.pageNumber = this.currentPageNumber;
		this.paginationDetails.pageSize = this.pageSize;
		this.pageDetails.emit(this.paginationDetails);
	}

	isMaxPagesExceeded() {
		return this.lastPageNumber - this.currentPageNumber > this.maxPages - 1;
	}

	getPageNumberForIndex(i: number, hasMid = true) {
		if (hasMid) {
			return i < this.midPage
				? this.currentPageNumber + i
				: this.lastPageNumber - (this.maxPages - i - 1);
		}
		return this.lastPageNumber + 1 - this.maxPages + i;
	}
}
