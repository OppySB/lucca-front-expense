import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UpdateComponent} from './update.component';
import {TranslateModule} from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UpdateComponent', () => {
    let component: UpdateComponent;
    let fixture: ComponentFixture<UpdateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [UpdateComponent],
                imports: [
                    TranslateModule.forRoot()
                ],
                schemas: [NO_ERRORS_SCHEMA]
            }
        )
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    beforeEach(function() {
        jasmine.clock().uninstall();
    });

    describe('0. UpdateComponent', () => {
        it('0.1 should create', () => {
            expect(component).toBeTruthy();
        });
    });

});
