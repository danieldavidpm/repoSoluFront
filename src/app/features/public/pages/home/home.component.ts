import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  services: Service[] = [
    {
      icon: 'code',
      title: 'Software empresarial a medida',
      description: 'Sistemas diseñados específicamente según tus procesos y necesidades.',
    },
    {
      icon: 'phone_android',
      title: 'Aplicaciones móviles',
      description: 'Herramientas móviles para operación en campo y seguimiento en tiempo real.',
    },
    {
      icon: 'hub',
      title: 'Integración de sistemas',
      description: 'Conectamos tus plataformas para centralizar la información.',
    },
    {
      icon: 'insights',
      title: 'Reportes inteligentes',
      description: 'Información clara y actualizada para decisiones estratégicas.',
    },
  ];

  benefits: Benefit[] = [
    {
      icon: 'tune',
      title: 'Soluciones realmente personalizadas',
      description: 'No adaptamos tu negocio al sistema; adaptamos el sistema a tu negocio.',
    },
    {
      icon: 'support_agent',
      title: 'Acompañamiento cercano',
      description: 'Atención directa y soporte especializado.',
    },
    {
      icon: 'trending_up',
      title: 'Escalabilidad',
      description: 'Tecnología preparada para crecer contigo.',
    },
    {
      icon: 'workspace_premium',
      title: 'Experiencia comprobada',
      description: 'Conocimiento práctico en operaciones empresariales complejas.',
    },
    {
      icon: 'flag',
      title: 'Enfoque en resultados',
      description: 'Nuestro objetivo es generar eficiencia medible.',
    },
  ];
}
