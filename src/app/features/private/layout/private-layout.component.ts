import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, SidebarComponent, ToolbarComponent],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.scss',
})
export class PrivateLayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  isMobile = false;
  sidenavOpen = true;

  constructor() {
    // Detectar tamaño de pantalla y ajustar sidenav
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .pipe(takeUntilDestroyed())
      .subscribe(result => {
        this.isMobile = result.matches;
        this.sidenavOpen = !result.matches;
      });

    // Cerrar sidenav al navegar en móvil (modo overlay)
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        if (this.isMobile) this.sidenavOpen = false;
      });
  }
}
