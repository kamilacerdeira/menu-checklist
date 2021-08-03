import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuFooterButton, MenuLink, User } from './components';
@Component({
  selector: 'ft-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend-test';
  menuFooterButtons: MenuFooterButton[] = [];
  menuLinks: MenuLink[] = [];
  menuMinimized = false;
  user: User | undefined;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get('assets/mock/menu.json').subscribe((data) => {
      this.menuLinks = this.handleMenuLinks(data);
      this.user = this.handleUser(data);
      this.menuFooterButtons = this.handleMenuFooterButtons(data);
    });
  }

  handleMenuToggle() {
    this.menuMinimized = !this.menuMinimized;
  }

  private handleMenuLinks(data: any): MenuLink[] {
    // link Página Inicial com estilo ativo
    data.menu.links[0].isActive = true;
    //link Listas Concluídas não está disponível no plano atual do usuário
    data.menu.links[1].isEnabled = false;

    //loop para gerar o aninhamento dos links filhos.

    //parentId !== null - indica que o link é filho de um link pai
    //se o link é filho de um link pai então sua propriedade children é nula,
    //já que ele não pode ser um pai.

    //a constante parentIndex vai armazenar o index do link pai, que é parentId do filho -1
    //inicialmente o children não é definido como propriedade do pai, por isso verifica-se:
    //se ele não possui children ainda, adiciona o link filho (linha 56). Quando o for rodar
    //novamente e ele já possuir a propriedade children, adiciona mais um filho através do push

    //por fim, para que os filhos apareçam apenas dentro dos seus pais
    //o filter retorna somente os pais(parentId === null)

    for (let i = 0; i < data.menu.links.length; i++) {
      if (data.menu.links[i].parentId !==null) {
        data.menu.links[i].children = null;
        const parentIndex = data.menu.links[i].parentId - 1
        data.menu.links[parentIndex].children
          ? data.menu.links[parentIndex].children.push(data.menu.links[i])
          : data.menu.links[parentIndex].children = [data.menu.links[i]]
      }
    }
    return data.menu.links.filter((link:MenuLink) => link.parentId === null);
  }

  private handleUser(data: any): User {
    return data.user;
  }

  private handleMenuFooterButtons(data: any): MenuFooterButton[] {
    return data.menu.buttons;
  }
}
