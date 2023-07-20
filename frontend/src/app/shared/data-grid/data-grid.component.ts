import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IDisplayedColumns } from 'src/app/core/models/admin.model';
import { PaginatorComponent } from '../paginator/paginator.component';
import { IPagination } from 'src/app/core/models/paginator';

const material = [
  MatTableModule,
  MatCardModule,
  MatIconModule
]

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [CommonModule, ...material, PaginatorComponent],
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit, OnChanges {
  @Input() displayedColumns : any[] = [];
  @Input() dataSource : any[] = [];
  @Input() useColumns : string[]=  []
  @Output() action  = new EventEmitter();
  @Input() totalCount !: number;
  @Input() viewOnly : boolean = true;
  @Output() pageDetails = new EventEmitter();
  @Output () rowClicked = new EventEmitter();


  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // alert(this.totalCount)
  }

  emitAction(actionType : 'edit' | 'delete', element : any) {
        this.action.emit(
          {
            actionType,
            element
          }
        )
  }

  emitPageDetails(event : IPagination) {
      this.pageDetails.emit(event);
  }

  emitRowClick(row : any) {
    this.rowClicked.emit(row)
  }

}
