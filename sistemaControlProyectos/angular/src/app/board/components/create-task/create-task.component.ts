import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { ListSchema, Actividad } from 'src/app/core';
import { TaskService } from 'src/app/core/services/task.service';
type DropdownObject={
  value: string;
  viewValue: string;
} 

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})


export class CreateTaskComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @Input() listId?: string;
  createTask: FormGroup;
  selectedPriority: string;
  @Input() task?: Actividad;
  @Input() connectedOverlay: CdkConnectedOverlay;
  formText: string;

  priorities:DropdownObject[]=[
    { value: 'urgent', viewValue: 'Urgente' },
    { value: 'moderate', viewValue: 'Moderado' },    
    { value: 'low', viewValue: 'Bajo' },
  ];

  constructor(
    private fb: FormBuilder,
    private _ngZone: NgZone,
    private tasksService: TaskService
  ) {}  ngOnInit(): void {
    this.setForm();
    this.selectedPriority = '';
    if (this.task && this.task.IDActividad &&this.task.IDActividad> 0) {
      this.setValuesOnForm(this.task);
      this.formText = 'Editar';
      this.selectedPriority = this.task.proceso;
    }else{
      this.formText = 'Crear';
    }
  }
  
  setForm(): void {
    this.createTask = this.fb.group({
      date: [new Date(), Validators.required],
      priority: ['urgent', Validators.required],    
      description: ['', Validators.required],
    });

  }

  onFormAdd(form: Actividad): void {

    if (this.createTask.valid && this.task && !this.task.IDActividad) {
      this.tasksService.addTask(form);
      this.close();
    } else if (this.task && this.listId){
      const findPriority = this.priorities.find(
        (element) => form.proceso === element.value
      );
      form.IDActividad = this.task.IDActividad;
      form.proceso = !findPriority ? this.task.proceso : form.proceso;
      form.FechaFin = new Date(form.FechaFin);
      if (form.proceso) {
        this.tasksService.updateTask(form, this.listId);
      }
      this.close();
    }
  }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.
    pipe(take(1))
    .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  setValuesOnForm(form: Actividad): void{
    this.createTask.setValue({
      date:new Date(form.FechaFin),
      priority:form.proceso,
      description:form.Descripcion
    });
  }
  close():void{
    this.connectedOverlay.overlayRef.detach();
  }
}
