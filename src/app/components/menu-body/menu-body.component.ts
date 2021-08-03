import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

export interface MenuLink {
  id: number;
  icon: string | null;
  isActive: boolean; // indica se o link está ativo no momento.
  isEnabled: boolean; // indica se o link está disponível - alguns planos de contrato não têm todos os links.
  isVisible: boolean; // indica se o link deve ser mostrado - algumas funcionalidades são habilitadas no futuro.
  parentId: number | null; // id
  text: string;
  children: MenuLink[] | null;
}

@Component({
  selector: 'ft-menu-body',
  templateUrl: './menu-body.component.html',
  styleUrls: ['./menu-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBodyComponent implements OnInit {
  @Input() minimize = false;
  @Input() clickedLinkId = 0;
  @Input() links: MenuLink[] = [];

  handleClickedLinkId(linkId:number) {
    if(this.clickedLinkId === linkId) {
      this.clickedLinkId = 0;
    } else {
      this.clickedLinkId = linkId;
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
