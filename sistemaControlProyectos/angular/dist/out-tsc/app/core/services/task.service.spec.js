import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
describe('TaskService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TaskService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=task.service.spec.js.map