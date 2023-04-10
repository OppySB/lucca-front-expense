import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CreateComponent} from './create.component';
import {TranslateModule} from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [CreateComponent],
        imports: [
          TranslateModule.forRoot()
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }
    )
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(function () {
    jasmine.clock().uninstall();
  });

  describe('0. CreateComponent', () => {
    it('0.1 should create', () => {
      expect(component).toBeTruthy();
    });
  });

});
