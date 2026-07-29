import { Component, signal, OnInit, ChangeDetectorRef, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestService } from './test-service';
import { FormField ,form, required } from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormField],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class App implements OnInit {
  protected readonly title = signal('01-starting-project');
  private cdr = inject(ChangeDetectorRef);
  public myvariable!: string;
  //public myvariable = signal('Ciao Ciao');

  orderState = signal({
    product: '',
    quantity: 1
  });

  orderForm = form(this.orderState, schema => {
    required(schema.product, {
      message: 'Please select a product'
    });
  });

  constructor(public testService: TestService) {
    //this.myvariable.set("Ciao Ciao");

    this.myvariable = "";
  }

  ngOnInit(): void { 

      this.testService.getData().subscribe({
      //this.myvariable.set(result);
      //this.cdr.markForCheck();
      //alert(this.myvariable);
      next: (result) => {
        this.myvariable = result;
      },
      error: (error) => {
        console.log('Error Occurred', error)
        alert("Error occurred: " + error.message);
        this.myvariable = error.message;
      },
      complete: () => {
        console.log('Stream Completed')
      }
    });

  }

}
