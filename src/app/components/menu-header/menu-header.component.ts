import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

export interface User {
  name: string;
  role: string;
}

@Component({
  selector: 'ft-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuHeaderComponent {
  @Input() minimize = false;
  @Input() user: User | undefined;
  @Output() toggle = new EventEmitter();

  handleClick() {
    this.toggle.emit();
  }

  //com o método split dividimos o nome do usuário em um array a partir do espaço.
  //definimos as iniciais como uma string vazia. Caso a constante names possua 2
  //ou mais elementos, buscamos a primeira letra dos dois elementos iniciais.
  //caso seja apenas um elemento buscamos a primeira letra apenas dele. Por fim,
  //caso o usuário não tenha nome definido, suas iniciais serão vazias como
  //definido na variável initials.
  getUserInitials() {
    const names = this.user?.name.split(' ');
    let initials = ''
    if (names && names.length >= 2) {
      initials = names && names[0][0]+names[1][0]
    } else if (names?.length == 1) {
      initials = names && names[0][0]
    }

    return initials
  }
}
