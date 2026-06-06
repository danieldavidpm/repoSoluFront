import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Client {
  name: string;
  logo: string;
  sector: string;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
})
export class ClientesComponent {
  clients: Client[] = [
    {
      name: 'Applus+ Perú',
      logo: 'clientes/applus.svg',
      sector: 'Inspección y certificación',
    },
    {
      name: 'Nagasco Sac.',
      logo: 'clientes/nagasco.svg',
      sector: 'Natural Gas Company',
    },
    {
      name: 'SOLE Perú',
      logo: 'clientes/sole-peru.svg',
      sector: 'Operaciones técnicas',
    },
    {
      name: 'ConstruGas',
      logo: 'clientes/construgas.svg',
      sector: 'Especialistas en redes de gas',
    },
    {
      name: 'P.A. PERU Sac.',
      logo: 'clientes/pa-peru.png',
      sector: 'Ingeniería y construcción',
    },
    {
      name: 'GR Inversiones e ingeniería Sac.',
      logo: 'clientes/gr-inversiones.png',
      sector: 'Servicios de Ingeniería',
    },
  ];

  highlightedSectors = [
    { icon: 'local_fire_department', label: 'Gas natural' },
    { icon: 'engineering', label: 'Operaciones técnicas' },
    { icon: 'folder_open', label: 'Gestión documental' },
    { icon: 'admin_panel_settings', label: 'Control administrativo' },
  ];
}
