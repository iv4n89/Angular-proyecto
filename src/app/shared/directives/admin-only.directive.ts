import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Directive({
  selector: '[adminOnly]',
})
export class AdminOnlyDirective implements OnInit {

  private hasView = false;

  constructor(private templateRef: TemplateRef<HTMLElement>, private viewContainer: ViewContainerRef, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.user.role === 'ADMIN_ROLE' && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if(this.authService.user.role !== 'ADMIN_ROLE' && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
