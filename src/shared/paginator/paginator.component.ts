import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'gbs-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent implements OnChanges {

  @Input() totalPages!: number;
  @Input() currentPage: number = 0;

  @Output() change = new EventEmitter<number>();

  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages']) {
      this.generatePages();
    }
  }

  generatePages(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
  }

  anterior(): void {
    if ((this.currentPage + 1 ) > 1) {
      this.currentPage--;
      this.change.emit(this.currentPage);
    }
  }

  proximo(): void {
    if ((this.currentPage + 1) < this.totalPages) {
      this.currentPage++;
      this.change.emit(this.currentPage);
    }
  }

  goToPage(page: number): void {
      this.change.emit(page);
  }
}
