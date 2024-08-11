import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gbs-tabs',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent implements OnInit {

  @Input() tabs: Tab[] = [];
  @Output() change = new EventEmitter();

  ngOnInit(): void {
    this.tabs[0].selected = true;
    this.change.emit(this.tabs[0].value);
  }

  chosen(tab: Tab, index: number) {
    this.tabs = this.tabs.map(item => {
      item.selected = false
      return item;
    });
    this.tabs[index].selected = true;
    this.change.emit(tab.value);
  }

}

export interface Tab {
  icon: string;
  label: string;
  value: string;
  selected: boolean;
}
