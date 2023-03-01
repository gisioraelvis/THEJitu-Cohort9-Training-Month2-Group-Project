import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  display$!: Observable<'open' | 'close'>;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.display$ = this.modalService.watch();
  }

  close() {
    this.modalService.close();
  }

}
