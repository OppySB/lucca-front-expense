import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CreateComponent} from './create.component';
import {TranslateModule} from '@ngx-translate/core';


describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [CreateComponent],
        imports: [
          TranslateModule.forRoot()
        ]
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
